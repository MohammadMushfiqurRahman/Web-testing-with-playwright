const { test, expect } = require('@playwright/test');

test.describe('Form Handling Examples', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a form demo page
    await page.goto('https://demoqa.com/text-box');
  });

  test('should fill and submit text form', async ({ page }) => {
    // Fill form fields
    await page.locator('#userName').fill('John Doe');
    await page.locator('#userEmail').fill('john.doe@example.com');
    await page.locator('#currentAddress').fill('123 Main Street, City, Country');
    await page.locator('#permanentAddress').fill('456 Oak Avenue, Town, Country');
    
    // Submit form
    await page.locator('#submit').click();
    
    // Verify results
    await expect(page.locator('#output')).toBeVisible();
    await expect(page.locator('#name')).toContainText('John Doe');
    await expect(page.locator('#email')).toContainText('john.doe@example.com');
  });

  test('should handle dropdown selection', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    
    // Select from dropdown
    await page.locator('#oldSelectMenu').selectOption('Blue');
    
    // Verify selection
    const selectedValue = await page.locator('#oldSelectMenu').inputValue();
    expect(selectedValue).toBe('1');
  });

  test('should handle checkboxes and radio buttons', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expand tree and check items
    await page.locator('[title="Toggle"]').first().click();
    await page.locator('[title="Toggle"]').nth(1).click();
    
    // Check a checkbox
    await page.locator('label[for="tree-node-documents"]').click();
    
    // Verify checkbox is checked
    await expect(page.locator('#tree-node-documents')).toBeChecked();
  });

  test('should upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Create a test file content
    const fileContent = 'This is a test file for upload';
    
    // Upload file
    await page.locator('#uploadFile').setInputFiles({
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from(fileContent)
    });
    
    // Verify file upload
    await expect(page.locator('#uploadedFilePath')).toContainText('test-file.txt');
  });

  test('should handle date picker', async ({ page }) => {
    await page.goto('https://demoqa.com/date-picker');
    
    // Click date picker
    await page.locator('#datePickerMonthYearInput').click();
    
    // Select a specific date
    await page.locator('.react-datepicker__day--015').first().click();
    
    // Verify date selection
    const selectedDate = await page.locator('#datePickerMonthYearInput').inputValue();
    expect(selectedDate).toContain('15');
  });
});
