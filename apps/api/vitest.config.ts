import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    hookTimeout: 30_000,
    testTimeout: 20_000,
    env: {
      SKIP_DB: 'true',
      NODE_ENV: 'test',
      CORS_ORIGIN: 'http://localhost:3000',
    },
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
