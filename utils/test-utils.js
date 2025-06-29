// Utility functions for tests
const { expect } = require('@playwright/test');

class TestUtils {
  /**
   * Wait for element to be visible and enabled
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForElement(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.waitForSelector(selector, { state: 'attached', timeout });
  }

  /**
   * Fill form field with retry mechanism
   * @param {Page} page - Playwright page object
   * @param {string} selector - Input selector
   * @param {string} value - Value to fill
   */
  static async fillWithRetry(page, selector, value, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await page.locator(selector).clear();
        await page.locator(selector).fill(value);
        
        // Verify the value was set
        const actualValue = await page.locator(selector).inputValue();
        if (actualValue === value) {
          return;
        }
      } catch (error) {
        if (i === retries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Click element with retry mechanism
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   */
  static async clickWithRetry(page, selector, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await page.locator(selector).click();
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns {string} Random email address
   */
  static generateRandomEmail() {
    const username = this.generateRandomString(8);
    const domain = this.generateRandomString(5);
    return `${username}@${domain}.com`;
  }

  /**
   * Take screenshot with timestamp
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   */
  static async takeTimestampedScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }

  /**
   * Wait for network to be idle
   * @param {Page} page - Playwright page object
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForNetworkIdle(page, timeout = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Scroll element into view
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   */
  static async scrollIntoView(page, selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get element text with retry
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @returns {string} Element text
   */
  static async getTextWithRetry(page, selector, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.waitForElement(page, selector);
        return await page.locator(selector).textContent();
      } catch (error) {
        if (i === retries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Check if element exists
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @returns {boolean} True if element exists
   */
  static async elementExists(page, selector) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Upload file to input
   * @param {Page} page - Playwright page object
   * @param {string} selector - File input selector
   * @param {string} filePath - Path to file
   */
  static async uploadFile(page, selector, filePath) {
    await page.locator(selector).setInputFiles(filePath);
  }

  /**
   * Create test file for upload
   * @param {string} content - File content
   * @param {string} filename - File name
   * @returns {Object} File object for upload
   */
  static createTestFile(content, filename = 'test.txt') {
    return {
      name: filename,
      mimeType: 'text/plain',
      buffer: Buffer.from(content)
    };
  }

  /**
   * Handle browser dialog
   * @param {Page} page - Playwright page object
   * @param {string} action - 'accept' or 'dismiss'
   * @param {string} text - Text to enter in prompt
   */
  static async handleDialog(page, action = 'accept', text = '') {
    page.on('dialog', async dialog => {
      if (action === 'accept') {
        await dialog.accept(text);
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Wait for element to disappear
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForElementToDisappear(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Get current timestamp
   * @returns {string} Current timestamp
   */
  static getCurrentTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Generate test data with timestamp
   * @param {Object} baseData - Base data object
   * @returns {Object} Data with timestamp
   */
  static generateTestDataWithTimestamp(baseData) {
    const timestamp = Date.now();
    const result = { ...baseData };
    
    // Add timestamp to string fields
    Object.keys(result).forEach(key => {
      if (typeof result[key] === 'string') {
        result[key] = `${result[key]}_${timestamp}`;
      }
    });
    
    return result;
  }
}

module.exports = TestUtils;
