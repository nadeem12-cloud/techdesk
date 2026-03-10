export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Gemini API key not configured' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userMessage = body.messages?.[0]?.content || '';

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
        }),
      }
    );

    const rawText = await geminiRes.text();
    console.log('Gemini raw response:', rawText.slice(0, 500));

    let data;
    try {
      data = JSON.parse(rawText);
    } catch(e) {
      return res.status(500).json({ error: 'Gemini returned invalid JSON', raw: rawText.slice(0, 300) });
    }

    if (!geminiRes.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(geminiRes.status).json({ error: data?.error?.message || 'Gemini API error' });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      console.error('Empty text from Gemini:', JSON.stringify(data));
      return res.status(500).json({ error: 'Empty response from Gemini', raw: JSON.stringify(data).slice(0,300) });
    }

    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (err) {
    console.error('Proxy error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}