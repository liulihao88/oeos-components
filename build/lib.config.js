import { defineConfig } from "vite";
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue';
import pkg from "../package.json"
console.log("pkg", pkg);

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, '../packages/index.js'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}-${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // UMD模式下位那些外部化的依赖提供一个全局的变量
        globals: {
          vue: "Vue",
        }
      }
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/]
    })
  ]
})