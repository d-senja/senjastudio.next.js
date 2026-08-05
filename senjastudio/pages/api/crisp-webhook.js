// pages/api/crisp-webhook.js
//
// Answers Crisp chat messages on senjastudio.co.uk with Claude.
//
//   Crisp message:send → verify signature → Claude → post reply back as operator
//
// SETUP NOTE: this must be wired as a Crisp *plugin* hook, not a plain website
// webhook. Crisp only sends X-Crisp-Signature on plugin hooks, so a website
// webhook leaves this endpoint unauthenticated — anyone who finds the URL could
// drive it. Create the plugin in the Crisp Marketplace and take
// CRISP_WEBHOOK_SECRET from there.
//
// Env:
//   CHAT_AI_ENABLED       — must be exactly "true" or the route does nothing
//   CRISP_IDENTIFIER      — plugin token identifier
//   CRISP_KEY             — plugin token key
//   CRISP_WEBSITE_ID      — website the plugin is installed on
//   CRISP_WEBHOOK_SECRET  — plugin signing secret
//   ANTHROPIC_API_KEY     — already set in Vercel
//   UPSTASH_REDIS_*       — already set; the reply cap depends on it

import crypto from 'crypto'
import Anthropic from '@anthropic-ai/sdk'
import { checkRateLimit } from '../../lib/rate-limit'
import { SYSTEM_PROMPT, HANDOVER_MESSAGE } from '../../lib/crisp-prompt'
import {
  sendOperatorMessage,
  getRecentMessages,
  addSegments,
  mirrorReplyCount,
} from '../../lib/crisp'
import { claimMessage, incrementReplyCount, getReplyCount } from '../../lib/crisp-store'

// The signature is computed over the raw request body. Next.js's parser
// re-serialises JSON — key order, whitespace and unicode escaping all shift —
// so JSON.stringify(req.body) would never reproduce the bytes Crisp signed.
export const config = {
  api: { bodyParser: false },
  maxDuration: 30,
}

const MODEL = 'claude-sonnet-5'
const MAX_TOKENS = 350
const HISTORY_LIMIT = 8
const REPLY_CAP = 12
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000
const REPLAY_WINDOW_MS = 5 * 60 * 1000

// Matched against the visitor's message, lowercased. Deliberately a keyword
// list rather than a model judgement: it is free, deterministic, and tunable
// from real transcripts. Revisit once there are some.
const HOT_LEAD_PATTERNS = [
  /\b(my|our) (firm|company|brokerage|practice|business|site|website)\b/,
  /\bi'?m an? (ar|appointed representative|independent|whole of market)\b/,
  /\b(fca|compliance|compliant|network|principal|financial promotion)\b/,
  /\b(how long|timeline|turnaround|lead time|when could|how soon)\b/,
  /\b(process|onboarding|what do you need|next step)\b/,
  /\b(book|call|demo|quote|get started|sign up)\b/,
]

const anthropic = new Anthropic()

/** Constant-time compare that cannot throw on a length mismatch. */
function signatureMatches(expected, received) {
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(received || '', 'utf8')
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }

  // Kill switch, before anything else runs. One env change disables the
  // assistant without a deploy. Returns 200 so Crisp does not queue retries.
  if (process.env.CHAT_AI_ENABLED !== 'true') return res.status(200).end()

  let raw
  try {
    raw = await readRawBody(req)
  } catch {
    return res.status(400).end()
  }

  // ── verify ───────────────────────────────────────────────────
  const timestamp = req.headers['x-crisp-request-timestamp']
  const signature = req.headers['x-crisp-signature']
  const secret = process.env.CRISP_WEBHOOK_SECRET

  if (!secret) {
    console.error('[crisp] CRISP_WEBHOOK_SECRET is not set — refusing to process')
    return res.status(500).end()
  }
  if (!timestamp || !signature) return res.status(401).end()

  // Reject stale deliveries so a captured request cannot be replayed later.
  const age = Date.now() - Number(timestamp)
  if (!Number.isFinite(age) || age > REPLAY_WINDOW_MS || age < -REPLAY_WINDOW_MS) {
    return res.status(401).end()
  }

  // Crisp signs the literal string `[timestamp;body]` — brackets and semicolon
  // included — not the body alone.
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`[${timestamp};${raw}]`)
    .digest('hex')

  if (!signatureMatches(expected, signature)) return res.status(401).end()

  let payload
  try {
    payload = JSON.parse(raw)
  } catch {
    return res.status(400).end()
  }

  // ── filter ───────────────────────────────────────────────────
  // Every rejection below returns 200: the delivery was valid, we simply have
  // nothing to do. A non-2xx would make Crisp retry something that will never
  // succeed.
  const data = payload?.data || {}
  const sessionId = data.session_id

  if (payload?.event !== 'message:send') return res.status(200).end()
  if (data.website_id !== process.env.CRISP_WEBSITE_ID) return res.status(200).end()
  // The loop guard. Our own replies post as an operator and come straight back
  // through this endpoint; without this the bot answers itself forever.
  if (data.from !== 'user') return res.status(200).end()
  if (data.type !== 'text') return res.status(200).end()
  if (!sessionId || typeof data.content !== 'string' || !data.content.trim()) {
    return res.status(200).end()
  }

  const visitorMessage = data.content.trim()

  try {
    // ── idempotency ────────────────────────────────────────────
    // Crisp retries a delivery it thinks failed. The fingerprint is unique per
    // message, so claiming it once stops a retry producing a second reply.
    if (!(await claimMessage(data.fingerprint))) return res.status(200).end()

    // ── rate limit ─────────────────────────────────────────────
    // Keyed on the session, NOT the client IP: every one of these requests
    // originates from Crisp's servers, so an IP key would put the whole site
    // behind one 20/hour bucket instead of one bucket per visitor.
    const withinLimit = await checkRateLimit({
      name: 'crisp-ai',
      ip: sessionId,
      limit: RATE_LIMIT,
      windowMs: RATE_WINDOW_MS,
    })
    if (!withinLimit) {
      console.warn(`[crisp] rate limit hit, staying silent — session=${sessionId}`)
      return res.status(200).end()
    }

    // ── reply cap ──────────────────────────────────────────────
    const soFar = await getReplyCount(sessionId)

    // Null means Redis is unreachable, so the cap cannot be enforced. Decline
    // rather than run uncapped — an unbounded bot on a live site is the exact
    // failure this guards against.
    if (soFar === null) {
      console.error(`[crisp] no reply counter, declining — session=${sessionId}`)
      return res.status(200).end()
    }

    // Already handed over. Silent for the rest of the conversation.
    if (soFar >= REPLY_CAP) return res.status(200).end()

    // This reply would be the twelfth: hand over instead of answering.
    if (soFar === REPLY_CAP - 1) {
      await sendOperatorMessage(sessionId, HANDOVER_MESSAGE)
      const count = await incrementReplyCount(sessionId)
      await addSegments(sessionId, ['needs-dan'])
      await mirrorReplyCount(sessionId, count ?? REPLY_CAP)
      console.log(
        JSON.stringify({
          at: 'crisp.handover',
          session: sessionId,
          replies: count ?? REPLY_CAP,
        })
      )
      return res.status(200).end()
    }

    // ── generate ───────────────────────────────────────────────
    const started = Date.now()
    const history = await getRecentMessages(sessionId, HISTORY_LIMIT)

    // getRecentMessages reads Crisp's own record, which already contains the
    // message that triggered this webhook — appending it again would duplicate
    // the visitor's turn. Only add it if Crisp has not caught up yet.
    const last = history[history.length - 1]
    if (!last || last.role !== 'user' || last.content !== visitorMessage.slice(0, 2000)) {
      history.push({ role: 'user', content: visitorMessage.slice(0, 2000) })
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Sonnet 5 runs adaptive thinking when `thinking` is omitted, and
      // max_tokens caps thinking AND response text together — 350 tokens of
      // thinking would leave a reply truncated mid-sentence. Disabled here, with
      // low effort, means the whole budget belongs to the visible reply.
      thinking: { type: 'disabled' },
      output_config: { effort: 'low' },
      // Cached: the prompt is ~1,200 tokens and byte-identical every call, so
      // repeat turns bill it at roughly a tenth of the input rate.
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      messages: history,
    })

    const reply = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim()

    if (!reply) {
      console.error(
        `[crisp] empty completion, stop_reason=${response.stop_reason} — session=${sessionId}`
      )
      return res.status(200).end()
    }

    // ── deliver ────────────────────────────────────────────────
    await sendOperatorMessage(sessionId, reply)
    const count = await incrementReplyCount(sessionId)

    const hot = HOT_LEAD_PATTERNS.some((re) => re.test(visitorMessage.toLowerCase()))
    if (hot) await addSegments(sessionId, ['hot-lead'])
    await mirrorReplyCount(sessionId, count ?? soFar + 1)

    // One line per exchange with the token counts, so cost is a number you can
    // read off the logs rather than a guess. cache_read climbing while
    // cache_write stays flat is the sign caching is working.
    console.log(
      JSON.stringify({
        at: 'crisp.reply',
        session: sessionId,
        replies: count ?? soFar + 1,
        hot_lead: hot,
        stop_reason: response.stop_reason,
        in_tokens: response.usage.input_tokens,
        out_tokens: response.usage.output_tokens,
        cache_write: response.usage.cache_creation_input_tokens ?? 0,
        cache_read: response.usage.cache_read_input_tokens ?? 0,
        ms: Date.now() - started,
      })
    )

    return res.status(200).end()
  } catch (err) {
    // 200 rather than 500: the delivery was valid and a retry would replay the
    // same failure. The error is logged for us, and the visitor sees a chat that
    // simply did not reply — at which point Crisp notifies Dan as it always did.
    console.error(`[crisp] handler failed — session=${sessionId} — ${err.message}`)
    return res.status(200).end()
  }
}
