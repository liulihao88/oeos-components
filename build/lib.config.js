import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import pkg from '../package.json'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  build: {
    outDir: 'dist',
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true, // 删除所有 console
        drop_debugger: true, // 删除 debugger
      },
    },
    lib: {
      entry: resolve(__dirname, '../packages/index.js'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}-${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // UMD模式下位那些外部化的依赖提供一个全局的变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
  ],
})
