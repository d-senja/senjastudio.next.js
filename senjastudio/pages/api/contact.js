// pages/api/contact.js
// Single server-side entry point for every form on the site.
//
// The forms used to POST to https://formspree.io/f/<id> straight from the
// browser, which put the form ID in the page source of four different pages.
// Anyone could read it and post to the endpoint directly. Routing through here
// keeps the ID server-side and gives us one place to validate and rate limit.
//
// Env: FORMSPREE_ID (optional, falls back to the studio form)

import { checkRateLimit, clientIp } from '../../lib/rate-limit';

const RATE_LIMIT = 8;
const WINDOW_MS = 60 * 60 * 1000; // 8 submissions per IP per hour

// Every form on the site, with the fields it is allowed to send.
const FORMS = {
  contact: {
    subject: 'Senja Studio — Contact Page Enquiry',
    required: ['name', 'email', 'message'],
    optional: ['company'],
  },
  referral: {
    subject: 'Senja Studio — Referral Programme Signup',
    required: ['name', 'email'],
    optional: ['phone', 'referralMethod'],
  },
  qualify: {
    subject: 'Senja Studio — Qualifying Answers',
    required: [],
    optional: ['website', 'goal', 'timeline', 'pageUrl'],
  },
  objection: {
    subject: 'Senja Studio — Exit Intent Objection',
    required: ['reason'],
    optional: ['additionalFeedback'],
  },
};

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 120,
  phone: 40,
  message: 4000,
  referralMethod: 60,
  reason: 60,
  additionalFeedback: 2000,
  website: 120,
  goal: 120,
  timeline: 120,
  pageUrl: 300,
};

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://senjastudio.co.uk');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: a field hidden from humans. Anything that fills it is a bot.
  // Return 200 so the bot has no signal that it was caught.
  if (typeof body.website_url === 'string' && body.website_url.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  const form = FORMS[body.form];
  if (!form) return res.status(400).json({ error: 'Unknown form.' });

  const allowed = await checkRateLimit({ name: 'contact', ip: clientIp(req), limit: RATE_LIMIT, windowMs: WINDOW_MS });
  if (!allowed) {
    return res.status(429).json({
      error: "You've sent a few messages already. Please try again later, or email dan@senjastudio.co.uk.",
    });
  }

  // Copy across only the fields this form declares, trimmed and length-capped.
  const payload = {};
  for (const field of [...form.required, ...form.optional]) {
    const raw = body[field];
    if (typeof raw !== 'string') continue;
    const value = raw.trim().slice(0, MAX_LENGTHS[field] || 500);
    if (value) payload[field] = value;
  }

  const missing = form.required.filter((f) => !payload[f]);
  if (missing.length) {
    return res.status(400).json({ error: `Please fill in: ${missing.join(', ')}.` });
  }

  if (form.required.includes('email') && !isValidEmail(payload.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const formId = process.env.FORMSPREE_ID || 'xgogpkzq';

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, source: body.form, _subject: form.subject }),
    });

    if (!response.ok) {
      console.error(`[contact] formspree rejected form=${body.form} status=${response.status}`);
      return res.status(502).json({ error: 'Submission failed. Please try again or email dan@senjastudio.co.uk.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(`[contact] formspree threw form=${body.form}: ${err.message}`);
    return res.status(500).json({ error: 'Internal error — please try again.' });
  }
}
