// pages/api/audit.js
// Rate limited: 2 requests per IP per 24 hours
// Set ANTHROPIC_API_KEY in Vercel Environment Variables

const rateLimitMap = new Map();
const RATE_LIMIT = 2;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

const MAX_URL_LENGTH = 2000;

// Parse an IPv4 literal in any form inet_aton accepts — dotted quad, bare
// decimal, octal, hex, and the short 2/3-part forms. "127.1", "2130706433" and
// "0x7f.1" all reach loopback, and a substring blocklist catches none of them.
// Returns the address as a 32-bit number, or null if this is not an IPv4 literal.
function parseIPv4(host) {
  const parts = host.split('.');
  if (parts.length === 0 || parts.length > 4) return null;

  const nums = [];
  for (const part of parts) {
    let n;
    if (/^0[xX][0-9a-fA-F]+$/.test(part)) n = parseInt(part, 16);
    else if (/^0[0-7]+$/.test(part)) n = parseInt(part, 8);
    else if (/^[0-9]+$/.test(part)) n = parseInt(part, 10);
    else return null;
    if (!Number.isSafeInteger(n) || n < 0) return null;
    nums.push(n);
  }

  // The final part absorbs whatever bytes the earlier ones didn't.
  const last = nums.pop();
  if (nums.some((n) => n > 255)) return null;
  if (last >= 2 ** (8 * (4 - nums.length))) return null;

  return nums.reduce((acc, n, i) => acc + n * 2 ** (8 * (3 - i)), 0) + last;
}

function isPrivateIPv4(n) {
  const a = (n >>> 24) & 255;
  const b = (n >>> 16) & 255;

  if (a === 0) return true;                            // 0.0.0.0/8
  if (a === 10) return true;                           // private
  if (a === 127) return true;                          // loopback
  if (a === 100 && b >= 64 && b <= 127) return true;   // CGNAT 100.64/10
  if (a === 169 && b === 254) return true;             // link-local, cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true;    // private
  if (a === 192 && b === 168) return true;             // private
  if (a === 192 && b === 0) return true;               // 192.0.0/24 protocol assignments
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a >= 224) return true;                           // multicast and reserved
  return false;
}

// Expand an IPv6 literal to its 8 groups, or null if it isn't one. The URL
// parser normalises embedded IPv4 to hex — "::ffff:169.254.169.254" comes back
// as "::ffff:a9fe:a9fe" — so matching on a dotted tail alone misses the mapped
// metadata address.
function parseIPv6(host) {
  let s = host.toLowerCase();

  const tail = s.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (tail) {
    const v4 = parseIPv4(tail[1]);
    if (v4 === null) return null;
    s = s.slice(0, tail.index) +
      ((v4 >>> 16) & 0xffff).toString(16) + ':' + (v4 & 0xffff).toString(16);
  }

  const halves = s.split('::');
  if (halves.length > 2) return null;

  const head = halves[0] ? halves[0].split(':') : [];
  const rest = halves.length === 2 && halves[1] ? halves[1].split(':') : [];

  let groups;
  if (halves.length === 2) {
    const fill = 8 - head.length - rest.length;
    if (fill < 0) return null;
    groups = [...head, ...Array(fill).fill('0'), ...rest];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;

  const out = [];
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    out.push(parseInt(g, 16));
  }
  return out;
}

function isPrivateIPv6(g) {
  if (g.slice(0, 7).every((x) => x === 0) && (g[7] === 0 || g[7] === 1)) return true; // :: and ::1
  if ((g[0] & 0xfe00) === 0xfc00) return true;   // unique local fc00::/7
  if ((g[0] & 0xffc0) === 0xfe80) return true;   // link-local fe80::/10
  if (g[0] === 0x64 && g[1] === 0xff9b) return true; // NAT64 64:ff9b::/96

  // IPv4-mapped (::ffff:a.b.c.d) and the deprecated IPv4-compatible form.
  const mapped = g.slice(0, 5).every((x) => x === 0) && g[5] === 0xffff;
  const compat = g.slice(0, 6).every((x) => x === 0);
  if (mapped || compat) return isPrivateIPv4((((g[6] << 16) >>> 0) + g[7]) >>> 0);

  return false;
}

// `hostname` comes from the URL parser, so IPv6 arrives bracketed.
function isPrivateHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (host === 'localhost' || host.endsWith('.localhost')) return true;
  if (host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.home.arpa')) return true;

  const v4 = parseIPv4(host);
  if (v4 !== null) return isPrivateIPv4(v4);

  if (host.includes(':')) {
    const v6 = parseIPv6(host);
    // Fail closed: an address shape we can't read is not one we should fetch.
    return v6 === null ? true : isPrivateIPv6(v6);
  }

  // Our own site — auditing ourselves is not the product.
  if (host === 'senjastudio.co.uk' || host.endsWith('.senjastudio.co.uk')) return true;

  return false;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://senjastudio.co.uk');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Validate before rate limiting. This used to run the other way round, so two
  // typos cost the visitor both of their free audits for the day.
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const rawUrl = typeof body.url === 'string' ? body.url.trim() : '';

  if (!rawUrl) return res.status(400).json({ error: 'Missing URL' });
  if (rawUrl.length > MAX_URL_LENGTH) {
    return res.status(400).json({ error: 'That URL is too long. Please enter the homepage address.' });
  }

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: 'Please enter a full URL starting with https://' });
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return res.status(400).json({ error: 'Please enter a full URL starting with https://' });
  }

  if (isPrivateHost(parsed.hostname)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Credentials in the URL are never useful here and shouldn't reach the
  // outbound request or the prompt.
  parsed.username = '';
  parsed.password = '';

  const url = parsed.href;
  const domain = parsed.hostname;

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error:
        "You've used your 2 free audits for today. Book a call for a full manual review — calendly.com/dan-senjastudio/lets-talk",
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Service not configured' });

  // ── STEP 1: Fetch live page ────────────────────────────────────
  let pageContent = '';
  let fetchSuccess = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const pageRes = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SenjaStudioAudit/1.0)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
    });
    clearTimeout(timeout);

    if (pageRes.ok) {
      const html = await pageRes.text();
      pageContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<nav[\s\S]*?<\/nav>/gi, '')
        .replace(/<footer[\s\S]*?<\/footer>/gi, '')
        .replace(/<header[\s\S]*?<\/header>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .replace(/\t/g, ' ')
        .replace(/\s{3,}/g, '\n')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .trim()
        .substring(0, 4000);

      if (pageContent.length > 200) fetchSuccess = true;
    }
  } catch (e) {
    fetchSuccess = false;
  }

  // ── STEP 2: Build prompt ─────────────────────────────────────
  const prompt = fetchSuccess
    ? `You are a specialist mortgage broker website conversion expert at Senja Studio — a premium agency that builds exclusively for mortgage brokers.

You've just read the live homepage of a broker's site. Here is the scraped content:

BROKER: ${url}

HOMEPAGE CONTENT:
${pageContent}

Write a sharp, expert audit of exactly 5 specific conversion problems you can see in this content. Reference their actual copy and structure — not generic advice. Make it feel like you read every word.

Format: Five numbered points. Each point must include:
1. The specific problem (name it, quote or reference their actual content)
2. Why it's costing them enquiries (one sentence — be sharp)
3. The exact fix (one concrete sentence)

Focus on: CTA clarity and segmentation (self-employed, FTB, complex cases), trust signals and Google reviews, FCA/regulatory authorisation display, mobile-first thinking, hero message clarity, WhatsApp or booking friction, and social proof placement.

Tone: Expert, direct, confident. Like a consultant who actually read the site and is cutting through the noise.

End with this exact line format:
"The single highest-impact change for ${domain}: [one specific action based on what you actually saw]."

Keep it under 400 words. Make it feel genuinely personalised — because it is.`
    : `You are a specialist mortgage broker website conversion expert at Senja Studio.

Audit the mortgage broker website: ${url} (domain: ${domain})

The live page couldn't be fetched, so write a sharp audit of 5 common conversion problems this type of site typically has — be specific and actionable, not generic.

Format: Five numbered points. Each must include:
1. The specific problem
2. Why it costs them enquiries (one sentence)
3. The exact fix (one sentence)

Cover: CTA segmentation, Google review placement, FCA authorisation display, mobile UX, hero clarity, WhatsApp friction, social proof.

Tone: Direct, expert.

End with: "The highest-impact change for ${domain}: [specific action]."

Note at the end: "This audit is based on common patterns in the mortgage broker space — book a call for a fully personalised review of your actual site."

Under 380 words.`;

  // ── STEP 3: Call Claude Haiku ────────────────────────────────
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Audit service unavailable. Please try again.' });
    }

    const data = await response.json();
    const result = data.content
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('');

    return res.status(200).json({ result, source: fetchSuccess ? 'live' : 'inferred' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error — please try again in a moment.' });
  }
}
