import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from '../vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ["src/vitest.setup.ts"],
    include: [
      "src/**/*.test.ts",
    ]
  },
}))

