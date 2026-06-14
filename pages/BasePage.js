class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Click on a locator
   * @param {import('@playwright/test').Locator} locator
   */
  async click(locator) {
    await locator.click();
  }

  /**
   * Fill input with text
   * @param {import('@playwright/test').Locator} locator
   * @param {string} text
   */
  async fill(locator, text) {
    await locator.fill(text);
  }

  /**
   * Get text content from element
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getText(locator) {
    return locator.textContent();
  }
}

export default BasePage;
