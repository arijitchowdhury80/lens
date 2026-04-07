import { test, expect } from '@playwright/test';

test('LENS wordmark is visible on homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=LENS')).toBeVisible();
});
