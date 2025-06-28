const { test, expect } = require('@playwright/test');
const TestUtils = require('../utils/test-utils');
const testData = require('../utils/test-data');

test.describe('Utility Functions Demo', () => {
  test('should demonstrate utility functions usage', async ({ page }) => {
    // Navigate to demo page
    await page.goto(testData.urls.demoqa + '/text-box');
    
    // Use utility to wait for element
    await TestUtils.waitForElement(page, '#userName');
    
    // Generate test data
    const userData = TestUtils.generateTestDataWithTimestamp(testData.testData.forms.contact);
    
    // Fill form using utility functions
    await TestUtils.fillWithRetry(page, '#userName', userData.name);
    await TestUtils.fillWithRetry(page, '#userEmail', TestUtils.generateRandomEmail());
    await TestUtils.fillWithRetry(page, '#currentAddress', '123 Test Street');
    
    // Click submit with retry
    await TestUtils.clickWithRetry(page, '#submit');
    
    // Wait for results and verify
    if (await TestUtils.elementExists(page, '#output')) {
      const outputText = await TestUtils.getTextWithRetry(page, '#output');
      expect(outputText).toContain(userData.name);
    }
    
    // Take timestamped screenshot
    await TestUtils.takeTimestampedScreenshot(page, 'form-submission');
  });

  test('should demonstrate file upload utility', async ({ page }) => {
    await page.goto(testData.urls.demoqa + '/upload-download');
    
    // Create test file
    const testFile = TestUtils.createTestFile('This is test content', 'test-upload.txt');
    
    // Upload file using utility
    await page.locator('#uploadFile').setInputFiles(testFile);
    
    // Verify upload
    await expect(page.locator('#uploadedFilePath')).toContainText('test-upload.txt');
  });

  test('should demonstrate dialog handling', async ({ page }) => {
    await page.goto(testData.urls.demoqa + '/alerts');
    
    // Set up dialog handler
    TestUtils.handleDialog(page, 'accept', 'Test input for prompt');
    
    // Trigger prompt dialog
    await page.locator('#promtButton').click();
    
    // Verify result
    await expect(page.locator('#promptResult')).toContainText('Test input for prompt');
  });

  test('should demonstrate responsive testing with utilities', async ({ page }) => {
    await page.goto(testData.urls.playwright);
    
    // Test different viewports using test data
    for (const [name, viewport] of Object.entries(testData.viewports)) {
      await page.setViewportSize(viewport);
      await TestUtils.waitForNetworkIdle(page);
      
      // Take screenshot for each viewport
      await TestUtils.takeTimestampedScreenshot(page, `responsive-${name}`);
      
      // Verify page is responsive
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 50); // Allow small margin
    }
  });

  test('should demonstrate API testing with utilities', async ({ request }) => {
    const baseURL = testData.urls.jsonplaceholder;
    
    // Test GET request
    const response = await request.get(`${baseURL}/users/1`);
    expect(response.status()).toBe(200);
    
    const userData = await response.json();
    expect(userData).toHaveProperty('id', 1);
    
    // Test POST request with generated data
    const newPost = {
      title: `Test Post ${TestUtils.getCurrentTimestamp()}`,
      body: 'Generated test content',
      userId: 1
    };
    
    const createResponse = await request.post(`${baseURL}/posts`, {
      data: newPost
    });
    
    expect(createResponse.status()).toBe(201);
    
    const createdPost = await createResponse.json();
    expect(createdPost.title).toBe(newPost.title);
  });

  test('should demonstrate error handling and retry mechanisms', async ({ page }) => {
    await page.goto(testData.urls.demo);
    
    // Test with potentially flaky element
    try {
      await TestUtils.fillWithRetry(page, '.new-todo', 'Test todo with retry');
      await TestUtils.clickWithRetry(page, '.new-todo'); // This will press Enter
      
      // Verify todo was added
      await expect(page.locator('.todo-list li')).toContainText('Test todo with retry');
    } catch (error) {
      console.log('Test failed with retry mechanism:', error.message);
      
      // Take screenshot on failure
      await TestUtils.takeTimestampedScreenshot(page, 'test-failure');
      throw error;
    }
  });
});
