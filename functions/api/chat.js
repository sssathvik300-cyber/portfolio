import { buildSystemPrompt } from './_profile.js';

// Models are tried in order. Edit this list if Google deprecates one.
const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

async function callGemini(model, body, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

// Try each model in order. For transient overloads (429/503), retry the same
// model a few times with exponential backoff before moving to the next model.
async function callWithFallback(geminiBody, apiKey) {
  const transient = [429, 503];
  let lastStatus = 0;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const res = await callGemini(model, geminiBody, apiKey);
      if (res.ok) return res;
      lastStatus = res.status;
      // 404 (model gone) or any non-transient error: stop retrying this model, try the next.
      if (res.status === 404 || !transient.includes(res.status)) break;
      // Transient overload: wait, then retry the same model.
      await new Promise(r => setTimeout(r, 600 * Math.pow(2, attempt)));
    }
  }
  const err = new Error(`All models unavailable (last status ${lastStatus})`);
  err.overloaded = transient.includes(lastStatus);
  throw err;
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured." }), { status: 500 });
    }

    const systemInstruction = buildSystemPrompt();

    // Construct the contents array for Gemini
    // Filter history to ensure alternating user/model roles, starting with 'user'
    const contents = [];
    for (const msg of history) {
      const role = (msg.role === 'assistant' || msg.role === 'bot') ? 'model' : 'user';
      
      // The history must start with 'user'
      if (contents.length === 0 && role === 'model') {
        continue;
      }
      
      // Prevent consecutive same roles
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += "\n" + msg.content;
      } else {
        contents.push({
          role: role,
          parts: [{ text: msg.content }]
        });
      }
    }

    // Add the current message
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += "\n" + message;
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }

    const geminiRequestBody = {
      system_instruction: {
        parts: { text: systemInstruction }
      },
      contents: contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 }
    };

    const response = await callWithFallback(geminiRequestBody, apiKey);

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('Empty response from model');

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    // When models are just overloaded, show a friendly chat message instead of a
    // raw error, and return 200 so the UI renders it as a normal reply.
    if (error.overloaded) {
      return new Response(JSON.stringify({
        reply: "I'm getting a lot of requests right now and couldn't think straight — please try again in a moment."
      }), { headers: { "Content-Type": "application/json" }, status: 200 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
