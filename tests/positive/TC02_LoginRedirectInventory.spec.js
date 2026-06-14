import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');

test.describe('TC02 - Login Redirect', () => {
  test('TC02 - Verify User Redirects to Inventory Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify redirect to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.title')).toHaveText('Products');
      await expect(page.locator('.inventory_list')).toBeVisible();
      await attachStepScreenshot(page, '02 - Inventory redirect verified');
    });
  });
});
