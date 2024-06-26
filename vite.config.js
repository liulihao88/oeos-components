import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import pkg from './package.json'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './packages/index.js'),
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
  define: {
    __buildInfos__: new Date(), // 将构建信息作为全局变量注入
  },
  plugins: [
    terser({
      compress: {
        drop_console: true, // 删除console
      },
    }),
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 9876,
    open: false,
    https: false,
  },
})
