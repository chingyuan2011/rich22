import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  fileURLToPath, URL 
} from 'url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      }
    }
  },
  base: '/rich22',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
