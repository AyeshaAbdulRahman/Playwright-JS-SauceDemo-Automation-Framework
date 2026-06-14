import { test as base, expect } from '@playwright/test';
import BasePage from '../pages/BasePage.js';
import { attachScreenshotAfterEach } from '../utilities/Screenshot.js';

const APP_URL = 'https://www.saucedemo.com/';

export const test = base.extend({
  pageSetup: [
    async ({ page }, use) => {
      const basePage = new BasePage(page);
      await basePage.navigate(APP_URL);
      await use();
    },
    { auto: true },
  ],
});

test.afterEach(async ({ page }, testInfo) => {
  await attachScreenshotAfterEach(page, testInfo);
});

export { expect };
