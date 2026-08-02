// Minimal dependency-free PDF 1.4 generator for the FCA compliance checklist.
const fs = require('fs');

const PAGE_W = 595.28, PAGE_H = 841.89;
const MARGIN = 56;
const MAX_W = PAGE_W - MARGIN * 2;

// Helvetica avg char width factors (approx, per 1pt font size)
const W_REG = 0.5, W_BOLD = 0.55;

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
    // PDFDocEncoding: map the few non-ASCII chars we use
    .replace(/£/g, '\\243').replace(/—/g, '-').replace(/–/g, '-')
    .replace(/['']/g, "'").replace(/[""]/g, '"').replace(/…/g, '...').replace(/·/g, '-')
    .replace(/✓/g, '[x]').replace(/[^\x20-\x7E\\()]/g, '');
}

function wrap(text, size, bold) {
  const cw = size * (bold ? W_BOLD : W_REG);
  const maxChars = Math.floor(MAX_W / cw);
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (test.length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

const NAVY = '0.102 0.078 0.157';
const GOLD = '0.788 0.659 0.298';
const BODY = '0.20 0.20 0.20';

// Document content model
const DOC = [
  { t: 'cover' },
  { t: 'h1', s: 'FCA Compliance Checklist' },
  { t: 'lead', s: 'For UK mortgage broker websites. Work through each section and tick off what your site already does. Anything unticked is a gap worth closing.' },

  { t: 'h2', s: '1. Authorisation & regulatory status' },
  { t: 'item', s: 'Your FCA authorisation statement appears on every page, normally in the footer.' },
  { t: 'item', s: 'The statement names the authorised firm exactly as it appears on the FS Register.' },
  { t: 'item', s: 'Your FCA Firm Reference Number (FRN) is displayed alongside it.' },
  { t: 'item', s: 'If you are an appointed representative, the principal firm is named and its FRN shown.' },
  { t: 'item', s: 'The text is legible - real body-copy size and contrast, not 8pt grey on grey.' },
  { t: 'item', s: 'Details on your site match the FS Register entry (trading names included).' },
  { t: 'note', s: 'Typical wording: "[Firm] is authorised and regulated by the Financial Conduct Authority. FCA Firm Reference Number: 123456."' },

  { t: 'h2', s: '2. Financial promotions' },
  { t: 'item', s: 'Every claim on the site is fair, clear and not misleading (PERG / MCOB 3A).' },
  { t: 'item', s: 'No guarantees of approval, acceptance or a specific outcome anywhere on the site.' },
  { t: 'item', s: 'Any rate shown carries its date, product conditions and a variability warning.' },
  { t: 'item', s: 'Comparative claims against banks or other brokers can be evidenced on request.' },
  { t: 'item', s: 'Testimonials do not imply a guaranteed result for future clients.' },
  { t: 'item', s: 'Risk warnings sit next to the claim they qualify, not buried in the footer.' },
  { t: 'item', s: 'Your fee position is stated plainly, including when a fee becomes payable.' },
  { t: 'item', s: 'Where relevant: "Your home may be repossessed if you do not keep up repayments on your mortgage."' },
  { t: 'item', s: 'A dated record of each promotion is retained before it goes live.' },

  { t: 'h2', s: '3. Data protection & lead capture' },
  { t: 'item', s: 'Every form links to a privacy policy that is actually reachable.' },
  { t: 'item', s: 'Consent is explicit and opt-in. No pre-ticked boxes anywhere.' },
  { t: 'item', s: 'Marketing consent is separate from the enquiry itself.' },
  { t: 'item', s: 'The form states what the data is used for and how long it is kept.' },
  { t: 'item', s: 'Your privacy policy covers lawful basis, retention, third parties and data subject rights.' },
  { t: 'item', s: 'Form submissions travel over HTTPS and land somewhere access-controlled.' },
  { t: 'item', s: 'You only collect fields you genuinely need at enquiry stage.' },

  { t: 'h2', s: '4. Cookies & tracking' },
  { t: 'item', s: 'A consent banner appears before any non-essential cookie is set (PECR).' },
  { t: 'item', s: 'Rejecting is as easy as accepting - both are one click, equally prominent.' },
  { t: 'item', s: 'Analytics and advertising tags stay dormant until consent is given.' },
  { t: 'item', s: 'The choice persists and can be changed later.' },
  { t: 'item', s: 'Your cookie policy lists each cookie, its purpose and its lifespan.' },

  { t: 'h2', s: '5. Complaints & client information' },
  { t: 'item', s: 'Your complaints procedure is published and easy to find.' },
  { t: 'item', s: 'The Financial Ombudsman Service is referenced with a working link.' },
  { t: 'item', s: 'FSCS protection is explained where it applies to your services.' },
  { t: 'item', s: 'Your registered company name, number and registered address are shown.' },
  { t: 'item', s: 'Contact details are current and monitored.' },

  { t: 'h2', s: '6. Accessibility & technical' },
  { t: 'item', s: 'Body text meets WCAG AA contrast (4.5:1) against its background.' },
  { t: 'item', s: 'Every meaningful image has descriptive alt text.' },
  { t: 'item', s: 'Forms are fully keyboard navigable with visible focus states.' },
  { t: 'item', s: 'Tap targets are at least 44x44px on mobile.' },
  { t: 'item', s: 'The site is served over HTTPS with a valid certificate.' },
  { t: 'item', s: 'Mobile load time is under 3 seconds - check at pagespeed.web.dev.' },

  { t: 'h2', s: '7. Review cadence' },
  { t: 'item', s: 'Site copy is reviewed against MCOB at least annually.' },
  { t: 'item', s: 'Any rates or figures are re-checked whenever the market moves.' },
  { t: 'item', s: 'Authorisation details are re-checked after any firm or network change.' },
  { t: 'item', s: 'A dated record of each review is kept for your compliance file.' },

  { t: 'outro' },
];

// ---- layout into pages -------------------------------------------------
const pages = [];
let ops = [];
let y = 0;

function newPage() {
  if (ops.length) pages.push(ops);
  ops = [];
  y = PAGE_H - MARGIN;
}

function text(str, { size = 10, bold = false, color = BODY, indent = 0, lead = 14 }) {
  const lines = wrap(str, size, bold);
  for (const ln of lines) {
    if (y < MARGIN + 40) newPage();
    ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${color} rg 1 0 0 1 ${MARGIN + indent} ${y} Tm (${esc(ln)}) Tj ET`);
    y -= lead;
  }
}

function space(n) { y -= n; }

function rule() {
  if (y < MARGIN + 40) newPage();
  ops.push(`${GOLD} RG 0.8 w ${MARGIN} ${y + 4} m ${PAGE_W - MARGIN} ${y + 4} l S`);
  y -= 10;
}

newPage();

for (const b of DOC) {
  switch (b.t) {
    case 'cover':
      ops.push(`${NAVY} rg 0 0 ${PAGE_W} ${PAGE_H} re f`);
      ops.push(`BT /F2 30 Tf 1 1 1 rg 1 0 0 1 ${MARGIN} ${PAGE_H - 300} Tm (FCA Compliance) Tj ET`);
      ops.push(`BT /F2 30 Tf ${GOLD} rg 1 0 0 1 ${MARGIN} ${PAGE_H - 338} Tm (Checklist) Tj ET`);
      ops.push(`${GOLD} RG 1.5 w ${MARGIN} ${PAGE_H - 362} m ${MARGIN + 90} ${PAGE_H - 362} l S`);
      ops.push(`BT /F1 12 Tf 0.75 0.75 0.78 rg 1 0 0 1 ${MARGIN} ${PAGE_H - 396} Tm (For UK mortgage broker websites) Tj ET`);
      ops.push(`BT /F1 10 Tf 0.55 0.55 0.60 rg 1 0 0 1 ${MARGIN} ${MARGIN + 26} Tm (Senja Studio - Mortgage Broker Website Design) Tj ET`);
      ops.push(`BT /F1 10 Tf ${GOLD} rg 1 0 0 1 ${MARGIN} ${MARGIN + 10} Tm (senjastudio.co.uk) Tj ET`);
      newPage();
      break;
    case 'h1':
      text(b.s, { size: 22, bold: true, color: NAVY, lead: 28 });
      space(4); rule(); space(6);
      break;
    case 'lead':
      text(b.s, { size: 10.5, color: BODY, lead: 15 });
      space(14);
      break;
    case 'h2':
      if (y < MARGIN + 110) newPage();
      space(8);
      text(b.s, { size: 13, bold: true, color: NAVY, lead: 18 });
      space(2); rule(); space(4);
      break;
    case 'item':
      if (y < MARGIN + 40) newPage();
      ops.push(`${GOLD} RG 0.9 w ${MARGIN} ${y - 7.5} ${9} ${9} re S`);
      text(b.s, { size: 10, color: BODY, indent: 18, lead: 13.5 });
      space(4.5);
      break;
    case 'note':
      space(4);
      text(b.s, { size: 9.5, color: '0.42 0.35 0.16', indent: 4, lead: 13 });
      space(8);
      break;
    case 'outro':
      if (y < MARGIN + 280) newPage();
      space(20); rule(); space(10);
      text('This checklist is general guidance for website content, not legal or compliance advice. Senja Studio is not authorised or regulated by the FCA. Confirm your obligations with your compliance officer or network before publishing.', { size: 9, color: '0.45 0.45 0.45', lead: 12.5 });
      space(14);
      text('Want this handled for you?', { size: 13, bold: true, color: NAVY, lead: 18 });
      space(2);
      text('Every site Senja Studio builds ships with these items in place from day one - authorisation statement, compliant copy, GDPR forms and a real cookie consent banner. Delivered in 7 days from \\243 2,500.', { size: 10, color: BODY, lead: 14 });
      space(6);
      text('Book a free 30-minute call: calendly.com/dan-senjastudio/lets-talk', { size: 10, bold: true, color: '0.42 0.35 0.16', lead: 14 });
      text('dan@senjastudio.co.uk  -  senjastudio.co.uk', { size: 10, color: BODY, lead: 14 });
      break;
  }
}
newPage();

// ---- assemble PDF ------------------------------------------------------
const objs = [];
function obj(s) { objs.push(s); return objs.length; }

const fontReg = obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
const fontBold = obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

// Reserve the /Pages object id up front so each /Page can reference its parent.
const pagesId = obj('<< >>');
const kids = [];
for (const p of pages) {
  const content = p.join('\n');
  const cid = obj(`<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`);
  const pid = obj(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${fontReg} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${cid} 0 R >>`);
  kids.push(`${pid} 0 R`);
}
objs[pagesId - 1] = `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${kids.length} >>`;
const catalog = obj(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
const info = obj(`<< /Title (FCA Compliance Checklist for Mortgage Broker Websites) /Author (Senja Studio) /Creator (Senja Studio) /Subject (FCA compliance checklist for UK mortgage broker websites) >>`);

let out = '%PDF-1.4\n';
const offsets = [0];
objs.forEach((o, i) => {
  offsets.push(Buffer.byteLength(out, 'latin1'));
  out += `${i + 1} 0 obj\n${o}\nendobj\n`;
});
const xref = Buffer.byteLength(out, 'latin1');
out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objs.length; i++) out += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
out += `trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

fs.writeFileSync(process.argv[2], Buffer.from(out, 'latin1'));
console.log(`Wrote ${process.argv[2]} - ${kids.length} pages, ${Buffer.byteLength(out, 'latin1')} bytes`);
