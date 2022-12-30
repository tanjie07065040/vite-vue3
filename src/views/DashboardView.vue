<template>
  <div class="layout">
    <div class="header" @click="home">{{ appTitle }}</div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const { appTitle } = storeToRefs(appStore);

    onMounted(() => {
      appStore.appTitle = appStore.getAppTitle;
      bus.on("titilChage", (item) => {
        appStore.appTitle = item;
      });
    });
    const home = () => {
      appStore.appTitle = appStore.getConfig.TITLE;
      router.push({ path: "/dashboard/home" });
    };
    return { home, appTitle };
  },
});
</script>

<style scoped>
.layout {
  max-width: 3840px;
  max-height: 1080px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.header {
  height: 10%;
  font-size: 40px;
}
.content {
  height: 90%;
}
</style>
