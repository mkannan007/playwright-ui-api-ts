import { defineConfig, devices } from '@playwright/test';
import { API_BASE_URL, UI_BASE_URL } from 'config/base.config';
import path from 'path';

require('dotenv').config();

export default defineConfig({
  testDir: path.resolve(__dirname, 'test'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
  ],
});
