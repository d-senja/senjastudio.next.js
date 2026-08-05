// lib/rate-limit.js
// One rate limiter shared by every API route.
//
// Each route used to keep its own Map in module scope. That only ever limited
// a single warm instance, and Vercel runs several — so the real limit was
// roughly (configured limit x instances), and it reset whenever an instance
// went cold. It slowed a bot down rather than stopping one, which matters most
// on /api/audit because every call through it spends Anthropic credits.
//
// With Redis REST credentials set, counters live in Redis and are shared
// across instances. Without them, this falls back to the old per-instance
// behaviour, so the routes work unchanged until the integration is
// provisioned.
//
// Env (optional, but the limit is only durable once a pair is set) — either:
//   KV_REST_API_URL + KV_REST_API_TOKEN                 (Vercel Marketplace)
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (upstash.com direct)

const memory = new Map();
const UPSTASH_TIMEOUT_MS = 2000;

/**
 * The Redis REST credentials, under whichever names they arrived as.
 *
 * Provisioning Upstash through the Vercel Marketplace injects KV_REST_API_URL
 * and KV_REST_API_TOKEN; setting it up directly at upstash.com gives you
 * UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Accepting both means the
 * limiter works either way — checking only the UPSTASH_ names is why this
 * quietly fell back to per-instance counting after the integration was added.
 *
 * Returns null when neither pair is present.
 */
export function redisCredentials() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

function checkInMemory(key, limit, windowMs) {
  const now = Date.now();

  // Opportunistic cleanup so the Map can't grow without bound on a warm
  // instance. /api/audit was missing this entirely.
  if (memory.size > 5000) {
    for (const [k, entry] of memory) {
      if (now - entry.windowStart > entry.windowMs) memory.delete(k);
    }
  }

  const entry = memory.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    memory.set(key, { count: 1, windowStart: now, windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// SET NX then INCR in a single pipelined round trip. Doing a bare INCR first
// and EXPIRE second risks leaving a key with no TTL if the second call fails,
// which would lock an IP out permanently.
async function checkInRedis(key, limit, windowMs) {
  const { url, token } = redisCredentials();
  const ttl = Math.ceil(windowMs / 1000);

  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['SET', key, '0', 'EX', String(ttl), 'NX'],
      ['INCR', key],
    ]),
    signal: AbortSignal.timeout(UPSTASH_TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`upstash responded ${res.status}`);

  const body = await res.json();
  const count = Number(body?.[1]?.result);
  if (!Number.isFinite(count)) throw new Error('unexpected pipeline response');

  return count <= limit;
}

/**
 * Returns true when the request is within its allowance.
 *
 * If Redis is configured but unreachable we fall back to the in-memory counter
 * rather than failing the request. A weak limit is better than turning a Redis
 * blip into a site-wide outage, and the fallback is logged.
 */
export async function checkRateLimit({ name, ip, limit, windowMs }) {
  const key = `rl:${name}:${ip}`;

  if (redisCredentials()) {
    try {
      return await checkInRedis(key, limit, windowMs);
    } catch (err) {
      console.error(`[rate-limit] ${name}: redis unavailable, using per-instance count — ${err.message}`);
    }
  }

  return checkInMemory(key, limit, windowMs);
}

/** The client IP, as Vercel presents it. */
export function clientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    'unknown'
  );
}
