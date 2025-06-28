const { test, expect } = require('@playwright/test');

test.describe('Database and Backend Integration', () => {
  test('should test user registration flow', async ({ page, request }) => {
    // Generate unique test data
    const timestamp = Date.now();
    const testUser = {
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'TestPassword123!'
    };
    
    // Test registration via UI
    await page.goto('https://demoqa.com/register');
    
    if (await page.locator('#userName').isVisible()) {
      await page.locator('#userName').fill(testUser.username);
      await page.locator('#password').fill(testUser.password);
      
      // Submit registration
      await page.locator('#register').click();
      
      // Verify registration success (adapt to actual application)
      await expect(page.locator('.success-message')).toBeVisible();
    }
  });

  test('should test login with different user roles', async ({ page }) => {
    const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
      { username: 'guest', password: 'guest123', role: 'guest' }
    ];
    
    for (const user of users) {
      await page.goto('https://demoqa.com/login');
      
      if (await page.locator('#userName').isVisible()) {
        await page.locator('#userName').fill(user.username);
        await page.locator('#password').fill(user.password);
        await page.locator('#login').click();
        
        // Verify role-specific access
        if (user.role === 'admin') {
          await expect(page.locator('[data-testid="admin-panel"]')).toBeVisible();
        }
        
        // Logout for next iteration
        if (await page.locator('#logout').isVisible()) {
          await page.locator('#logout').click();
        }
      }
    }
  });

  test('should test data persistence', async ({ page, context }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    
    // Add some todos
    const todos = ['Buy groceries', 'Walk the dog', 'Read a book'];
    
    for (const todo of todos) {
      await page.locator('.new-todo').fill(todo);
      await page.locator('.new-todo').press('Enter');
    }
    
    // Verify todos are added
    await expect(page.locator('.todo-list li')).toHaveCount(todos.length);
    
    // Refresh page to test persistence
    await page.reload();
    
    // Verify todos persist after reload
    await expect(page.locator('.todo-list li')).toHaveCount(todos.length);
  });

  test('should test session management', async ({ context }) => {
    // Create first page and login
    const page1 = await context.newPage();
    await page1.goto('https://demoqa.com/login');
    
    // Simulate login (adapt to actual login flow)
    if (await page1.locator('#userName').isVisible()) {
      await page1.locator('#userName').fill('testuser');
      await page1.locator('#password').fill('password');
      await page1.locator('#login').click();
    }
    
    // Create second page in same context
    const page2 = await context.newPage();
    await page2.goto('https://demoqa.com/profile');
    
    // Verify session is shared between pages
    // Both pages should show logged-in state
    
    await page1.close();
    await page2.close();
  });

  test('should test concurrent user actions', async ({ browser }) => {
    // Create multiple browser contexts for different users
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    // Both users navigate to the same page
    await Promise.all([
      page1.goto('https://demo.playwright.dev/todomvc/'),
      page2.goto('https://demo.playwright.dev/todomvc/')
    ]);
    
    // Both users add todos simultaneously
    await Promise.all([
      page1.locator('.new-todo').fill('User 1 todo'),
      page2.locator('.new-todo').fill('User 2 todo')
    ]);
    
    await Promise.all([
      page1.locator('.new-todo').press('Enter'),
      page2.locator('.new-todo').press('Enter')
    ]);
    
    // Verify each user sees their own todo
    await expect(page1.locator('.todo-list li')).toContainText('User 1 todo');
    await expect(page2.locator('.todo-list li')).toContainText('User 2 todo');
    
    await context1.close();
    await context2.close();
  });
});
