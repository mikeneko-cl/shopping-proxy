export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const path = req.query.path;
  if (!path) { res.status(400).json({ error: 'path required' }); return; }
  try {
    const url = `https://api.notion.com/v1${path}`;
    const headers = { 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' };
    if (req.headers['authorization']) headers['Authorization'] = req.headers['authorization'];
    const opts = { method: req.method, headers };
    if (req.method === 'POST' || req.method === 'PATCH') opts.body = JSON.stringify(req.body ?? {});
    const r = await fetch(url, opts);
    const json = await r.json();
    res.status(r.status).json(json);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
