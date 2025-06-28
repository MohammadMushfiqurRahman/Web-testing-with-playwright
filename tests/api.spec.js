const { test, expect } = require('@playwright/test');

test.describe('API Testing Examples', () => {
  test('should get user data from API', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBe(200);
    
    const userData = await response.json();
    expect(userData).toHaveProperty('id', 1);
    expect(userData).toHaveProperty('name');
    expect(userData).toHaveProperty('email');
    expect(userData.email).toContain('@');
  });

  test('should create new post via API', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });

    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
  });

  test('should update post via API', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Test Post',
      body: 'This post has been updated',
      userId: 1
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedPost
    });

    expect(response.status()).toBe(200);
    
    const result = await response.json();
    expect(result.title).toBe(updatedPost.title);
  });

  test('should delete post via API', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
  });
});
