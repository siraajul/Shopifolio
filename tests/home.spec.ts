import { test, expect } from '@playwright/test';

test.describe('Homepage Critical Paths', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for preloader to finish
        // We can wait for the 'System Initializing...' text to be visible and then disappear
        const preloader = page.getByText('System Initializing...');
        if (await preloader.isVisible()) {
            await preloader.waitFor({ state: 'detached', timeout: 10000 });
        }
    });

    test('should have correct metadata and title', async ({ page }) => {
        await expect(page).toHaveTitle(/Shift2Dynamic/);
    });

    test('should display Main Headline (LCP)', async ({ page }) => {
        // Check for Hero Title (Stable) instead of Marquee (Moving/Flaky)
        // Use a generic match in case Sanity data loads different text
        const heroTitle = page.getByRole('heading', { level: 1 });
        await expect(heroTitle).toBeVisible();
        // Optional: Check specifically for "We Build" if hardcoded fallbacks are used
        // await expect(heroTitle).toContainText(/We Build/i);
    });

    test('should show Primary Call to Action', async ({ page }) => {
        // Check for "Lets Collaborate" or "Start Project" buttons
        const cta = page.getByRole('link', { name: /Let.*Collaborate/i }).first();
        await expect(cta).toBeVisible();
    });
});
