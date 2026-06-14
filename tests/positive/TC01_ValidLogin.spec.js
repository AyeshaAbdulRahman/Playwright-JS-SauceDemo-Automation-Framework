import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');

test.describe('TC01 - Valid Login', () => {
  test('TC01 - Verify Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify successful login to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
      await attachStepScreenshot(page, '02 - Inventory page verified');
    });
  });
});
