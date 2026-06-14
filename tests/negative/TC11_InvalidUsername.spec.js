import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

test.describe('TC11 - Invalid Username', () => {
  test('TC11 - Verify Login with Invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Perform login with invalid username', async () => {
      await loginPage.login('invalid_user', 'secret_sauce');
      await attachStepScreenshot(page, '01 - After login attempt');
    });

    await test.step('Verify error message displayed', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(loginPage.errorMessage).toBeVisible();
      await attachStepScreenshot(page, '02 - Error message verified');
    });

    await test.step('Verify error message content', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Username and password do not match');
      await attachStepScreenshot(page, '03 - Error content verified');
    });
  });
});
