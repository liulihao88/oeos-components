import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import markdown from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    vue({
       include: [/\.vue$/, /\.md$/], 
    }),
    markdown(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'pkg': fileURLToPath(new URL('./packages', import.meta.url)),
    }
  }
})
