import { buffer } from 'micro';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const path = req.query.path;
  if (!path) {
    res.status(400).json({ error: 'path required' });
    return;
  }

  try {
    const notionHeaders = {
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };
    if (req.headers['authorization']) {
      notionHeaders['Authorization'] = req.headers['authorization'];
    }

    const opts = { method: req.method, headers: notionHeaders };

    if (req.method === 'POST' || req.method === 'PATCH') {
      const buf = await buffer(req);
      opts.body = buf.toString();
    }

    const r = await fetch(`https://api.notion.com/v1${path}`, opts);
    const text = await r.text();
    res.status(r.status).setHeader('Content-Type', 'application/json').end(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
