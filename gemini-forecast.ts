// CafeCast · Supabase Edge Function: gemini-forecast
// Keeps the Gemini API key on the server (Edge Functions › Secrets › GEMINI_API_KEY).
// Only signed-in CafeCast users can use it. Tries Gemini 3.8 Flash, then Gemini 3.5 Flash-Lite.

const MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'];

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return reply({ error: 'Use POST.' }, 405);

  // 1. Only signed-in users: ask Supabase Auth who sent this request.
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const apikey = req.headers.get('apikey') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '';
  const who = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: req.headers.get('Authorization') ?? '', apikey },
  }).catch(() => null);
  if (!who || !who.ok) return reply({ error: 'Please sign in to CafeCast again.' }, 401);

  // 2. Read the request.
  let body: { prompt?: string; models?: string[]; ping?: boolean };
  try { body = await req.json(); } catch { return reply({ error: 'Invalid request.' }, 400); }

  const key = Deno.env.get('GEMINI_API_KEY');
  if (body.ping) return reply({ ok: true, configured: !!key });
  if (!key) return reply({ error: 'The AI forecast isn’t set up yet: add GEMINI_API_KEY in Supabase › Edge Functions › Secrets.' }, 500);

  const prompt = String(body.prompt ?? '');
  if (!prompt || prompt.length > 40000) return reply({ error: 'Invalid forecast request.' }, 400);

  // 3. Ask Gemini, falling back to the next model if one is busy or unavailable.
  const wanted = (body.models ?? []).filter((m) => MODELS.includes(m));
  const models = [...new Set([...wanted, ...MODELS])];
  let lastError = 'Gemini could not generate the forecast.';

  for (const model of models) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
        }),
      });
      const data = await r.json().catch(() => ({}));
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (r.ok && text) return reply({ text, model });

      lastError = data?.error?.message ?? `Gemini request failed (${r.status}).`;
      // A rejected key fails on every model, so stop here.
      if (r.status === 401 || r.status === 403 || (r.status === 400 && /api key/i.test(lastError))) {
        return reply({ error: 'The Gemini key on the server was rejected. Check GEMINI_API_KEY in Supabase › Edge Functions › Secrets.' }, 502);
      }
    } catch (e) {
      lastError = `Couldn’t reach Gemini (${(e as Error).message}).`;
    }
  }
  return reply({ error: lastError }, 502);
});
