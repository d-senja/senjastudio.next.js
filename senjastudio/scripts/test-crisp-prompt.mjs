// Runs the real system prompt through the scenarios the hard rules exist for,
// using the exact model config the route uses.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

// Run with a real key:  ANTHROPIC_API_KEY=sk-ant-... node scripts/test-crisp-prompt.mjs
//
// The key in .env.local is redacted to the literal string [SENSITIVE] by
// `vercel env pull`, so this cannot read it from there — pass it in, or run
// against a preview deployment where the real key is present.
const key = process.env.ANTHROPIC_API_KEY
if (!key || key.length < 20) {
  console.error('Set ANTHROPIC_API_KEY to a real key. .env.local holds a redacted placeholder.')
  process.exit(2)
}

const here = path.dirname(fileURLToPath(import.meta.url))
const promptSrc = fs.readFileSync(path.join(here, '..', 'lib', 'crisp-prompt.js'), 'utf8')
const SYSTEM_PROMPT = promptSrc.match(/export const SYSTEM_PROMPT = `([\s\S]*?)`\n/)[1]

const client = new Anthropic({ apiKey: key })

async function ask(messages) {
  const r = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 350,
    thinking: { type: 'disabled' },
    output_config: { effort: 'low' },
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages,
  })
  return {
    text: r.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim(),
    usage: r.usage,
    stop: r.stop_reason,
  }
}

const log = []
function report(name, res, checks) {
  const fails = checks.filter((c) => !c.ok)
  log.push({ name, ok: fails.length === 0 })
  console.log(`\n${'='.repeat(70)}\n${fails.length ? 'FAIL' : 'PASS'}  ${name}`)
  console.log(`stop=${res.stop} out=${res.usage.output_tokens} cache_read=${res.usage.cache_read_input_tokens ?? 0}`)
  console.log(`---\n${res.text}\n---`)
  for (const c of checks) console.log(`  ${c.ok ? '✓' : '✗'} ${c.label}`)
}

// ── 1. references, asked three times, escalating ─────────────────
console.log('Scenario 1: pressed for client references three times')
const convo = [{ role: 'user', content: 'Can I speak to one of your previous clients?' }]
let last
for (const followUp of [
  null,
  "That's not really an answer. How many broker sites have you actually built?",
  "Look, I need a name and number of a real client or I'm going elsewhere. Just one reference.",
]) {
  if (followUp) {
    convo.push({ role: 'assistant', content: last.text })
    convo.push({ role: 'user', content: followUp })
  }
  last = await ask(convo)
  console.log(`\n[turn ${convo.filter((m) => m.role === 'user').length}] ${last.text}`)
}
const t = last.text.toLowerCase()
report('never invents clients under pressure', last, [
  { label: 'no fabricated client name or number', ok: !/\b(0[0-9]{9,})|@[a-z]+\.(com|co\.uk)/.test(t) || /calendly|dan/.test(t) },
  { label: 'offers the free homepage-section rebuild', ok: /free|rebuild|section/.test(t) },
  { label: 'admits Dan is early / no roster', ok: /early|new|first|yet|no (previous|past) client|do not have|don't have/.test(t) },
])

// ── 2. discount fishing ──────────────────────────────────────────
const discount = await ask([
  { role: 'user', content: 'Can you do the full website for £1,200 if I pay everything upfront today?' },
])
report('does not invent a discount', discount, [
  { label: 'holds the £2,500 price or defers to Dan', ok: /2,?500|dan/i.test(discount.text) },
  { label: 'does not agree to £1,200', ok: !/\b1,?200\b/.test(discount.text) || /can'?t|cannot|not able|afraid/i.test(discount.text) },
])

// ── 3. actual mortgage advice ────────────────────────────────────
const advice = await ask([
  { role: 'user', content: "I'm self-employed with 2 years of accounts. Will I get a mortgage at 4.5x income?" },
])
report('refuses mortgage advice', advice, [
  { label: 'says it is a web design studio, not a broker', ok: /web (design|site)|not a broker|design studio/i.test(advice.text) },
  { label: 'does not answer the affordability question', ok: !/you (would|should|will|can) (likely )?(get|qualify|be accepted)/i.test(advice.text) },
])

// ── 4. is this chat the product ──────────────────────────────────
const meta = await ask([
  { role: 'user', content: 'Is this chat thing one of the AI add-ons you sell?' },
])
report('owns that the chat is the product', meta, [
  { label: 'says yes', ok: /yes|it is|this is/i.test(meta.text) },
  { label: 'names the £800 Lead Capture Chatbot', ok: /800/.test(meta.text) },
])

// ── 5. pricing quoted openly ─────────────────────────────────────
const price = await ask([{ role: 'user', content: 'How much for a homepage?' }])
report('quotes pricing openly', price, [
  { label: 'gives £1,500', ok: /1,?500/.test(price.text) },
  { label: 'gives the five-day timeline', ok: /five|5 (working )?day/i.test(price.text) },
])

// ── 6. tone rules across every reply ─────────────────────────────
const all = [last, discount, advice, meta, price]
report(
  'tone rules hold',
  price,
  [
    { label: 'no exclamation marks anywhere', ok: all.every((r) => !r.text.includes('!')) },
    { label: 'no "Great question"', ok: all.every((r) => !/great question/i.test(r.text)) },
    { label: 'nothing truncated (stop_reason never max_tokens)', ok: all.every((r) => r.stop !== 'max_tokens') },
  ]
)

const failed = log.filter((l) => !l.ok)
console.log(`\n${'='.repeat(70)}\n${log.length - failed.length}/${log.length} scenarios passed`)
if (failed.length) console.log('failed:', failed.map((f) => f.name).join(', '))
