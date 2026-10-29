import { test, expect } from '@playwright/test';

test('login page shows providers', async ({ page }) => {
  await page.goto('/(auth)/login');
  await expect(page.locator('text=Sign in with Google')).toBeVisible();
  await expect(page.locator('text=Sign in with GitHub')).toBeVisible();
});
