<template>
  <div class="home" style="height: 100%; width: 100%">
    <iframe :src="frameSrc" id="frames" frameborder="0"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups" width="100%" height="100%"
      @load="hideLoading"></iframe>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useAppStore } from "../../store/modules/app";
import bus from "vue3-eventbus";
export default defineComponent({
  name: "dashboard",
  components: {},
  props: ["data"],
  setup(props) {
    console.log(props.data);
    const frameSrc = ref();
    const isFirst: any = ref(true);
    const appStore = useAppStore();

    onMounted(() => {
      if (isFirst) {
        const info: any = appStore.applink;
        frameSrc.value = info[0].url + '#token=Bearer ' + appStore.getToken;
      }
      // 系统切换
      bus.on("SystemUrl", (ele: any) => {
        frameSrc.value = ele + '#token=Bearer ' + appStore.getToken;
        isFirst.value = false;
      });
    });

    function hideLoading() { }

    return { frameSrc, hideLoading };
  },
});
</script>
