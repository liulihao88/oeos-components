// docs/vite.config.ts
import { defineConfig } from "file:///Users/andy/cyrd/oeos-components/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.16_sass@1.70.0_terser@5.31.1/node_modules/vite/dist/node/index.js";
import vueJsx from "file:///Users/andy/cyrd/oeos-components/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.0.12_@types+node@20.11.16_sass@1.70.0_terser@5.31.1__vue@3.4.15_typescript@5.3.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import { codeInspectorPlugin } from "file:///Users/andy/cyrd/oeos-components/node_modules/.pnpm/code-inspector-plugin@0.10.1/node_modules/code-inspector-plugin/dist/index.mjs";
import terser from "file:///Users/andy/cyrd/oeos-components/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.9.6/node_modules/@rollup/plugin-terser/dist/es/index.js";

// packages/utils/customVitePluginFilePath.js
function customVitePluginFilePath() {
  return {
    name: "custom-vite-plugin-file-path",
    transform(src, id) {
      if (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".vue") || id.endsWith(".tsx")) {
        const filePath = JSON.stringify(id);
        src = src.replace(/__INJECT_FILE_PATH__/g, filePath);
      }
      return src;
    }
  };
}

// docs/vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/andy/cyrd/oeos-components/docs/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vueJsx(),
    codeInspectorPlugin({
      bundler: "vite"
    }),
    terser({
      compress: {
        drop_console: true
        // 删除console
      }
    }),
    customVitePluginFilePath()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../packages", __vite_injected_original_import_meta_url))
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"]
  },
  define: {
    __buildInfos__: "321321312321"
    // 将构建信息作为全局变量注入
  },
  build: {
    minify: "terser"
    // 启用terser压缩
  },
  server: {
    host: "0.0.0.0",
    port: 9998,
    open: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy92aXRlLmNvbmZpZy50cyIsICJwYWNrYWdlcy91dGlscy9jdXN0b21WaXRlUGx1Z2luRmlsZVBhdGguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5keS9jeXJkL29lb3MtY29tcG9uZW50cy9kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYW5keS9jeXJkL29lb3MtY29tcG9uZW50cy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbmR5L2N5cmQvb2Vvcy1jb21wb25lbnRzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBjb2RlSW5zcGVjdG9yUGx1Z2luIH0gZnJvbSAnY29kZS1pbnNwZWN0b3ItcGx1Z2luJ1xuaW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInXG5pbXBvcnQgeyBjdXN0b21WaXRlUGx1Z2luRmlsZVBhdGggfSBmcm9tICcuLi9wYWNrYWdlcy91dGlscy9jdXN0b21WaXRlUGx1Z2luRmlsZVBhdGguanMnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlSnN4KCksXG4gICAgY29kZUluc3BlY3RvclBsdWdpbih7XG4gICAgICBidW5kbGVyOiAndml0ZScsXG4gICAgfSksXG4gICAgdGVyc2VyKHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSwgLy8gXHU1MjIwXHU5NjY0Y29uc29sZVxuICAgICAgfSxcbiAgICB9KSxcbiAgICBjdXN0b21WaXRlUGx1Z2luRmlsZVBhdGgoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vcGFja2FnZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICAgIC8vIFx1N0M3Qlx1NTc4Qlx1RkYxQSBzdHJpbmdbXSBcdTVCRkNcdTUxNjVcdTY1RjZcdTYwRjNcdTg5ODFcdTc3MDFcdTc1NjVcdTc2ODRcdTYyNjlcdTVDNTVcdTU0MERcdTUyMTdcdTg4NjhcdTMwMDJcbiAgICBleHRlbnNpb25zOiBbJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy52dWUnLCAnLm1qcyddLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX2J1aWxkSW5mb3NfXzogJzMyMTMyMTMxMjMyMScsIC8vIFx1NUMwNlx1Njc4NFx1NUVGQVx1NEZFMVx1NjA2Rlx1NEY1Q1x1NEUzQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NkNFOFx1NTE2NVxuICB9LFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1NTQyRlx1NzUyOHRlcnNlclx1NTM4Qlx1N0YyOVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogOTk5OCxcbiAgICBvcGVuOiBmYWxzZSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbmR5L2N5cmQvb2Vvcy1jb21wb25lbnRzL3BhY2thZ2VzL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYW5keS9jeXJkL29lb3MtY29tcG9uZW50cy9wYWNrYWdlcy91dGlscy9jdXN0b21WaXRlUGx1Z2luRmlsZVBhdGguanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZHkvY3lyZC9vZW9zLWNvbXBvbmVudHMvcGFja2FnZXMvdXRpbHMvY3VzdG9tVml0ZVBsdWdpbkZpbGVQYXRoLmpzXCI7ZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbVZpdGVQbHVnaW5GaWxlUGF0aCgpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnY3VzdG9tLXZpdGUtcGx1Z2luLWZpbGUtcGF0aCcsXG4gICAgdHJhbnNmb3JtKHNyYywgaWQpIHtcbiAgICAgIGlmIChpZC5lbmRzV2l0aCgnLmpzJykgfHwgaWQuZW5kc1dpdGgoJy50cycpIHx8IGlkLmVuZHNXaXRoKCcudnVlJykgfHwgaWQuZW5kc1dpdGgoJy50c3gnKSkge1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IEpTT04uc3RyaW5naWZ5KGlkKVxuICAgICAgICBzcmMgPSBzcmMucmVwbGFjZSgvX19JTkpFQ1RfRklMRV9QQVRIX18vZywgZmlsZVBhdGgpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3JjXG4gICAgfSxcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLG9CQUFvQjtBQUM5VCxPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxZQUFZOzs7QUNKNlUsU0FBUywyQkFBMkI7QUFDbFksU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxLQUFLLElBQUk7QUFDakIsVUFBSSxHQUFHLFNBQVMsS0FBSyxLQUFLLEdBQUcsU0FBUyxLQUFLLEtBQUssR0FBRyxTQUFTLE1BQU0sS0FBSyxHQUFHLFNBQVMsTUFBTSxHQUFHO0FBQzFGLGNBQU0sV0FBVyxLQUFLLFVBQVUsRUFBRTtBQUNsQyxjQUFNLElBQUksUUFBUSx5QkFBeUIsUUFBUTtBQUFBLE1BQ3JEO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7OztBRFhrTCxJQUFNLDJDQUEyQztBQU1uTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxvQkFBb0I7QUFBQSxNQUNsQixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxNQUNoQjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QseUJBQXlCO0FBQUEsRUFDM0I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksZUFBZSx3Q0FBZSxDQUFDO0FBQUEsSUFDNUQ7QUFBQTtBQUFBLElBRUEsWUFBWSxDQUFDLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxRQUFRLE1BQU07QUFBQSxFQUNwRTtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZ0JBQWdCO0FBQUE7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
