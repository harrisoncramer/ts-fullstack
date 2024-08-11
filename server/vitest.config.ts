import path from 'path'
import { defineConfig } from 'vitest/config'

const __dirname = import.meta.dirname

const SRC = path.join(__dirname, '..', 'server')
const SHARED = path.join(__dirname, '..', 'shared')

export default defineConfig({
 resolve: {
    alias: {
      '@': SRC,
      shared: SHARED,
    }
  },
  test: {
    include: [
      "server/**/*.test.ts",
    ]
  },
})
