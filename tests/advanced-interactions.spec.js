const { test, expect } = require('@playwright/test');

test.describe('Advanced Interactions', () => {
  test('should handle drag and drop', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    
    // Perform drag and drop
    await page.locator('#draggable').dragTo(page.locator('#droppable'));
    
    // Verify drop was successful
    await expect(page.locator('#droppable')).toContainText('Dropped!');
    await expect(page.locator('#droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('should handle multiple windows', async ({ context, page }) => {
    await page.goto('https://demoqa.com/browser-windows');
    
    // Click button that opens new window
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#windowButton').click()
    ]);
    
    // Wait for new page to load
    await newPage.waitForLoadState();
    
    // Verify new window content
    await expect(newPage.locator('h1')).toContainText('This is a sample page');
    
    // Close new window
    await newPage.close();
  });

  test('should handle alerts and dialogs', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Handle simple alert
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('You clicked a button');
      await dialog.accept();
    });
    
    await page.locator('#alertButton').click();
  });

  test('should handle confirmation dialog', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Handle confirmation dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept(); // or dialog.dismiss()
    });
    
    await page.locator('#confirmButton').click();
    
    // Verify result
    await expect(page.locator('#confirmResult')).toContainText('Ok');
  });

  test('should handle prompt dialog', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    // Handle prompt dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Test Input');
    });
    
    await page.locator('#promtButton').click();
    
    // Verify result
    await expect(page.locator('#promptResult')).toContainText('Test Input');
  });

  test('should handle iframe', async ({ page }) => {
    await page.goto('https://demoqa.com/frames');
    
    // Get frame
    const frame = page.frameLocator('#frame1');
    
    // Interact with content inside frame
    await expect(frame.locator('h1')).toContainText('This is a sample page');
  });

  test('should handle hover effects', async ({ page }) => {
    await page.goto('https://demoqa.com/menu');
    
    // Hover over menu item
    await page.locator('.menu-list > li').nth(1).hover();
    
    // Verify submenu appears
    await expect(page.locator('.menu-list .menu-list')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    
    // Use keyboard navigation
    await page.locator('#userName').focus();
    await page.keyboard.type('John Doe');
    await page.keyboard.press('Tab');
    await page.keyboard.type('john@example.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('123 Main St');
    
    // Verify values
    await expect(page.locator('#userName')).toHaveValue('John Doe');
    await expect(page.locator('#userEmail')).toHaveValue('john@example.com');
  });
});
