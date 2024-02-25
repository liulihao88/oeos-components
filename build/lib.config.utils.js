import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import pkg from '../package.json'
console.log('pkg', pkg)

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, '../packages/utils/gFunc.js'),
      name: pkg.name + 'utils',
      fileName: (format) => `${pkg.name}-${format}-utils.js`,
    },
  },
  plugins: [],
})
