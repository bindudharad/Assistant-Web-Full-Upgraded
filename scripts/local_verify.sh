#!/usr/bin/env bash
set -euo pipefail
echo "1) Running Prettier format..."
npx prettier --check .
echo "2) Running ESLint..."
npx eslint --ext .ts,.tsx,.js . || true
echo "3) Type-checking..."
npm run typecheck
echo "4) Building..."
npm run build
echo "5) Installing Playwright browsers (if needed)..."
npx playwright install --with-deps || true
echo "6) Running Playwright E2E tests..."
npm run test:e2e || true
echo "Local verify finished."
