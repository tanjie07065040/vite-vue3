<template>
  <div class="home">
    <iframe :src="frameSrc" id="frames" frameborder="0"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups" width="100%" height="870px"
      @load="hideLoading"></iframe>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useAppStore } from "../../store/modules/app";
export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const frameSrc = ref();
    const appStore = useAppStore();

    onMounted(() => {
      // 默认一个初始化地图
      const info: any = ref([]);
      info.value = appStore.getAppLink;
      if (info && info.value.length > 0) {
        frameSrc.value = info.value[0].url;
      }
    });

    function hideLoading() { }

    return { frameSrc, hideLoading };
  },
});
</script>
