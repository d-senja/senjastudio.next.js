// Redis-backed state for the chat assistant: the reply counter and the
// webhook idempotency guard.
//
// Both need atomicity, which is why they are here rather than in Crisp's
// conversation metadata:
//
//   - The reply counter is read-then-written. Two messages arriving within the
//     same second would both read N and both write N+1, so a hard cap of 12
//     could overrun. Redis INCR is a single atomic operation and cannot.
//   - The idempotency guard has to be a test-and-set. Crisp retries a webhook
//     it considers failed, and without this the visitor gets the same reply
//     twice. SET NX is atomic; GET-then-SET is not.
//
// Uses the same Upstash instance as lib/rate-limit.js, so this adds no new
// infrastructure — only a second pair of key prefixes.
//
// Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

const TIMEOUT_MS = 2000

function configured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

async function redis(commands) {
  const url = process.env.UPSTASH_REDIS_REST_URL.replace(/\/$/, '')
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })

  if (!res.ok) throw new Error(`upstash responded ${res.status}`)
  return res.json()
}

/**
 * True the first time a given message fingerprint is seen, false on every
 * repeat within the TTL.
 *
 * Fails OPEN: if Redis is unreachable we return true and process the message.
 * A duplicate reply is a worse-than-ideal experience; dropping a real visitor's
 * message entirely is worse.
 */
export async function claimMessage(fingerprint, ttlSeconds = 600) {
  if (!configured()) return true

  try {
    const body = await redis([['SET', `crisp:seen:${fingerprint}`, '1', 'EX', String(ttlSeconds), 'NX']])
    // Upstash returns "OK" when NX set the key, null when it already existed.
    return body?.[0]?.result === 'OK'
  } catch (err) {
    console.error(`[crisp-store] idempotency check failed, processing anyway — ${err.message}`)
    return true
  }
}

/**
 * Atomically increment and return this conversation's assistant-reply count.
 *
 * Fails CLOSED: if Redis is unreachable we return null and the caller declines
 * to reply. Without a working counter there is no enforceable cap, and an
 * uncapped bot on a live site is the failure mode this whole module exists to
 * prevent.
 */
export async function incrementReplyCount(sessionId, ttlSeconds = 60 * 60 * 24 * 30) {
  if (!configured()) return null

  const key = `crisp:replies:${sessionId}`
  try {
    // EXPIRE after INCR, so the key cannot outlive the conversation by weeks.
    // Re-applying the TTL on every increment keeps it rolling.
    const body = await redis([
      ['INCR', key],
      ['EXPIRE', key, String(ttlSeconds)],
    ])
    const count = Number(body?.[0]?.result)
    return Number.isFinite(count) ? count : null
  } catch (err) {
    console.error(`[crisp-store] reply counter unavailable — ${err.message}`)
    return null
  }
}

/** The current count without incrementing. Null means "cannot tell". */
export async function getReplyCount(sessionId) {
  if (!configured()) return null

  try {
    const body = await redis([['GET', `crisp:replies:${sessionId}`]])
    const raw = body?.[0]?.result
    if (raw === null || raw === undefined) return 0
    const count = Number(raw)
    return Number.isFinite(count) ? count : null
  } catch (err) {
    console.error(`[crisp-store] reply counter unavailable — ${err.message}`)
    return null
  }
}
