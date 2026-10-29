import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages ?? [{ role: 'user', content: body.prompt ?? 'Hello' }];

  const OPENAI_KEY = process.env.OPENAI_API_KEY ?? '';
  if (!OPENAI_KEY) return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 });

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
      max_tokens: 800
    })
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return NextResponse.json({ error: text }, { status: upstream.status });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      } catch (err) {
        const enc = new TextEncoder();
        controller.enqueue(enc.encode(`event: error\ndata: ${String(err)}\n\n`));
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
  });
}
