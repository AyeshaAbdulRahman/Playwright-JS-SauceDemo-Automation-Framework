import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const checkoutData = JsonReader.readJson('checkoutData.json');
const PRODUCT = 'Sauce Labs Fleece Jacket';

test.describe('TC09 - Order Completion', () => {
  test('TC09 - Verify Order Completion Message', async ({ page }) => {
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

    await test.step('Perform checkout', async () => {
      await cartPage.checkout();
      await attachStepScreenshot(page, '04 - Checkout');
    });

    await test.step('Enter user information', async () => {
      await checkoutPage.enterUserInformation(firstName, lastName, postalCode);
      await attachStepScreenshot(page, '05 - User info entered');
    });

    await test.step('Finish order', async () => {
      await checkoutPage.finishOrder();
      await attachStepScreenshot(page, '06 - Order finished');
    });

    await test.step('Verify order success', async () => {
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
      await expect(checkoutPage.backToProductsButton).toBeVisible();
      await attachStepScreenshot(page, '07 - Order success verified');
    });
  });
});
