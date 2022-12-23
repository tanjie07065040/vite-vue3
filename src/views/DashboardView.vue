<template>
  <div class="layout">
    <div class="header" @click="home">{{ title }}</div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const title = ref("");

    onMounted(() => {
      title.value = appStore.getAppTitle;
      bus.on("titilChage", (item) => {
        title.value = item;
      });
    });
    const home = () => {
      title.value = appStore.getConfig.TITLE;
      appStore.setAppTitle(appStore.getConfig.TITLE);
      router.push({ path: "/dashboard/home" });
    };
    return { home, title };
  },
});
</script>

<style scoped>
.layout {
  max-width: 1920px;
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
