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

  const { email, name, source, pdf } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const formId = process.env.FORMSPREE_ID || 'xgogpkzq';
  const resendKey = process.env.RESEND_API_KEY;

  // Determine which PDF to send based on source
  const pdfFileName = pdf || '5-things-broker-site-guide.pdf';
  const leadSource = source || 'lead-magnet';

  // Configure content based on source
  const config = {
    'lead-magnet': {
      subject: 'Your free guide: 5 Things Your Broker Site Is Costing You Right Now',
      pdfName: '5-things-broker-site-guide.pdf',
      intro: 'Thanks for downloading the guide. Your copy is attached.',
      body: 'Inside you\'ll find the 5 most common reasons broker sites lose enquiries — and the exact fix for each one. Most of these take under an hour to address once you know what to look for.'
    },
    'fca-checklist': {
      subject: 'Your FCA Compliance Checklist for Mortgage Broker Websites',
      pdfName: 'fca-compliance-checklist.pdf',
      intro: 'Thanks for downloading the FCA Compliance Checklist. Your copy is attached.',
      body: 'Inside you\'ll find the exact requirements every regulated mortgage broker website must meet — and how to check your site against them in under 10 minutes.'
    }
  };

  const emailConfig = config[leadSource] || config['lead-magnet'];

  // ── 1. Log to Formspree ─────────────────────────────────────
  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        name: name || 'Not provided',
        source: leadSource,
        _subject: `New ${leadSource} download — ${email}`,
      }),
    });
  } catch (e) {
    // Non-fatal — continue to email delivery
  }

  // ── 2. Send PDF via Resend ──────────────────────────────────
  if (resendKey) {
    try {
      // Read PDF from filesystem and encode to base64
      const pdfPath = path.join(process.cwd(), 'public', 'downloads', pdfFileName);
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfBase64 = pdfBuffer.toString('base64');

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Dan at Senja Studio <dan@senjastudio.co.uk>',
          to: [email],
          subject: emailConfig.subject,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1428;">
              <p style="font-size: 17px;">Hi${name ? ` ${name}` : ''},</p>
              <p style="font-size: 15px; line-height: 1.7;">${emailConfig.intro}</p>
              <p style="font-size: 15px; line-height: 1.7;">
                ${emailConfig.body}
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
            filename: emailConfig.pdfName,
            content: pdfBase64,
          }]
        }),
      });

      const emailData = await emailRes.json();
      if (!emailRes.ok) {
        console.error('Resend API error:', emailRes.status, emailData);
      }
    } catch (e) {
      // Email failed — still return success, Formspree captured the lead
      console.error('Failed to send email:', e.message);
    }
  }

  // ── 3. Return download URL ──────────────────────────────────
  // Client-side JS should redirect to this URL after API success
  return res.status(200).json({
    success: true,
    downloadUrl: `/downloads/${pdfFileName}`,
  });
}
