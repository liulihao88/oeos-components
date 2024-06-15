import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import markdown from 'vite-plugin-md'
import { codeInspectorPlugin } from 'code-inspector-plugin'
const { buildInfos } = require('./packages/utils/buildInfo.ts')
console.log(`91 buildInfos`, buildInfos);

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    markdown(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
  define: {
    __buildInfos__: JSON.stringify(buildInfos), // 将构建信息作为全局变量注入
  },
  build: {
    minify: 'terser', // 启用terser压缩
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true, // 删除所有 console
        drop_debugger: true, // 删除 debugger
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url)),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  server: {
    host: '0.0.0.0',
    port: 9876,
    open: false,
    https: false,
  },
})
