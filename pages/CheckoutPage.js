import { test, expect } from '@playwright/test';
import BasePage from './BasePage.js';
import Logger from '../utilities/Logger.js';
import { attachStepScreenshot } from '../utilities/Screenshot.js';

export default class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);


    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.finishButton = page.locator('#finish');
    this.errorMessage = page.locator('.error-message-container');
    this.checkoutInfoContainer = page.locator('.checkout_info_container');
    this.checkoutSummaryContainer = page.locator('.checkout_summary_container');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backToProductsButton = page.locator('#back-to-products');
    this.pageTitle = page.locator('.title');
  }

  async enterUserInformation(firstName, lastName, postalCode) {
    Logger.info(`Entering checkout information for: ${firstName} ${lastName}`);
    
    await test.step('Enter first name', async () => {
      await this.fill(this.firstNameInput, firstName);
      await attachStepScreenshot(this.page, 'First name entered');
    });
    
    await test.step('Enter last name', async () => {
      await this.fill(this.lastNameInput, lastName);
      await attachStepScreenshot(this.page, 'Last name entered');
    });
    
    await test.step('Enter postal code', async () => {
      await this.fill(this.postalCodeInput, postalCode);
      await attachStepScreenshot(this.page, 'Postal code entered');
    });
    
    await test.step('Click continue', async () => {
      await this.click(this.continueButton);
      await attachStepScreenshot(this.page, 'Continue clicked');
    });
  }

  async submitCheckoutInformation() {
    await test.step('Submit checkout', async () => {
      await this.click(this.continueButton);
      await attachStepScreenshot(this.page, 'Checkout submitted');
    });
  }

  async finishOrder() {
    Logger.info('Finishing checkout order');
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    
    await test.step('Finish order', async () => {
      await this.click(this.finishButton);
      await attachStepScreenshot(this.page, 'Order finished');
    });
    
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }

  async verifyOrderSuccess() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
  }

  async getValidationMessage() {
    await expect(this.errorMessage).toBeVisible();
    return this.getText(this.errorMessage);
  }
}
