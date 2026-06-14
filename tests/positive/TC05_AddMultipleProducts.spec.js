import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

test.describe('TC05 - Add Multiple Products', () => {
  test('TC05 - Verify Add Multiple Products to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await attachStepScreenshot(page, '02 - Login verified');
    });

    await test.step('Perform add multiple products action', async () => {
      await inventoryPage.addMultipleProducts(PRODUCTS);
      await attachStepScreenshot(page, '03 - Products added');
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await expect(inventoryPage.cartBadge).toHaveText(String(PRODUCTS.length));
      await attachStepScreenshot(page, '04 - Badge count verified');
    });

    await test.step('Open cart and verify items', async () => {
      await inventoryPage.openCart();
      await attachStepScreenshot(page, '05 - Cart opened');
    });

    await test.step('Verify cart contains all products', async () => {
      await cartPage.verifyCartItems(PRODUCTS);
      await attachStepScreenshot(page, '06 - Cart items verified');
    });
  });
});
