import path from 'path'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import type { InlineConfig } from 'vitest/node'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'jsdom'
  }
} as UserConfig & {
  test: InlineConfig
})
