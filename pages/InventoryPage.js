import { test, expect } from '@playwright/test';
import BasePage from './BasePage.js';
import Logger from '../utilities/Logger.js';
import { attachStepScreenshot } from '../utilities/Screenshot.js';


const PRODUCT_SLUGS = {
  'Sauce Labs Backpack': 'sauce-labs-backpack',
  'Sauce Labs Bike Light': 'sauce-labs-bike-light',
  'Sauce Labs Bolt T-Shirt': 'sauce-labs-bolt-t-shirt',
  'Sauce Labs Fleece Jacket': 'sauce-labs-fleece-jacket',
  'Sauce Labs Onesie': 'sauce-labs-onesie',
  'Test.allTheThings() T-Shirt (Red)': 'test.allthethings()-t-shirt-(red)',
};


export default class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.pageTitle = page.locator('.title');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  getProductSlug(productName) {
    const slug = PRODUCT_SLUGS[productName];
    if (!slug) {
      throw new Error(`Unknown product name: ${productName}`);
    }
    return slug;
  }

  /**
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  getAddToCartButton(productName) {
    const slug = this.getProductSlug(productName);
    return this.page.locator(`button[id^='add-to-cart-${slug}']`);
  }

  /**
   * Get Remove button usingstarts with selector  
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  getRemoveButton(productName) {
    const slug = this.getProductSlug(productName);
    return this.page.locator(`button[id^='remove-${slug}']`);
  }

  async addProductToCart(productName) {
    Logger.info(`Adding product to cart: ${productName}`);
    await test.step(`Add ${productName} to cart`, async () => {
      await this.click(this.getAddToCartButton(productName));

    });
  }

  async addMultipleProducts(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  async removeProduct(productName) {
    Logger.info(`Removing product from inventory: ${productName}`);
    await test.step(`Remove ${productName} from cart`, async () => {
      await this.click(this.getRemoveButton(productName));

    });
  }

  async openCart() {
    Logger.info('Opening shopping cart');
    await test.step('Open cart', async () => {
      await this.click(this.cartLink);
      await attachStepScreenshot(this.page, 'Cart opened');
    });
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async sortAZ() {
    Logger.info('Sorting products A-Z');
    await test.step('Sort A-Z', async () => {
      await this.sortDropdown.selectOption('az');

    });
  }

async sortZA() {
    Logger.info('Sorting products Z-A');
    await test.step('Sort Z-A', async () => {
      await this.sortDropdown.selectOption('za');
     
    });
  }

  async sortByPriceLowToHigh() {
    Logger.info('Sorting products by price: low to high');
    await test.step('Sort by price low to high', async () => {
      await this.sortDropdown.selectOption('lohi');

    });
  }

  async sortByPriceHighToLow() {
    Logger.info('Sorting products by price: high to low');
    await test.step('Sort by price high to low', async () => {
      await this.sortDropdown.selectOption('hilo');

    });
  }

  async getCartBadgeCount() {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) {
      return 0;
    }
    const countText = await this.getText(this.cartBadge);
    return parseInt(countText, 10);
  }

  async getAllProductNames() {
    await expect(this.productNames.first()).toBeVisible();
    return this.productNames.allTextContents();
  }

  async verifyProductsSortedAscending() {
    const productNames = await this.getAllProductNames();
    const sorted = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sorted);
  }

async verifyProductsSortedDescending() {
    const productNames = await this.getAllProductNames();
    const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sorted);
  }

  async verifyPricesSortedLowToHigh() {
    await expect(this.productPrices.first()).toBeVisible();
    const prices = await this.productPrices.allTextContents();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...priceValues].sort((a, b) => a - b);
    expect(priceValues).toEqual(sorted);
  }

  async verifyPricesSortedHighToLow() {
    await expect(this.productPrices.first()).toBeVisible();
    const prices = await this.productPrices.allTextContents();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).toEqual(sorted);
  }
}
