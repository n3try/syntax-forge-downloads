import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    channel: process.env.CI ? undefined : 'chrome',
    bypassCSP: true,
  },
  webServer: {
    command: 'http-server . -a 127.0.0.1 -p 4173 -c-1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
})
