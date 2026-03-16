export const config = { runtime: 'edge' };

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Notion-Version',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  if (!path) {
    return new Response(JSON.stringify({ error: 'path required' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const notionHeaders = {
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };
    const auth = req.headers.get('authorization');
    if (auth) notionHeaders['Authorization'] = auth;

    const fetchOptions = { method: req.method, headers: notionHeaders };
    if (req.method === 'POST' || req.method === 'PATCH') {
      fetchOptions.body = await req.text();
    }

    const notionRes = await fetch(`https://api.notion.com/v1${path}`, fetchOptions);
    const text = await notionRes.text();
    return new Response(text, {
      status: notionRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
