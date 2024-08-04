import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = import.meta.dirname

const SRC = path.join(__dirname, 'src')
const API = path.join(__dirname, 'api')

// https://vitejs.dev/config/
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
      api: API,
      '@': SRC,
    }
  }
})
