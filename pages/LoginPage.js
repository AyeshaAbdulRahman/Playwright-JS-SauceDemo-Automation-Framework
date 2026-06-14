import { test, expect } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/Screenshot.js';

/**
 * LoginPage - Login page object for SauceDemo
 * Uses REAL CSS selectors from SauceDemo
 * Uses attachStepScreenshot for each step
 */
class LoginPage {
  constructor(page) {
    this.page = page;
    // Using REAL CSS selectors for SauceDemo
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container');
    // Login container for verification
    this.loginContainer = page.locator('#login_credentials');
  }

  /**
   * Login with username and password
   * Uses test.step() for step-level reporting with screenshots
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await test.step('After URL open', async () => {
      await attachStepScreenshot(this.page, '01 - After URL open');
    });

    await test.step('Enter username', async () => {
      await this.username.fill(username);
      await attachStepScreenshot(this.page, '02 - After username');
    });

    await test.step('Enter password', async () => {
      await this.password.fill(password);
      await attachStepScreenshot(this.page, '03 - After password');
    });

    await test.step('Click Login', async () => {
      await this.loginButton.click();
      await attachStepScreenshot(this.page, '04 - After login click');
    });
  }

  /**
   * Get error message from login page
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  /**
   * Verify successful login
   */
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  /**
   * Logout from the application
   * Opens the menu and clicks logout
   */
  async logout() {
    // Click the hamburger menu button
    const menuButton = this.page.locator('#react-burger-menu-btn');
    await test.step('Open menu', async () => {
      await menuButton.click();
      await attachStepScreenshot(this.page, 'Menu opened');
    });
    
    // Wait for menu to appear and click logout
    const logoutLink = this.page.locator('#logout_sidebar_link');
    await test.step('Click logout', async () => {
      await logoutLink.click();
      await attachStepScreenshot(this.page, 'Logged out');
    });
  }
}

export default LoginPage;
