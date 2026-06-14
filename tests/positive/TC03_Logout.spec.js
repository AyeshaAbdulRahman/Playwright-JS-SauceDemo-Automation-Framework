import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');

test.describe('TC03 - Logout', () => {
  test('TC03 - Verify Logout Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await attachStepScreenshot(page, '02 - Login verified');
    });

    await test.step('Perform logout action', async () => {
      await loginPage.logout();
      await attachStepScreenshot(page, '03 - After logout');
    });

    await test.step('Verify redirected to login page', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('#login-button')).toBeVisible();
      await expect(page.locator('#login_credentials')).toBeVisible();
      await attachStepScreenshot(page, '04 - Logout verified');
    });
  });
});
