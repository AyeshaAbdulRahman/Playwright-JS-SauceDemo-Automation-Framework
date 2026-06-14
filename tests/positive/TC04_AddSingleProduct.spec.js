import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');
const PRODUCT = 'Sauce Labs Backpack';

test.describe('TC04 - Add Single Product', () => {
  test('TC04 - Verify Add Single Product to Cart', async ({ page }) => {
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

    await test.step('Perform add product to cart action', async () => {
      await inventoryPage.addProductToCart(PRODUCT);
      await attachStepScreenshot(page, '03 - Product added to cart');
    });

    await test.step('Verify product added successfully', async () => {
      await expect(inventoryPage.getRemoveButton(PRODUCT)).toBeVisible();
      await expect(inventoryPage.getRemoveButton(PRODUCT)).toHaveText('Remove');
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await attachStepScreenshot(page, '04 - Product add verified');
    });
  });
});
