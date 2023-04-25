<template>
  <div class="home" v-if="frameSrc.length > 0">
    <iframe :src="frameSrc" style="pointer-events: unset !important" id="iframes" frameborder="0"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation allow-downloads" width="100%"
      height="100%" @load="hideLoading"></iframe>
  </div>
  <!-- 这里iframe嵌套有白色底 -->
  <div v-else class="home">
    loading
  </div>
</template>

<script lang="ts" src="./Index">
</script>
<style scoped>
.home {
  height: 100%;
  width: 100%
}
</style>
