export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const path = req.query.path;
  if (!path) { res.status(400).json({ error: 'path required' }); return; }
  const url = `https://api.notion.com/v1${path}`;
  const headers = {};
  if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
  if (req.headers['notion-version']) headers['Notion-Version'] = req.headers['notion-version'];
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
  const options = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    options.body = JSON.stringify(req.body);
  }
  const response = await fetch(url, options);
  const data = await response.json();
  res.status(response.status).json(data);
}export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const path = req.query.path;
  if (!path) { res.status(400).json({ error: 'path required' }); return; }
  const url = `https://api.notion.com/v1${path}`;
  const headers = {};
  if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
  if (req.headers['notion-version']) headers['Notion-Version'] = req.headers['notion-version'];
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
  const options = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    options.body = JSON.stringify(req.body);
  }
  const response = await fetch(url, options);
  const data = await response.json();
  res.status(response.status).json(data);
}export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Notion-Version');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const path = req.query.path;
  if (!path) { res.status(400).json({ error: 'path required' }); return; }
  const url = `https://api.notion.com/v1${path}`;
  const headers = {};
  if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
  if (req.headers['notion-version']) headers['Notion-Version'] = req.headers['notion-version'];
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
  const options = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    options.body = JSON.stringify(req.body);
  }
  const response = await fetch(url, options);
  const data = await response.json();
  res.status(response.status).json(data);
}
