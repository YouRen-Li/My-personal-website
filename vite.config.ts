import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import { articlesApiPlugin } from "./vite-plugins/api-articles.js";

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages部署配置
  base: process.env.NODE_ENV === 'production' ? '/My-personal-website/' : '/',
  plugins: [
    vue(),
    // Element 按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 文章API和自动更新
    articlesApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
