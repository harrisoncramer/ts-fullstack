import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = import.meta.dirname

const SRC = path.join(__dirname, 'src')

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3001",
        changeOrigin: true,
        ws: true,
        secure: false
      }
    },
    port: 3000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': SRC,
    }
  }
})
