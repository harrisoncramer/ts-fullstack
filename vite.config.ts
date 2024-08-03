import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const SRC = path.join(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': SRC,
    }
  }
})
