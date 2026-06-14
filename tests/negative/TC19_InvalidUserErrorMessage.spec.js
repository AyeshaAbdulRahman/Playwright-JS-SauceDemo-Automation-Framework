import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const invalidLoginData = JsonReader.readJson('invalidLoginData.json');

test.describe('TC20 - Invalid User Error Message', () => {
  test('TC20 - Verify Error Message for Invalid User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password, expectedError } = invalidLoginData.invalidUsers[0];

    await test.step('Perform login with invalid user credentials', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login attempt');
    });

    await test.step('Verify error message displayed', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(loginPage.errorMessage).toBeVisible();
      await attachStepScreenshot(page, '02 - Error message visible');
    });

    await test.step('Verify error message content', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(expectedError);
      await attachStepScreenshot(page, '03 - Error content verified');
    });
  });
});
