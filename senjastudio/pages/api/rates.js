// pages/api/rates.js
// Real UK mortgage rates from the Bank of England's Interactive Database.
//
// This replaces a ticker that displayed hardcoded numbers with a Math.random()
// jitter applied every 8 seconds, labelled "Live UK Mortgage Rates" next to a
// pulsing green dot. Mortgage brokers check real rates daily, so inventing them
// on a site that sells compliance expertise was the wrong trade.
//
// Source: https://www.bankofengland.co.uk/boeapps/database/
// No API key required. Series used:
//   IUMBV34  monthly average 2-year fixed, 75% LTV
//   IUMBV42  monthly average 5-year fixed, 75% LTV
//   IUMTLMV  monthly average standard variable rate
//   IUDBEDR  official Bank Rate (daily)
//
// The fixed-rate series are monthly averages published in arrears, so they are
// labelled with their observation month rather than presented as live.

const SERIES = {
  twoYearFixed: 'IUMBV34',
  fiveYearFixed: 'IUMBV42',
  standardVariable: 'IUMTLMV',
  bankRate: 'IUDBEDR',
};

const BOE_HOST = 'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp';
const FETCH_TIMEOUT_MS = 8000;

// Cached in module scope so a warm instance doesn't re-fetch. The CDN headers
// below do most of the work; this just covers bursts on one instance.
let cache = { at: 0, payload: null };
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function formatDate(d) {
  return `${String(d.getDate()).padStart(2, '0')}/${d.toLocaleString('en-GB', { month: 'short' })}/${d.getFullYear()}`;
}

// Minimal CSV parse — the BoE response is a plain unquoted grid.
function parseSeries(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) throw new Error('empty CSV');

  const header = lines[0].split(',').map((h) => h.trim());
  const latest = {};

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const date = cells[0]?.trim();
    if (!date) continue;
    for (let c = 1; c < header.length; c++) {
      const value = cells[c]?.trim();
      if (!value) continue;                    // series are published at different cadences
      const n = Number(value);
      if (!Number.isFinite(n)) continue;
      latest[header[c]] = { value: n, date };  // later rows overwrite — last wins
    }
  }
  return latest;
}

async function fetchRates() {
  const to = new Date();
  const from = new Date(to.getTime() - 400 * 24 * 60 * 60 * 1000); // long enough to span a monthly series

  const url =
    `${BOE_HOST}?csv.x=yes&Datefrom=${formatDate(from)}&Dateto=${formatDate(to)}` +
    `&SeriesCodes=${Object.values(SERIES).join(',')}&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'SenjaStudio/1.0 (+https://senjastudio.co.uk)', Accept: 'text/csv,*/*' },
    });
    if (!res.ok) throw new Error(`BoE responded ${res.status}`);

    const latest = parseSeries(await res.text());

    const pick = (code) => {
      const hit = latest[code];
      return hit ? { rate: hit.value, asOf: hit.date } : null;
    };

    const payload = {
      twoYearFixed: pick(SERIES.twoYearFixed),
      fiveYearFixed: pick(SERIES.fiveYearFixed),
      standardVariable: pick(SERIES.standardVariable),
      bankRate: pick(SERIES.bankRate),
      source: 'Bank of England',
      sourceUrl: 'https://www.bankofengland.co.uk/boeapps/database/',
    };

    // If the two headline series are missing there is nothing worth showing.
    if (!payload.twoYearFixed || !payload.fiveYearFixed) throw new Error('headline series missing');

    return payload;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const now = Date.now();
  if (cache.payload && now - cache.at < CACHE_TTL_MS) {
    res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(cache.payload);
  }

  try {
    const payload = await fetchRates();
    cache = { at: now, payload };
    // Rates move monthly at most, so cache hard at the edge and serve stale
    // while revalidating rather than hitting the BoE on every cold start.
    res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(payload);
  } catch (err) {
    console.error(`[rates] BoE fetch failed: ${err.message}`);
    // Serve a stale payload if we have one rather than showing nothing.
    if (cache.payload) {
      res.setHeader('Cache-Control', 'public, s-maxage=300');
      return res.status(200).json({ ...cache.payload, stale: true });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'Rates unavailable' });
  }
}
