import { test, expect } from '../../fixtures/testSetup.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import JsonReader from '../../utilities/JsonReader.js';
import { attachStepScreenshot } from '../../utilities/Screenshot.js';

const loginData = JsonReader.readJson('loginData.json');

test.describe('TC22 - Product Sorting Flow', () => {
  test('TC22 - Product Sorting Flow', async ({ page }) => {
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

    await test.step('Get initial product list', async () => {
      const initialProducts = await inventoryPage.getAllProductNames();
      await attachStepScreenshot(page, '03 - Initial products captured');
    });

    await test.step('Perform sort A-Z', async () => {
      await inventoryPage.sortAZ();
      await attachStepScreenshot(page, '04 - Sorted A-Z');
    });

    await test.step('Verify products sorted A-Z', async () => {
      await inventoryPage.verifyProductsSortedAscending();
      await attachStepScreenshot(page, '05 - A-Z sort verified');
    });

    await test.step('Perform sort Z-A', async () => {
      await inventoryPage.sortZA();
      await attachStepScreenshot(page, '06 - Sorted Z-A');
    });

    await test.step('Verify products sorted Z-A', async () => {
      await inventoryPage.verifyProductsSortedDescending();
      await attachStepScreenshot(page, '07 - Z-A sort verified');
    });

    await test.step('Perform sort by price low to high', async () => {
      await inventoryPage.sortByPriceLowToHigh();
      await attachStepScreenshot(page, '08 - Sorted by price low to high');
    });

    await test.step('Verify pricing sorted low to high', async () => {
      await inventoryPage.verifyPricesSortedLowToHigh();
      await attachStepScreenshot(page, '09 - Low to high verified');
    });

    await test.step('Perform sort by price high to low', async () => {
      await inventoryPage.sortByPriceHighToLow();
      await attachStepScreenshot(page, '10 - Sorted by price high to low');
    });

    await test.step('Verify pricing sorted high to low', async () => {
      await inventoryPage.verifyPricesSortedHighToLow();
      await attachStepScreenshot(page, '11 - High to low verified');
    });
  });
});
