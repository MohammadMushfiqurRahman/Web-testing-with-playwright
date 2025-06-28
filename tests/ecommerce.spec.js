const { test, expect } = require('@playwright/test');

test.describe('E-commerce Testing Examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.opencart.com/');
  });

  test('should search for products', async ({ page }) => {
    // Search for a product
    await page.locator('[name="search"]').fill('iPhone');
    await page.locator('.btn-default').click();
    
    // Verify search results
    await expect(page.locator('h1')).toContainText('Search');
    await expect(page.locator('.product-thumb')).toHaveCount.greaterThan(0);
  });

  test('should add product to cart', async ({ page }) => {
    // Navigate to a product
    await page.locator('.product-thumb').first().click();
    
    // Add to cart
    await page.locator('#button-cart').click();
    
    // Verify success message
    await expect(page.locator('.alert-success')).toBeVisible();
    await expect(page.locator('.alert-success')).toContainText('Success');
  });

  test('should navigate product categories', async ({ page }) => {
    // Hover over category menu
    await page.locator('.dropdown-toggle').first().hover();
    
    // Click on subcategory
    await page.locator('.dropdown-menu a').first().click();
    
    // Verify category page
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('.product-thumb')).toHaveCount.greaterThan(0);
  });

  test('should filter products by price', async ({ page }) => {
    // Go to a category with products
    await page.locator('.dropdown-toggle').first().hover();
    await page.locator('.dropdown-menu a').first().click();
    
    // Get initial product count
    const initialProducts = await page.locator('.product-thumb').count();
    
    // Apply price filter (if available)
    if (await page.locator('#input-sort').isVisible()) {
      await page.locator('#input-sort').selectOption('price');
      
      // Wait for products to reload
      await page.waitForTimeout(1000);
      
      // Verify products are still displayed
      await expect(page.locator('.product-thumb')).toHaveCount.greaterThan(0);
    }
  });

  test('should compare products', async ({ page }) => {
    // Add products to compare
    const compareButtons = page.locator('[data-original-title="Compare this Product"]');
    
    if (await compareButtons.count() > 1) {
      await compareButtons.first().click();
      await compareButtons.nth(1).click();
      
      // Go to compare page
      await page.locator('#compare-total').click();
      
      // Verify compare page
      await expect(page.locator('h1')).toContainText('Product Comparison');
    }
  });
});
