<template>
  <div id="bbox" ref="bbox">
    <a-modal
      v-model:visible="visible"
      title="Basic Modal"
      footer=""
      width="350px"
      :getContainer="() => $refs.bbox"
      destroyOnClose
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  onUnmounted,
  watch,
  nextTick,
} from "vue";

export default defineComponent({
  name: "ChangeSystem",
  components: {},
  props: ["data"],
  setup(props) {
    const visible = ref(false);
    watch(
      () => props.data,
      (newValue) => {
        nextTick(() => {
          console.log(newValue);
          visible.value = newValue;
        });
      },
      {
        deep: false,
      }
    );

    // 初始化
    onMounted(() => {
      visible.value = props.data;
    });

    onUnmounted(() => {});

    function close() {
      visible.value = false;
    }

    return {
      visible,
      close,
    };
  },
});
</script>

<style scoped></style>
