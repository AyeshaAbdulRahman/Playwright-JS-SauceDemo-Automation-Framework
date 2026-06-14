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

test.describe('TC21 - End-to-End Purchase Flow', () => {
  test('TC21 - End-to-End Purchase Flow', async ({ page }) => {
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

    await test.step('Verify successful login', async () => {
      await loginPage.verifySuccessfulLogin();
      await attachStepScreenshot(page, '02 - Login verified');
    });

    await test.step('Perform add product to cart', async () => {
      await inventoryPage.addProductToCart(PRODUCT);
      await attachStepScreenshot(page, '03 - Product added');
    });

    await test.step('Verify cart badge shows 1', async () => {
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await attachStepScreenshot(page, '04 - Badge verified');
    });

    await test.step('Open cart', async () => {
      await inventoryPage.openCart();
      await attachStepScreenshot(page, '05 - Cart opened');
    });

    await test.step('Verify cart items', async () => {
      await cartPage.verifyCartItems([PRODUCT]);
      await attachStepScreenshot(page, '06 - Cart items verified');
    });

    await test.step('Perform checkout', async () => {
      await cartPage.checkout();
      await attachStepScreenshot(page, '07 - Checkout initiated');
    });

    await test.step('Verify checkout page loads', async () => {
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
      await attachStepScreenshot(page, '08 - Checkout page verified');
    });

    await test.step('Enter user information', async () => {
      await checkoutPage.enterUserInformation(firstName, lastName, postalCode);
      await attachStepScreenshot(page, '09 - User info entered');
    });

    await test.step('Verify overview page loads', async () => {
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await attachStepScreenshot(page, '10 - Overview verified');
    });

    await test.step('Finish order', async () => {
      await checkoutPage.finishOrder();
      await attachStepScreenshot(page, '11 - Order finished');
    });

    await test.step('Verify order success', async () => {
      await checkoutPage.verifyOrderSuccess();
      await attachStepScreenshot(page, '12 - Order success verified');
    });
  });
});
