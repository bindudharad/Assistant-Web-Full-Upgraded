import { test, expect } from '@playwright/test';

test('homepage has welcome and link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Welcome to Assistant Web')).toBeVisible();
  await expect(page.locator('text=Open Main Home')).toBeVisible();
});

test('main home loads', async ({ page }) => {
  await page.goto('/(main)/home');
  await page.waitForSelector('h2', { timeout: 10000 });
  await expect(page.locator('h2')).toContainText('Main Home');
});
