import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = import.meta.dirname

const CLIENT = path.join(__dirname, 'client')

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
      '@': CLIENT,
    }
  }
})
