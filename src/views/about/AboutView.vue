<template>
  <div class="about">
    <iframe
      :src="frameSrc"
      id="frames"
      frameborder="0"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      width="100%"
      height="900px"
      @load="hideLoading"
    ></iframe>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "detail",
  components: {},
  setup() {
    const frameSrc = ref();
    const router = useRouter();
    const currentRouteInfo = router.currentRoute.value;
    onMounted(() => {
      console.log(currentRouteInfo.query);
      frameSrc.value = currentRouteInfo.query.url;
      // frameSrc.value = "http://localhost:8093";
      // frameSrc.value = "https://workspace.easyv.cloud/bigscreen/1276169";
    });

    function hideLoading() {}
    return { frameSrc, hideLoading };
  },
});
</script>
<style scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>
