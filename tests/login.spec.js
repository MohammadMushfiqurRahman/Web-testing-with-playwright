const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('https://demo.playwright.dev/todomvc/');
  });

  test('should display login form', async ({ page }) => {
    // This is a placeholder test - replace with actual login page tests
    await expect(page.locator('.new-todo')).toBeVisible();
  });

  test('should add a todo item', async ({ page }) => {
    // Add a new todo
    await page.locator('.new-todo').fill('Test todo item');
    await page.locator('.new-todo').press('Enter');

    // Verify the todo was added
    await expect(page.locator('.todo-list li')).toHaveText('Test todo item');
  });

  test('should mark todo as completed', async ({ page }) => {
    // Add a new todo
    await page.locator('.new-todo').fill('Complete this task');
    await page.locator('.new-todo').press('Enter');

    // Mark as completed
    await page.locator('.todo-list li .toggle').click();

    // Verify it's marked as completed
    await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
  });

  test('should delete a todo item', async ({ page }) => {
    // Add a new todo
    await page.locator('.new-todo').fill('Delete this task');
    await page.locator('.new-todo').press('Enter');

    // Hover over the todo to reveal delete button
    await page.locator('.todo-list li').hover();
    
    // Click delete button
    await page.locator('.todo-list li .destroy').click();

    // Verify the todo was deleted
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });
});