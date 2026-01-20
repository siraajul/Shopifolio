import { test, chromium } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance', () => {
    test('should pass lighthouse performance audit', async () => {
        const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
        });
        const page = await browser.newPage();

        // Ensure the server is running on port 3000 before running this test
        await page.goto('http://localhost:3000');

        await playAudit({
            page: page,
            thresholds: {
                performance: 50, // Start low to ensure pass, then tune up
                accessibility: 50,
                'best-practices': 50,
                seo: 50,
            },
            port: 9222,
            opts: {
                loglevel: 'info',
            },
        });

        await browser.close();
    });
});
