const { test, expect } = require('@playwright/test');

test.describe('Performance and Accessibility Tests', () => {
  test('should measure page load performance', async ({ page }) => {
    // Start measuring
    const startTime = Date.now();
    
    await page.goto('https://playwright.dev/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Assert load time is reasonable (less than 5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should check basic accessibility', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      // Images should have alt text (unless decorative)
      if (src && !src.includes('decoration')) {
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should check color contrast', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Get computed styles for text elements
    const textElements = page.locator('h1, h2, h3, p, a');
    const count = await textElements.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const element = textElements.nth(i);
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize
        };
      });
      
      // Basic check that text has color
      expect(styles.color).toBeTruthy();
      expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should check keyboard navigation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
    }
  });

  test('should check responsive images', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Check that images are properly sized
      const images = page.locator('img');
      const count = await images.count();
      
      for (let i = 0; i < Math.min(count, 3); i++) {
        const img = images.nth(i);
        const box = await img.boundingBox();
        
        if (box) {
          // Image should not overflow viewport
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });

  test('should check for console errors', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('networkidle');
    
    // Check that there are no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should check network requests', async ({ page }) => {
    const failedRequests = [];
    
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
    
    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('networkidle');
    
    // Check that there are no failed requests
    expect(failedRequests).toHaveLength(0);
  });
});
