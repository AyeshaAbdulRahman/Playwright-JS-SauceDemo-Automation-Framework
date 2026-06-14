import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const PRODUCT = 'Sauce Labs Onesie';

test.describe('TC10 - Continue Shopping', () => {
  test('TC10 - Verify Continue Shopping Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const { username, password } = loginData.validUsers[0];

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

    await test.step('Verify cart contains product', async () => {
      await expect(cartPage.pageTitle).toHaveText('Your Cart');
      await cartPage.verifyCartItems([PRODUCT]);
      await attachStepScreenshot(page, '04 - Cart items verified');
    });

    await test.step('Perform continue shopping action', async () => {
      await cartPage.continueShopping();
      await attachStepScreenshot(page, '05 - Continue shopping clicked');
    });

    await test.step('Verify redirected to inventory page', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await attachStepScreenshot(page, '06 - Continue shopping verified');
    });
  });
});
