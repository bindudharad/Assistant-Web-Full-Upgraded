import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? '';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE ?? '';

export async function POST(req: Request) {
  if (!url || !serviceRole) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  try {
    const body = await req.json();
    const email = body.email as string;
    const password = body.password as string;
    const client = createClient(url, serviceRole);
    const { data, error } = await client.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ user: data.user });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
