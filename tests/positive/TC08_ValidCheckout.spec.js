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

test.describe('TC08 - Valid Checkout', () => {
  test('TC08 - Verify Checkout with Valid Data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const { username, password } = loginData.validUsers[0];
    const { firstName, lastName, postalCode } = checkoutData.checkoutUser;

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

    await test.step('Perform checkout action', async () => {
      await cartPage.checkout();
      await attachStepScreenshot(page, '04 - Checkout initiated');
    });

    await test.step('Verify checkout page loads', async () => {
      await expect(checkoutPage.checkoutInfoContainer).toBeVisible();
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
      await attachStepScreenshot(page, '05 - Checkout page verified');
    });

    await test.step('Enter user information', async () => {
      await checkoutPage.enterUserInformation(firstName, lastName, postalCode);
      await attachStepScreenshot(page, '06 - User info entered');
    });

    await test.step('Verify overview page loads', async () => {
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(checkoutPage.checkoutSummaryContainer).toBeVisible();
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
      await attachStepScreenshot(page, '07 - Overview verified');
    });
  });
});
