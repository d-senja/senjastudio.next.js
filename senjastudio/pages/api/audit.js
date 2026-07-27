// pages/api/audit.js
// Rate limited: 2 requests per IP per 24 hours
// Set ANTHROPIC_API_KEY in Vercel Environment Variables

const rateLimitMap = new Map();
const RATE_LIMIT = 2;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

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

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error:
        'You've used your 2 free audits for today. Book a call for a full manual review — calendly.com/dan-senjastudio/lets-talk',
    });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return res.status(400).json({ error: 'Please enter a full URL starting with https://' });
  }

  const blocked = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '192.168.',
    '10.0.',
    'senjastudio.co.uk',
  ];
  if (blocked.some((b) => url.includes(b))) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Service not configured' });

  const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];

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
