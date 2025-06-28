const { test, expect } = require('@playwright/test');

test.describe('Visual Testing Examples', () => {
  test('should take full page screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', { 
      fullPage: true 
    });
  });

  test('should take element screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Take screenshot of specific element
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });

  test('should compare visual changes', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Hide dynamic content for consistent screenshots
    await page.addStyleTag({
      content: `
        .announcement { display: none !important; }
        .navbar__item--github { display: none !important; }
      `
    });
    
    await expect(page).toHaveScreenshot('stable-homepage.png');
  });

  test('should test dark mode', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Switch to dark mode if available
    const darkModeToggle = page.locator('[aria-label*="dark"], [aria-label*="theme"]');
    
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('homepage-dark.png');
    }
  });

  test('should test mobile layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://playwright.dev/');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('should test hover states', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Hover over navigation item
    const navItem = page.locator('.navbar__item').first();
    await navItem.hover();
    
    await expect(navItem).toHaveScreenshot('nav-item-hover.png');
  });

  test('should test form states', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Test empty form
    await expect(page.locator('#userForm')).toHaveScreenshot('form-empty.png');
    
    // Test filled form
    await page.locator('#userName').fill('John Doe');
    await page.locator('#userEmail').fill('john@example.com');
    
    await expect(page.locator('#userForm')).toHaveScreenshot('form-filled.png');
    
    // Test form with validation error
    await page.locator('#userEmail').fill('invalid-email');
    await page.locator('#submit').click();
    
    await expect(page.locator('#userForm')).toHaveScreenshot('form-error.png');
  });

  test('should mask dynamic content', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Mask dynamic content like timestamps, counters, etc.
    await expect(page).toHaveScreenshot('homepage-masked.png', {
      mask: [
        page.locator('.github-stars'), // Example: mask star count
        page.locator('[data-testid="timestamp"]') // Example: mask timestamps
      ]
    });
  });
});
