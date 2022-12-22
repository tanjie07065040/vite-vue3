<template>
  <div class="layout">
    <div class="header">头部标题等内容</div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class HomeView extends Vue {}
</script>

<style scoped></style>
