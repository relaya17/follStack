import { defineConfig, devices } from '@playwright/test'

const WEB = process.env.WEB_URL || 'http://localhost:3000'
const API = process.env.API_URL || 'http://localhost:3001'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: WEB,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: [
    {
      command: 'node dist/index.js',
      cwd: '../api',
      url: `${API}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        ...process.env,
        SKIP_DB: 'true',
        NODE_ENV: 'production',
        PORT: '3001',
        CORS_ORIGIN: WEB,
      },
    },
    {
      command: 'pnpm start',
      cwd: '.',
      url: WEB,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        ...process.env,
        PORT: '3000',
        NEXT_PUBLIC_API_URL: API,
      },
    },
  ],
})
