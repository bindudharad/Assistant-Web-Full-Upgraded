# Playwright Debugging & Logs

## Running tests locally
1. Start your app in background:
   ```bash
   npm run dev &
   ```
2. Install browsers (first time):
   ```bash
   npm run test:e2e:install
   ```
3. Run tests:
   ```bash
   npm run test:e2e
   ```

## Collecting logs
- Playwright prints test logs. If a test fails, run with `--debug`:
  ```bash
  npx playwright test --debug
  ```
- To capture server logs while tests run, start the dev server and redirect output to a file:
  ```bash
  npm run dev > dev.log 2>&1 &
  npm run test:e2e | tee e2e.log
  ```
- Attach `dev.log` and `e2e.log` when asking for debugging help. Include the failing test name and the assertion error details.

## Common failures and fixes
- 404 on `/` or other route: ensure Next.js compiled successfully and pages exist under `app/`.
- Authentication failures: ensure Supabase env vars are set and OAuth redirect URLs configured.
- Streaming tests timeout: increase Playwright timeout in `playwright.config.ts` or tune network conditions.
