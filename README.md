# Assistant Web Full — Upgraded (OpenAI + Supabase + DB + Visuals)

This upgrade wires OpenAI proxying, Supabase auth endpoints, DB migration + seed scripts, stricter TypeScript types, and improved visuals (framer-motion + recharts).

## Environment variables required (create .env.local)
- OPENAI_API_KEY=your_openai_key
- SUPABASE_URL=https://your-supabase-url.supabase.co
- SUPABASE_ANON_KEY=your_supabase_anon_key
- SUPABASE_SERVICE_ROLE=your_service_role_key (for admin endpoints)
- DATABASE_URL=postgres://user:pass@host:port/dbname

## Run locally
1. npm install
2. npm run migrate   # applies SQL in /db using DATABASE_URL
3. npm run seed      # seeds demo data
4. npm run dev

Notes:
- The OpenAI client uses the official `openai` npm package and expects OPENAI_API_KEY.
- Supabase admin actions require SUPABASE_SERVICE_ROLE; keep it secret.


## OAuth (Supabase)
To enable Google/GitHub OAuth in Supabase:
1. Open your Supabase project dashboard → Authentication → Providers.
2. Enable Google and GitHub and set redirect URLs to: `https://your-domain.com` and `http://localhost:3000` for local testing.
3. Add SUPABASE_URL and SUPABASE_ANON_KEY to your `.env.local`.

## Vercel deployment
A sample `vercel.json` and GitHub Actions workflow are included to deploy on push to `main`. Set the following GitHub secrets in your repo:
- VERCEL_TOKEN
- VERCEL_ORG_ID (optional)
- VERCEL_PROJECT_ID (optional)
- DATABASE_URL
- SUPABASE_SERVICE_ROLE
- SUPABASE_URL
- SUPABASE_ANON_KEY
- OPENAI_API_KEY


## Streaming OpenAI
The `/api/openai/stream` endpoint proxies OpenAI streaming responses as an SSE stream. The client Chat UI demonstrates a simple streaming consumer. For production, parse SSE 'data:' frames properly and handle reconnects.

## CI and Deploy
- CI workflow runs migrations (requires DATABASE_URL secret), builds the app, and performs a quick smoke test.
- Vercel deploy workflow uses `VERCEL_TOKEN` secret to deploy on push to main.


## Simulated local run & expected outputs

1. Install deps:

```
npm install
```

2. (Optional) Install Playwright browsers:

```
npm run test:e2e:install
```

3. Start dev server:

```
npm run dev
```

Expected console output (abridged):

```
> assistant-web-full-upgrade@1.0.0 dev
> next dev

▲ Next.js 14.2.5
- Local:        http://localhost:3000

✓ Ready in 3.5s
```

4. Run e2e tests (after starting app in background):

```
npm run test:e2e
```

Expected Playwright output (abridged):

```
Running 3 tests
  ✓ homepage has title and links (3s)
  ✓ main home loads (2s)
  ✓ login page shows providers (1s)

3 passed
```

Notes: The above outputs are **examples**. Your actual timings and logs will vary depending on your machine and network.


## Linting and formatting
Run `npm run lint` to run ESLint (strict). Run `npm run format` to auto-format with Prettier.

## Guarded pages and server sessions
The project includes `lib/supabase-server.ts` with a `getUserByAccessToken` helper that reads `sb-access-token` from cookies for server-side guarded pages. See `app/(main)/profile/secure.page.tsx` for an example.
