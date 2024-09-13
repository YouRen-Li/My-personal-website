import "./assets/main.css";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import App from "./App.vue";
import router from "./router";
// import "./assets/styles/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);

app.mount("#app");
