// pages/api/lead-magnet.js
// Delivers a lead-magnet PDF by email (Resend) and logs the lead to Formspree.
//
// Env vars (set in Vercel — Production, Preview AND Development):
//   RESEND_API_KEY  — required for email delivery
//   FORMSPREE_ID    — optional, defaults to the studio form
//   LEAD_FROM_EMAIL — optional, must be on a Resend-verified domain
//
// Every response path logs a single structured line prefixed with the request id
// so a failure is traceable in Vercel logs without guessing.

import fs from 'fs';
import path from 'path';
import { checkRateLimit, clientIp } from '../../lib/rate-limit';

// ── Config ──────────────────────────────────────────────────────
// The from address MUST be on a domain verified in Resend, or Resend rejects
// the send with 403. senjastudio.co.uk is the verified domain.
const FROM = process.env.LEAD_FROM_EMAIL || 'Dan at Senja Studio <dan@senjastudio.co.uk>';
const REPLY_TO = 'dan@senjastudio.co.uk';
const SITE = 'https://senjastudio.co.uk';

// Resend rejects a request whose total size exceeds ~40MB. Base64 inflates a
// file by ~33%, so cap the raw file well below that.
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 5 sends per IP per hour

const CONTENT = {
  'lead-magnet': {
    subject: 'Your free guide: 5 Things Your Broker Site Is Costing You Right Now',
    file: '5-things-broker-site-guide.pdf',
    label: 'the guide',
    intro: 'Thanks for downloading the guide. Your copy is attached.',
    body: "Inside you'll find the 5 most common reasons broker sites lose enquiries — and the exact fix for each one. Most of these take under an hour to address once you know what to look for.",
  },
  'fca-checklist': {
    subject: 'Your FCA Compliance Checklist for Mortgage Broker Websites',
    file: 'fca-compliance-checklist.pdf',
    label: 'the checklist',
    intro: 'Thanks for downloading the FCA Compliance Checklist. Your copy is attached.',
    body: "Inside you'll find the exact requirements every regulated mortgage broker website must meet — and how to check your site against them in under 10 minutes.",
  },
};

// ── Helpers ─────────────────────────────────────────────────────

function requestId() {
  return Math.random().toString(36).slice(2, 10);
}

function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

// Deliberately permissive: reject what is obviously not an address rather than
// trying to encode RFC 5322. A false rejection costs a real lead.
function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Reads the PDF out of public/. Returns null (never throws) when the file is
// missing, unreadable, oversized, or is not actually a PDF — a placeholder text
// file saved with a .pdf extension used to be emailed as a corrupt attachment.
function readPdf(fileName, rid) {
  const filePath = path.join(process.cwd(), 'public', 'downloads', fileName);

  let buffer;
  try {
    buffer = fs.readFileSync(filePath);
  } catch (err) {
    console.error(`[lead-magnet ${rid}] attachment unreadable path=${filePath} code=${err.code}`);
    return null;
  }

  if (buffer.length > MAX_ATTACHMENT_BYTES) {
    console.error(`[lead-magnet ${rid}] attachment too large bytes=${buffer.length} max=${MAX_ATTACHMENT_BYTES}`);
    return null;
  }

  // %PDF magic bytes — guards against placeholder files being emailed as PDFs.
  // Real readers tolerate a little junk before the header, so scan the first
  // few bytes rather than requiring offset 0 exactly. (5-things-broker-site-
  // guide.pdf shipped with a stray leading newline and would otherwise be
  // rejected outright.)
  const headerOffset = buffer.subarray(0, 32).indexOf('%PDF', 0, 'latin1');
  if (headerOffset === -1) {
    console.error(
      `[lead-magnet ${rid}] not a valid PDF file=${fileName} bytes=${buffer.length} ` +
      `head=${JSON.stringify(buffer.subarray(0, 24).toString('latin1'))}`
    );
    return null;
  }
  if (headerOffset > 0) {
    console.warn(`[lead-magnet ${rid}] ${fileName} has ${headerOffset} junk byte(s) before %PDF — trimming`);
    return buffer.subarray(headerOffset);
  }

  return buffer;
}

function emailHtml({ name, config, downloadUrl, attached }) {
  const greeting = name ? ` ${name}` : '';
  const delivery = attached
    ? `<p style="font-size:15px;line-height:1.7;">${config.intro}</p>`
    : `<p style="font-size:15px;line-height:1.7;">Thanks for requesting ${config.label} — you can
         <a href="${downloadUrl}" style="color:#8B6914;font-weight:600;">download it here</a>.</p>`;

  return `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1428;">
      <p style="font-size: 17px;">Hi${greeting},</p>
      ${delivery}
      <p style="font-size: 15px; line-height: 1.7;">${config.body}</p>
      <p style="font-size: 15px; line-height: 1.7;">
        If you want me to look at your specific site and tell you what's costing you the most,
        <a href="https://calendly.com/dan-senjastudio/lets-talk" style="color: #8B6914;">book a free 30-minute call here</a>.
      </p>
      <p style="font-size: 15px; margin-top: 2rem;">Dan<br>
        <span style="color: #7A7570; font-size: 13px;">Senja Studio — Mortgage Broker Websites</span>
      </p>
    </div>
  `;
}

function emailText({ name, config, downloadUrl, attached }) {
  return [
    `Hi${name ? ` ${name}` : ''},`,
    '',
    attached ? config.intro : `Thanks for requesting ${config.label} — download it here: ${downloadUrl}`,
    '',
    config.body,
    '',
    "If you want me to look at your specific site and tell you what's costing you the most, book a free 30-minute call: https://calendly.com/dan-senjastudio/lets-talk",
    '',
    'Dan',
    'Senja Studio — Mortgage Broker Websites',
  ].join('\n');
}

// ── Handler ─────────────────────────────────────────────────────

export default async function handler(req, res) {
  const rid = requestId();

  res.setHeader('Access-Control-Allow-Origin', SITE);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  // Only ever serve a known lead magnet — never a caller-supplied path.
  const source = Object.prototype.hasOwnProperty.call(CONTENT, body.source) ? body.source : 'lead-magnet';
  const config = CONTENT[source];
  const downloadUrl = `/downloads/${config.file}`;
  const absoluteDownloadUrl = `${SITE}${downloadUrl}`;

  const ip = clientIp(req);

  // Over the limit: refuse honestly. Previously this returned {success:true}
  // with no email sent and no download URL, which is exactly the "API says it
  // worked but nothing arrives" symptom.
  const allowed = await checkRateLimit({ name: 'lead-magnet', ip, limit: RATE_LIMIT, windowMs: WINDOW_MS });
  if (!allowed) {
    console.warn(`[lead-magnet ${rid}] rate limited ip=${ip} email=${email} source=${source}`);
    return res.status(429).json({
      success: false,
      error: "You've already requested this a few times in the last hour. Check your inbox and spam folder, or email dan@senjastudio.co.uk.",
      downloadUrl,
    });
  }

  console.log(`[lead-magnet ${rid}] start source=${source} email=${email} file=${config.file}`);

  // ── 1. Log the lead to Formspree (never fatal) ────────────────
  const formId = process.env.FORMSPREE_ID || 'xgogpkzq';
  try {
    const formRes = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        name: name || 'Not provided',
        phone: phone || 'Not provided',
        source,
        _subject: `New ${source} download — ${email}`,
      }),
    });
    if (!formRes.ok) {
      console.error(`[lead-magnet ${rid}] formspree failed status=${formRes.status}`);
    }
  } catch (err) {
    console.error(`[lead-magnet ${rid}] formspree threw: ${err.message}`);
  }

  // ── 2. Send the email via Resend ──────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    // Not a user-facing failure: they still get the download. But this is a
    // misconfiguration and must be loud in the logs.
    console.error(`[lead-magnet ${rid}] RESEND_API_KEY missing — no email sent. Set it for this environment in Vercel.`);
    return res.status(200).json({ success: true, emailed: false, downloadUrl });
  }

  const pdfBuffer = readPdf(config.file, rid);
  const attached = pdfBuffer !== null;

  const payload = {
    from: FROM,
    to: [email],
    reply_to: REPLY_TO,
    subject: config.subject,
    html: emailHtml({ name, config, downloadUrl: absoluteDownloadUrl, attached }),
    text: emailText({ name, config, downloadUrl: absoluteDownloadUrl, attached }),
  };

  if (attached) {
    payload.attachments = [{ filename: config.file, content: pdfBuffer.toString('base64') }];
  }

  console.log(
    `[lead-magnet ${rid}] sending from="${FROM}" to="${email}" ` +
    `attached=${attached}${attached ? ` bytes=${pdfBuffer.length}` : ' (falling back to download link)'}`
  );

  let emailRes, emailData;
  try {
    emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify(payload),
    });
    emailData = await emailRes.json().catch(() => ({}));
  } catch (err) {
    console.error(`[lead-magnet ${rid}] resend request threw: ${err.message}`);
    // The lead is already captured in Formspree and the file is downloadable,
    // so don't fail the user's journey — but surface it.
    return res.status(200).json({ success: true, emailed: false, downloadUrl });
  }

  if (!emailRes.ok) {
    // Resend's most common rejections: 403 = sending domain not verified,
    // 422 = malformed from/to, 401 = bad key. The name+message tell you which.
    console.error(
      `[lead-magnet ${rid}] RESEND REJECTED status=${emailRes.status} ` +
      `name=${emailData?.name || 'unknown'} message=${emailData?.message || 'none'} ` +
      `from="${FROM}" to="${email}"`
    );
    return res.status(200).json({ success: true, emailed: false, downloadUrl });
  }

  // A 200 from Resend means accepted for delivery, not delivered. If mail still
  // does not arrive after this logs an id, the problem is downstream: check the
  // Resend dashboard for that id (bounced / complained / suppressed) and the
  // domain's SPF, DKIM and DMARC records.
  console.log(`[lead-magnet ${rid}] resend accepted id=${emailData?.id || 'none'} to=${email}`);

  return res.status(200).json({ success: true, emailed: true, attached, downloadUrl });
}
