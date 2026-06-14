import { test } from '@playwright/test';

/**

 * @param {import('@playwright/test').Page} page
 * @param {string} name - Attachment name
 */
export async function attachStepScreenshot(page, name) {
  await test.info().attach(name, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}

/**
 * Post-test screenshots for reports; use only from test.afterEach.
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').TestInfo} testInfo
 */
export async function attachScreenshotAfterEach(page, testInfo) {
  await testInfo.attach('Final Screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('Failure Screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  }
}

export default { 
  attachStepScreenshot, 
  attachScreenshotAfterEach 
};
