/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as Icons from "@ant-design/icons-vue";
import axios from "axios";
import { useAppStore } from "./store/modules/app";

function init() {
  const app = createApp(App);
  app.use(Antd);
  app.use(store);
  app.use(router);
  // 循环ant design图标，并注入至app中
  const icons: any = Icons;
  for (const i in icons) {
    app.component(i, icons[i]);
  }
  app.mount("#app");
}

async function bootstrap() {
  // 配置文件
  const config = await axios.get(process.env.VUE_APP_PATH + "config.json");
  init();
  const appStore = useAppStore();
  appStore.setConfig(config.data);
  appStore.setAppLink(config.data.APPLINK);
  appStore.setAppDistrict(config.data.DISTRICT);
  appStore.setAppBasicUrl(config.data.BASECLOUD_URL);
}
bootstrap();
