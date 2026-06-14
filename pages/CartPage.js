import { test, expect } from '@playwright/test';
import BasePage from './BasePage.js';
import Logger from '../utilities/Logger.js';
import { attachStepScreenshot } from '../utilities/Screenshot.js';

export default class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartContainer = page.locator('.cart_contents_container');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
    this.pageTitle = page.locator('.title');
  }

  /**

   * @param {string} productSlug
   * @returns {import('@playwright/test').Locator}
   */
  getRemoveItemButton(productSlug) {
    return this.page.locator(`button.cart_button[id^='remove-${productSlug}']`);
  }

  async removeItem(productSlug) {
    Logger.info(`Removing item from cart: ${productSlug}`);
    await test.step(`Remove ${productSlug} from cart`, async () => {
      await this.click(this.getRemoveItemButton(productSlug));
     
    });
  }

  async continueShopping() {
    Logger.info('Continuing shopping from cart');
    await test.step('Continue shopping', async () => {
      await this.click(this.continueShoppingButton);
     
    });
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async checkout() {
    Logger.info('Proceeding to checkout from cart');
    await test.step('Proceed to checkout', async () => {
      await this.click(this.checkoutButton);

    });
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  /**
   * Verify cart contains expected product names.
   * @param {string[]} expectedProducts
   */
  async verifyCartItems(expectedProducts) {
    await expect(this.cartItems).toHaveCount(expectedProducts.length);

    for (const productName of expectedProducts) {
      await expect(this.cartItemNames.filter({ hasText: productName })).toHaveCount(1);
    }
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }
}
