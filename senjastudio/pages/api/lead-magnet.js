// pages/api/lead-magnet.js
// Handles lead magnet delivery (PDF guide)
// Submits to Formspree for tracking + triggers email delivery
// Set FORMSPREE_ID and RESEND_API_KEY in Vercel env vars
// PDF hosted at: /downloads/5-things-broker-site-guide.pdf (put in public/downloads/)

import fs from 'fs';
import path from 'path';

const rateLimitMap = new Map();
const RATE_LIMIT = 1;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 1 download per IP per day

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
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

  // Rate limit — 1 download per IP per 24hrs
  // (soft limit — same person on mobile/desktop will still get it)
  if (!checkRateLimit(ip)) {
    // Still return success so UX isn't broken — just don't re-send
    return res.status(200).json({ success: true, duplicate: true });
  }

  const { email, name } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const formId = process.env.FORMSPREE_ID || 'xgogpkzq';
  const resendKey = process.env.RESEND_API_KEY;

  // ── 1. Log to Formspree ─────────────────────────────────────
  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        name: name || 'Not provided',
        source: 'lead-magnet',
        _subject: `New lead magnet download — ${email}`,
      }),
    });
  } catch (e) {
    // Non-fatal — continue to email delivery
  }

  // ── 2. Send PDF via Resend ──────────────────────────────────
  if (resendKey) {
    try {
      // Read PDF from filesystem and encode to base64
      const pdfPath = path.join(process.cwd(), 'public', 'downloads', '5-things-broker-site-guide.pdf');
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfBase64 = pdfBuffer.toString('base64');

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Dan at Senja Studio <dan@senjastudio.co.uk>',
          to: [email],
          subject: 'Your free guide: 5 Things Your Broker Site Is Costing You Right Now',
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1428;">
              <p style="font-size: 17px;">Hi${name ? ` ${name}` : ''},</p>
              <p style="font-size: 15px; line-height: 1.7;">Thanks for downloading the guide. Your copy is attached.</p>
              <p style="font-size: 15px; line-height: 1.7;">
                Inside you'll find the 5 most common reasons broker sites lose enquiries — and the exact fix for each one.
                Most of these take under an hour to address once you know what to look for.
              </p>
              <p style="font-size: 15px; line-height: 1.7;">
                If you want me to look at your specific site and tell you what's costing you the most,
                <a href="https://calendly.com/dan-senjastudio/lets-talk" style="color: #C9A84C;">book a free 20-minute call here</a>.
              </p>
              <p style="font-size: 15px; margin-top: 2rem;">Dan<br>
                <span style="color: #7A7570; font-size: 13px;">Senja Studio — Mortgage Broker Websites</span>
              </p>
            </div>
          `,
          attachments: [{
            filename: '5-things-broker-site-guide.pdf',
            content: pdfBase64,
          }]
        }),
      });
    } catch (e) {
      // Email failed — still return success, Formspree captured the lead
    }
  }

  // ── 3. Return download URL ──────────────────────────────────
  // Client-side JS should redirect to this URL after API success
  return res.status(200).json({
    success: true,
    downloadUrl: '/downloads/5-things-broker-site-guide.pdf',
  });
}
