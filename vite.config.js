import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import pkg from './package.json'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import { customVitePluginFilePath } from './packages/utils/local/customVitePluginFilePath.ts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'

const formatBuildTime = (date) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const buildTime = formatBuildTime(new Date())

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}-${format}.js`,
    },
    rollupOptions: {
      external: (id) => ['vue', 'echarts', 'vue-echarts'].includes(id) || /^echarts(\/|$)/.test(id) || /^vue-echarts(\/|$)/.test(id),
      output: {
        // UMD模式下位那些外部化的依赖提供一个全局的变量
        globals: {
          vue: 'Vue',
          echarts: 'echarts',
          'echarts/core': 'echarts',
          'echarts/charts': 'echarts',
          'echarts/renderers': 'echarts',
          'echarts/components': 'echarts',
          'vue-echarts': 'VueECharts',
        },
      },
    },
  },
  define: {
    __OEOS_COMPONENTS_BUILD_TIME__: JSON.stringify(buildTime),
  },
  plugins: [
    VueSetupExtend(),
    {
      ...terser({
        compress: {
          drop_console: true, // 移除所有console语句
        },
        format: {
          comments: /^@preserve|@keep/i, // 保留带有@preserve或@keep的注释
        },
      }),
      apply: 'build',
    },
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    customVitePluginFilePath(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './packages/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages'),
      '~dist': resolve(__dirname, 'dist'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9876,
    open: false,
    https: false,
  },
})
