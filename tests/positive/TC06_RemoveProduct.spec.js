import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const PRODUCT = 'Sauce Labs Backpack';

test.describe('TC06 - Remove Product', () => {
  test('TC06 - Verify Remove Product from Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
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

    await test.step('Perform remove product action', async () => {
      await inventoryPage.removeProduct(PRODUCT);
      await attachStepScreenshot(page, '05 - Product removed');
    });

    await test.step('Verify product removed successfully', async () => {
      await expect(inventoryPage.getAddToCartButton(PRODUCT)).toBeVisible();
      await expect(inventoryPage.getAddToCartButton(PRODUCT)).toHaveText('Add to cart');
      await expect(inventoryPage.cartBadge).not.toBeVisible();
      await attachStepScreenshot(page, '06 - Remove verified');
    });
  });
});
