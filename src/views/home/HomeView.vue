<template>
  <div class="home">
    <iframe
    :src="frameSrc"
    id="frames"
    frameborder="0"
    sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
    width="100%"
    height="870px"
    @load="hideLoading"
  ></iframe>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const frameSrc = ref();
  
    onMounted(() => {
      // 默认一个初始化地图
      frameSrc.value='https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MTI3NjE2OX0=?timeStamp=1854c7bb91d';
    });

    function hideLoading() {}

    return { frameSrc, hideLoading };
  },
});
</script>
