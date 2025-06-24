# Playwright Web Testing Project

This repository contains a web testing framework using Playwright to perform automated end-to-end tests for web applications. The project is structured to allow easy expansion of test suites and organization of testing data.

## Project Structure

- **Directories:**
  - `node_modules/` - Contains Node.js dependencies.
  - `pages/` - Contains Page Object Model (POM) files for the web application under test.
  - `playwright-report/` - Stores the results of the test reports.
  - `test-results/` - Contains the execution results for each test run.
  - `tests/` - Holds the actual test files for different scenarios and use cases.
  - `utils/` - Contains utility functions used across the test suites.

- **Configuration and Setup Files:**
  - `package.json` & `package-lock.json` - Node.js project configuration files with the required dependencies and scripts.
  - `playwright.config.js` - Playwright configuration file to set up the testing environment and browser options.

- **Documentation:**
  - `INSTALLATION-GUIDE.md` - Step-by-step guide to install and configure the project.
  - `QUICK-START-GUIDE.md` - A brief guide to quickly get started with writing and running tests.
  - `TEST-SUITE-OVERVIEW.md` - Overview of the available test suites and structure.

## Getting Started

### Prerequisites

- Node.js (version 14.x or above)
- Playwright (installed via Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/playwright-web-testing.git
   cd playwright-web-testing
   ```