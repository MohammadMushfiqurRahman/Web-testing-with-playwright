// Test data and configuration
module.exports = {
  // Test URLs
  urls: {
    demo: 'https://demo.playwright.dev/todomvc/',
    demoqa: 'https://demoqa.com',
    opencart: 'https://demo.opencart.com/',
    playwright: 'https://playwright.dev/',
    jsonplaceholder: 'https://jsonplaceholder.typicode.com'
  },

  // Test users
  users: {
    admin: {
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      role: 'admin'
    },
    user: {
      username: 'testuser',
      password: 'Test123!',
      email: 'user@example.com',
      role: 'user'
    },
    guest: {
      username: 'guest',
      password: 'guest123',
      email: 'guest@example.com',
      role: 'guest'
    }
  },

  // Test data
  testData: {
    products: [
      { name: 'iPhone', category: 'Electronics', price: 999 },
      { name: 'Laptop', category: 'Electronics', price: 1299 },
      { name: 'Book', category: 'Education', price: 29 }
    ],
    
    forms: {
      contact: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        message: 'This is a test message for contact form'
      },
      registration: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!'
      }
    },

    todos: [
      'Buy groceries',
      'Walk the dog',
      'Read a book',
      'Complete project',
      'Call dentist'
    ]
  },

  // Timeouts
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    api: 15000
  },

  // Viewport sizes
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
    smallDesktop: { width: 1366, height: 768 }
  },

  // API endpoints
  api: {
    users: '/users',
    posts: '/posts',
    comments: '/comments',
    albums: '/albums',
    photos: '/photos'
  },

  // Selectors (commonly used)
  selectors: {
    buttons: {
      submit: '[type="submit"]',
      cancel: '[data-testid="cancel"]',
      save: '[data-testid="save"]',
      delete: '[data-testid="delete"]'
    },
    forms: {
      input: 'input[type="text"]',
      email: 'input[type="email"]',
      password: 'input[type="password"]',
      checkbox: 'input[type="checkbox"]',
      radio: 'input[type="radio"]',
      select: 'select',
      textarea: 'textarea'
    },
    navigation: {
      menu: '.navbar',
      menuToggle: '.navbar-toggle',
      breadcrumb: '.breadcrumb',
      pagination: '.pagination'
    }
  }
};
