<template>
  <div class="home">
    <span>大屏清单</span>
    <button @click="jump">A专项大屏跳转</button>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const jump = () => {
      router.push({ path: "/dashboard/about" });
    };
    return { jump };
  },
});
</script>
