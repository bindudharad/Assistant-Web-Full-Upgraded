import { NextResponse } from 'next/server';
import { callOpenAI } from '../../../lib/openai';
import type { ChatCompletionRequestMessage } from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionRequestMessage[] = body.messages ?? [{ role: 'user', content: body.prompt ?? 'Hello' }];
    const reply = await callOpenAI(messages);
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
