import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import terser from '@rollup/plugin-terser'
import { customVitePluginFilePath } from '../packages/utils/index.ts'
export default defineConfig({
  plugins: [
    vueJsx(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    terser({
      compress: {
        drop_console: true, // 删除console
      },
    }),
    customVitePluginFilePath(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages', import.meta.url)),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  define: {
    __buildInfos__: '321321312321', // 将构建信息作为全局变量注入
  },
  build: {
    minify: 'terser', // 启用terser压缩
  },
  server: {
    host: '0.0.0.0',
    port: 9998,
    open: false,
  },
})
