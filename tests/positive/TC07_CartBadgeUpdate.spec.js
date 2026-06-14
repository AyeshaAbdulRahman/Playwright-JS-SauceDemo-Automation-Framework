import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test.describe('TC07 - Cart Badge Update', () => {
  test('TC07 - Verify Cart Badge Count Updates', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const { username, password } = loginData.validUsers[0];

    await test.step('Perform login action', async () => {
      await loginPage.login(username, password);
      await attachStepScreenshot(page, '01 - After login');
    });

    await test.step('Verify no badge initially', async () => {
      await expect(inventoryPage.cartBadge).not.toBeVisible();
      await attachStepScreenshot(page, '02 - No badge verified');
    });

    await test.step('Perform add first product action', async () => {
      await inventoryPage.addProductToCart(PRODUCTS[0]);
      await attachStepScreenshot(page, '03 - First product added');
    });

    await test.step('Verify badge shows 1', async () => {
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await attachStepScreenshot(page, '04 - Badge count 1 verified');
    });

    await test.step('Perform add second product action', async () => {
      await inventoryPage.addProductToCart(PRODUCTS[1]);
      await attachStepScreenshot(page, '05 - Second product added');
    });

    await test.step('Verify badge shows 2', async () => {
      await expect(inventoryPage.cartBadge).toHaveText('2');
      await attachStepScreenshot(page, '06 - Badge count 2 verified');
    });

    await test.step('Verify badge count programmatically', async () => {
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(2);
      await attachStepScreenshot(page, '07 - Badge verified');
    });
  });
});
