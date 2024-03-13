import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
console.log(
  `%c 4行 docs/vite.config.ts import.meta.url`,
  'color:blue',
  import.meta.url,
)
export default defineConfig({
  plugins: [vueJsx()],
  server: {
    host: '0.0.0.0',
    port: 9998,
    open: true,
  },
})
