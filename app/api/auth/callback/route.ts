import { NextResponse } from 'next/server';

// This is a simple pass-through callback handler. For many Supabase setups, 
// the OAuth redirect will return a session in the browser — server doesn't always need to handle it.
// Still, we forward user to the frontend route after callback.
export async function GET(req: Request) {
  // optional: inspect query params for provider, access_token etc.
  return NextResponse.redirect('/(auth)/verify');
}
