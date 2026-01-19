import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {

    // Helper to handle the initial preloader
    const waitForPageReady = async (page) => {
        const preloader = page.getByText('System Initializing...');
        if (await preloader.isVisible()) {
            await preloader.waitFor({ state: 'detached', timeout: 15000 });
        }
        // Wait a bit extra for animations to settle
        await page.waitForTimeout(2000);
    };

    test('Homepage Visual Check', async ({ page }) => {
        await page.goto('/');
        await waitForPageReady(page);

        // Disable animations/tickers if possible or mask them matches
        // For now, we capture the full page. 
        // Note: 3D canvases and infinite tickers might cause flakiness.
        await expect(page).toHaveScreenshot('homepage-desktop.png', {
            fullPage: true,
            // Increasing threshold slightly to tolerate minor rendering diffs
            maxDiffPixelRatio: 0.02,
            timeout: 15000
        });
    });

    test('Work Page Visual Check', async ({ page }) => {
        await page.goto('/work');
        await waitForPageReady(page);

        await expect(page).toHaveScreenshot('work-desktop.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.02
        });
    });

    test('Planner Project Visual Check', async ({ page }) => {
        await page.goto('/planner');
        await waitForPageReady(page);

        await expect(page).toHaveScreenshot('planner-desktop.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.02
        });
    });

});
