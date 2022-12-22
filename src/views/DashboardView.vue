<template>
  <div class="layout">
    <div class="header" @click="home">头部标题等内容</div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const home = () => {
      router.push({ path: "/dashboard/home" });
    };
    return { home };
  },
});
</script>

<style scoped>
.layout {
  width: 3840px;
  height: 1080px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.header {
  height: 10%;
}
.content {
  height: 90%;
}
</style>
