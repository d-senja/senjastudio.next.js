// Thin wrapper over the Crisp REST API v1 — only the four calls the chat
// assistant needs.
//
// Env:
//   CRISP_IDENTIFIER  — plugin token identifier
//   CRISP_KEY         — plugin token key
//   CRISP_WEBSITE_ID  — the website the plugin is installed on

const API = 'https://api.crisp.chat/v1'
const TIMEOUT_MS = 8000

function authHeader() {
  const pair = `${process.env.CRISP_IDENTIFIER}:${process.env.CRISP_KEY}`
  return `Basic ${Buffer.from(pair).toString('base64')}`
}

async function call(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: authHeader(),
      // Crisp routes the request against plugin permissions rather than user
      // permissions. Without it, a plugin token is rejected as unauthorised.
      'X-Crisp-Tier': 'plugin',
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })

  const json = await res.json().catch(() => null)

  if (!res.ok) {
    const reason = json?.reason || json?.data?.message || res.statusText
    throw new Error(`crisp ${method} ${path} → ${res.status} ${reason}`)
  }

  return json?.data
}

const websiteId = () => process.env.CRISP_WEBSITE_ID

/** Post a reply into the conversation as the operator. */
export function sendOperatorMessage(sessionId, text) {
  return call('POST', `/website/${websiteId()}/conversation/${sessionId}/message`, {
    type: 'text',
    from: 'operator',
    origin: 'chat',
    content: text,
  })
}

/** Conversation metadata — carries our mirrored reply count and the segments. */
export function getConversationMeta(sessionId) {
  return call('GET', `/website/${websiteId()}/conversation/${sessionId}/meta`)
}

/**
 * Add segments (what Crisp calls tags) without dropping the ones already there.
 *
 * `segments` on the meta endpoint is a whole-array replacement, so a naive
 * PATCH with ['hot-lead'] would silently delete every segment Crisp or a human
 * had set. Read, merge, write.
 */
export async function addSegments(sessionId, segments) {
  const meta = await getConversationMeta(sessionId)
  const existing = Array.isArray(meta?.segments) ? meta.segments : []
  const merged = [...new Set([...existing, ...segments])]

  // Nothing new — skip the write rather than burn a request.
  if (merged.length === existing.length) return existing

  await call('PATCH', `/website/${websiteId()}/conversation/${sessionId}/meta`, {
    segments: merged,
  })
  return merged
}

/**
 * Mirror the reply count into Crisp so it is visible in the inbox next to the
 * conversation. Redis remains the source of truth — this is for humans.
 */
export function mirrorReplyCount(sessionId, count) {
  return call('PATCH', `/website/${websiteId()}/conversation/${sessionId}/meta`, {
    data: { ai_replies: String(count) },
  })
}

/**
 * The last `limit` messages, oldest first, mapped into Claude's message format.
 *
 * Only text messages survive the mapping — a visitor uploading a file would
 * otherwise become an empty user turn. Consecutive same-role messages are
 * fine; the Messages API merges them into one turn.
 */
export async function getRecentMessages(sessionId, limit) {
  const messages = await call(
    'GET',
    `/website/${websiteId()}/conversation/${sessionId}/messages`
  )

  const recent = (Array.isArray(messages) ? messages : [])
    .filter((m) => m.type === 'text' && typeof m.content === 'string' && m.content.trim())
    // Sort on the timestamp Crisp returns rather than trusting the response
    // order. Claude requires oldest-first, and getting it backwards would feed
    // the conversation to the model in reverse without erroring — it would just
    // answer strangely, which is a hard bug to spot in production.
    .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
    .map((m) => ({
      role: m.from === 'operator' ? 'assistant' : 'user',
      content: m.content.slice(0, 2000),
    }))
    .slice(-limit)

  // The API rejects a history that opens on an assistant turn.
  while (recent.length && recent[0].role === 'assistant') recent.shift()

  return recent
}
