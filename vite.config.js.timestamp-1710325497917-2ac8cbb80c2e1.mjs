// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/andy/cyrd/oeos-v3-components/node_modules/.pnpm/vite@5.0.12_sass@1.70.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/andy/cyrd/oeos-v3-components/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/andy/cyrd/oeos-v3-components/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import markdown from "file:///Users/andy/cyrd/oeos-v3-components/node_modules/.pnpm/vite-plugin-md@0.21.5_@vitejs+plugin-vue@5.0.3_sass@1.70.0_vite@5.0.12/node_modules/vite-plugin-md/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/andy/cyrd/oeos-v3-components/vite.config.js";
var vite_config_default = defineConfig({
  assetsInclude: ["**/*.md"],
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    markdown()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./packages", __vite_injected_original_import_meta_url))
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"]
  },
  server: {
    host: "0.0.0.0",
    port: 9876,
    open: true,
    https: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5keS9jeXJkL29lb3MtdjMtY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZHkvY3lyZC9vZW9zLXYzLWNvbXBvbmVudHMvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZHkvY3lyZC9vZW9zLXYzLWNvbXBvbmVudHMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBtYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi1tZCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5tZCddLFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICB9KSxcbiAgICB2dWVKc3goKSxcbiAgICBtYXJrZG93bigpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3BhY2thZ2VzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgICAvLyBcdTdDN0JcdTU3OEJcdUZGMUEgc3RyaW5nW10gXHU1QkZDXHU1MTY1XHU2NUY2XHU2MEYzXHU4OTgxXHU3NzAxXHU3NTY1XHU3Njg0XHU2MjY5XHU1QzU1XHU1NDBEXHU1MjE3XHU4ODY4XHUzMDAyXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJywgJy5tanMnXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHBvcnQ6IDk4NzYsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBodHRwczogZmFsc2UsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLGVBQWUsV0FBVztBQUM5VCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sY0FBYztBQUp5SixJQUFNLDJDQUEyQztBQU8vTixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixlQUFlLENBQUMsU0FBUztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxjQUFjLHdDQUFlLENBQUM7QUFBQSxJQUMzRDtBQUFBO0FBQUEsSUFFQSxZQUFZLENBQUMsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLFFBQVEsTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
