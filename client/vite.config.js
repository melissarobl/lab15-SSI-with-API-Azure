import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    } //when vue app makes a request to anything with /api in the path, vite dev server sends to Express server @localhost:3000
  }
})
