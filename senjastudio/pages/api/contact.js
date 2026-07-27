// pages/api/contact.js
// Proxies contact form submissions to Formspree
// Formspree form ID is set via FORMSPREE_ID env var (currently: xgogpkzq)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://senjastudio.co.uk');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const formId = process.env.FORMSPREE_ID || 'xgogpkzq';
  const { name, email, message, source } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, email, message, source: source || 'website' }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ error: 'Submission failed. Please try again.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal error — please try again.' });
  }
}
