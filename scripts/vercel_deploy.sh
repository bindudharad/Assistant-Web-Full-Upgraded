#!/usr/bin/env bash
# vercel_deploy.sh - helper to prepare secrets and deploy to Vercel via CLI (requires vercel & gh installed)
# Usage: ./vercel_deploy.sh <vercel-token> <vercel-org-id> <vercel-project-id> <database-url> <supabase-service-role> <supabase-url> <supabase-anon-key> <openai-key>

if [ "$#" -lt 8 ]; then
  echo "Usage: $0 VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID DATABASE_URL SUPABASE_SERVICE_ROLE SUPABASE_URL SUPABASE_ANON_KEY OPENAI_API_KEY"
  exit 1
fi

VERCEL_TOKEN=$1
VERCEL_ORG_ID=$2
VERCEL_PROJECT_ID=$3
DATABASE_URL=$4
SUPABASE_SERVICE_ROLE=$5
SUPABASE_URL=$6
SUPABASE_ANON_KEY=$7
OPENAI_API_KEY=$8

echo "1) Login to Vercel CLI (if not already): vercel login"
echo "2) Set project env vars using Vercel CLI:"

echo "vercel env add DATABASE_URL production <<< "$DATABASE_URL""
echo "vercel env add SUPABASE_SERVICE_ROLE production <<< "$SUPABASE_SERVICE_ROLE""
echo "vercel env add SUPABASE_URL production <<< "$SUPABASE_URL""
echo "vercel env add SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY""
echo "vercel env add OPENAI_API_KEY production <<< "$OPENAI_API_KEY""

echo "3) Deploy to Vercel (production):"
echo "vercel --prod --confirm"

echo "4) (Optional) Use GitHub Actions: ensure secrets in GitHub: VERCEL_TOKEN, DATABASE_URL, SUPABASE_SERVICE_ROLE, SUPABASE_URL, SUPABASE_ANON_KEY, OPENAI_API_KEY"
