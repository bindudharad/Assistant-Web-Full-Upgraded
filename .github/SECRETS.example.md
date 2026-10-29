# GitHub Secrets example (do NOT commit real values)

Add the following secrets to your repository Settings → Secrets:
- DATABASE_URL: postgres://user:pass@host:5432/dbname
- SUPABASE_URL: https://your-project.supabase.co
- SUPABASE_ANON_KEY: public-anon-key
- SUPABASE_SERVICE_ROLE: service-role-secret (keep private)
- OPENAI_API_KEY: sk-...
- VERCEL_TOKEN: your-vercel-token (for deploy workflow)
- VERCEL_PROJECT_ID (optional)
- VERCEL_ORG_ID (optional)

# Deploy preview guidance
- For PR previews on Vercel, enable "Preview Deployments" in Vercel settings.
- Ensure redirect URLs for Supabase OAuth include both your production domain and `http://localhost:3000`.
