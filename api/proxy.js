export const config = { api: { bodyParser: true } };

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
    const notionUrl = `https://api.notion.com/v1${path}`;
    const notionHeaders = {
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };
    if (req.headers['authorization']) {
      notionHeaders['Authorization'] = req.headers['authorization'];
    }

    const fetchOptions = { method: req.method, headers: notionHeaders };
    if (req.method === 'POST' || req.method === 'PATCH') {
      fetchOptions.body = JSON.stringify(req.body || {});
    }

    const notionRes = await fetch(notionUrl, fetchOptions);
    const json = await notionRes.json();
    return res.status(notionRes.status).json(json);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
