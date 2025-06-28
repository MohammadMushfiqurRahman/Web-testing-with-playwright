const { test, expect, devices } = require('@playwright/test');

test.describe('Mobile Testing Examples', () => {
  test('should work on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    
    // Check if mobile menu is visible
    await expect(page.locator('[aria-label="Toggle navigation bar"]')).toBeVisible();
    
    // Test mobile navigation
    await page.locator('[aria-label="Toggle navigation bar"]').click();
    await expect(page.locator('.navbar-sidebar')).toBeVisible();
    
    await context.close();
  });

  test('should handle touch gestures', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro'],
      hasTouch: true,
    });
    const page = await context.newPage();

    await page.goto('https://demo.playwright.dev/todomvc/');
    
    // Add a todo item
    await page.locator('.new-todo').fill('Touch test item');
    await page.locator('.new-todo').press('Enter');
    
    // Test touch interaction
    const todoItem = page.locator('.todo-list li').first();
    await todoItem.tap();
    
    await expect(todoItem).toBeVisible();
    
    await context.close();
  });

  test('should test responsive design', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.navbar__inner')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500); // Wait for responsive changes
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.locator('[aria-label="Toggle navigation bar"]')).toBeVisible();
  });
});
