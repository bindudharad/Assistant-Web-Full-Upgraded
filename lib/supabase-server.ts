import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase'; // optional: user can create types
const url = process.env.SUPABASE_URL ?? '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE ?? '';

if (!url || !serviceKey) {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE missing — server features limited.');
}

export const supabaseServer = createClient(url, serviceKey, { auth: { persistSession: false } });

export async function getUserByAccessToken(accessToken?: string | null) {
  if (!accessToken) return null;
  // Validate token using Supabase's user endpoint
  try {
    const { data, error } = await supabaseServer.auth.getUser(accessToken);
    if (error) return null;
    return data?.user ?? null;
  } catch (e) {
    return null;
  }
}
