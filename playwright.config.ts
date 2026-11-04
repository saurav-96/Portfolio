import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop 1920x1080',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'Laptop 1440x900',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Desktop 1366x768',
      use: { viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'Tablet 768x1024',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'Mobile 390x844',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'Mobile 375x667',
      use: { viewport: { width: 375, height: 667 } },
    },
  ],
});
