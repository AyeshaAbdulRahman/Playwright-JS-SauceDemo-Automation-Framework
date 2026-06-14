import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const checkoutData = JsonReader.readJson('checkoutData.json');
const PRODUCT = 'Sauce Labs Backpack';

test.describe('TC18 - Empty Postal Code', () => {
  test('TC18 - Verify Checkout with Empty Postal Code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const { username, password } = loginData.validUsers[0];
    const { firstName, lastName } = checkoutData.checkoutUser;

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Perform add product to cart', async () => {
      await inventoryPage.addProductToCart(PRODUCT);
      await attachStepScreenshot(page, '02 - Product added');
    });

    await test.step('Perform open cart', async () => {
      await inventoryPage.openCart();
      await attachStepScreenshot(page, '03 - Cart opened');
    });

    await test.step('Perform checkout', async () => {
      await cartPage.checkout();
      await attachStepScreenshot(page, '04 - Checkout initiated');
    });

    await test.step('Enter information with empty postal code', async () => {
      await checkoutPage.enterUserInformation(firstName, lastName, '');
      await attachStepScreenshot(page, '05 - Info entered');
    });

    await test.step('Verify error message displayed', async () => {
      await expect(checkoutPage.errorMessage).toBeVisible();
      await attachStepScreenshot(page, '06 - Error displayed');
    });

    await test.step('Verify error message content', async () => {
      const errorMessage = await checkoutPage.getValidationMessage();
      expect(errorMessage).toContain('Postal Code is required');
      await attachStepScreenshot(page, '07 - Error content verified');
    });
  });
});
