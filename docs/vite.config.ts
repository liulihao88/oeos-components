import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages', import.meta.url)),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  server: {
    host: '0.0.0.0',
    port: 9998,
    open: true,
  },
})
