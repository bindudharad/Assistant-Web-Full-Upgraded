import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'e2e',
  use: { headless: true, baseURL: 'http://localhost:3000', actionTimeout: 20000, navigationTimeout: 30000 },
  timeout: 60_000,
  retries: 1
});
