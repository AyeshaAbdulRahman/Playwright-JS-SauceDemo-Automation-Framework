import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');

test.describe('TC14 - Empty Password', () => {
  test('TC14 - Verify Login with Empty Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username } = loginData.validUsers[0];

    await test.step('Perform login with empty password', async () => {
      await loginPage.login(username, '');
      await attachStepScreenshot(page, '01 - After login attempt');
    });

    await test.step('Verify error message displayed', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(loginPage.errorMessage).toBeVisible();
      await attachStepScreenshot(page, '02 - Error message verified');
    });

    await test.step('Verify error message content', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Password is required');
      await attachStepScreenshot(page, '03 - Error content verified');
    });
  });
});
