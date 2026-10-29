# Vercel Deployment Guide (detailed)

## Required environment variables (set in Vercel project settings or GitHub Actions secrets)
- OPENAI_API_KEY — your OpenAI API key (keep secret)
- SUPABASE_URL — https://<project>.supabase.co
- SUPABASE_ANON_KEY — public anon key (used client-side)
- SUPABASE_SERVICE_ROLE — service role secret (server-side only)
- DATABASE_URL — Postgres connection string for migrations/seeding (optional if using Supabase DB)
- NEXT_PUBLIC_VERCEL_ENV — optional
- VERCEL_TOKEN — for CI deploy action (if using GitHub Actions)

## Deployment steps
1. Create a Vercel project connected to your GitHub repo.
2. In Vercel Dashboard → Settings → Environment Variables, add the required vars for Production and Preview (use different values if needed).
3. For Supabase, go to your Supabase project → Settings → API and copy the `Project URL` and `anon` and service role keys.
4. Push to `main` branch — GitHub Actions `deploy-vercel.yml` will trigger (if set up). Or let Vercel build directly.

## DNS / Custom Domain steps (example using example.com)
1. In Vercel Dashboard, add your domain `example.com`.
2. Vercel will provide DNS records (CNAME or A + TXT). Copy these records.
3. In your DNS provider (GoDaddy, Cloudflare, Namecheap):
   - Add CNAME record: `www` → `cname.vercel-dns.com.` (value from Vercel)
   - Add A records if Vercel requested them (IPv4 addresses)
   - Add the TXT verification record if requested
4. Wait for propagation (usually < 1 hour, up to 24 hours). Use `dig` or `nslookup` to verify.
5. In Vercel, mark domain as the primary domain and set `Enforce HTTPS`.

## Security notes
- DO NOT expose `SUPABASE_SERVICE_ROLE` to the client or public repo. Store it only in server environment variables.
- Rotate and revoke keys if leaked.
- Monitor OpenAI usage from the OpenAI dashboard.
