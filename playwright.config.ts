import { defineConfig, devices } from '@playwright/test';
import { API_BASE_URL, UI_BASE_URL } from 'config/base.config';
import path from 'path';

require('dotenv').config();

export default defineConfig({
  testDir: path.resolve(__dirname, 'test'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  preserveOutput: 'failures-only',
  outputDir: path.resolve(__dirname, 'target'),
  reporter: [
    ['github'],
    ['list', { printSteps: true }],
    ['html', { outputFolder: path.resolve(__dirname, 'html'), open: 'never' }],
  ],
  timeout: 1 * 60 * 1000,
  expect: {
    timeout: 0.5 * 60 * 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   baseURL: '',
  //   headless: true,
  //   screenshot: { mode: 'only-on-failure', fullPage: true },
  //   trace: 'on-first-retry',
  //   video: 'retain-on-failure',
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API',
      testDir: path.resolve(__dirname, 'tests', 'API'),
      use: {
        baseURL: API_BASE_URL,
      },
    },
    {
      name: 'UI',
      testDir: path.resolve(__dirname, 'tests', 'UI'),
      use: {
        baseURL: UI_BASE_URL,
        browserName: 'chromium',
        channel: 'chrome',
        headless: true,
        launchOptions: {
          args: [
            '--start-maximized',
            '--start-in-incognito',
            '--disable-infobars',
            '--no-sandbox',
          ],
        },
        screenshot: { mode: 'only-on-failure', fullPage: true },
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        viewport: null,
      },
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
