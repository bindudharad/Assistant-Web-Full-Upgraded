import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();
  const text = payload.text ?? '';
  return NextResponse.json({ summary: text.slice(0,120) + (text.length>120 ? '...' : '') });
}
