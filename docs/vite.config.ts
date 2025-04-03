import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import terser from '@rollup/plugin-terser'
import { customVitePluginFilePath } from '../packages/utils/customVitePluginFilePath.js'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    VueSetupExtend(),
    vueJsx(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    terser({
      compress: {
        // drop_console: true, // 删除console
      },
    }),
    customVitePluginFilePath(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './.vitepress/theme/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
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
