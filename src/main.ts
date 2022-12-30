/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index";
import axios from "axios";
import { useAppStore } from "./store/modules/app";
import "uno.css";

function init() {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.mount("#app");
}

async function bootstrap() {
  // 配置文件
  const config = await axios.get(process.env.VUE_APP_PATH + "config.json");
  init();
  const appStore = useAppStore();
  appStore.setConfig(config.data);
  appStore.setAppTitle(config.data.TITLE);
}
bootstrap();
