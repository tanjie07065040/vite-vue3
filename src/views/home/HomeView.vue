<template>
  <div class="home">
    <a-row>
      <div v-for="item in appLink" :key="item">
        <a-col :span="24">
          <a-card :title="item.title">
            <div style="width: 580px; height: 250px" @click="jump(item)">
              <div style="float: left; width: 50%">
                <img src="../../assets/logo.png" />
              </div>
              <div style="float: right; width: 50%">
                <div>
                  <span>{{ item.name }}</span>
                </div>
                <div>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import bus from "vue3-eventbus";

interface AppLinkInfo {
  url?: string;
  name?: string;
  desc?: string;
  icon?: string;
  title?: string;
}

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();

    const appLink = ref<AppLinkInfo[]>([]);

    onMounted(() => {
      appLink.value = [
        {
          url: "",
          name: "交通专项大屏",
          desc: "交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏",
          icon: "",
          title: "交通大屏",
        },
        {
          url: "",
          name: "test2",
          desc: "交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏交通专项大屏",
          icon: "",
          title: "防汛大屏",
        },
        {
          url: "",
          name: "test3",
          desc: "test3",
          icon: "",
          title: "危化大屏",
        },
        {
          url: "",
          name: "test4",
          desc: "test4",
          icon: "",
          title: "尾矿库大屏",
        },
        {
          url: "",
          name: "test4",
          desc: "test4",
          icon: "",
          title: "地灾大屏",
        },
        {
          url: "",
          name: "test4",
          desc: "test4",
          icon: "",
          title: "森火大屏",
        },
        {
          url: "",
          name: "test4",
          desc: "test4",
          icon: "",
          title: "工贸企业大屏",
        },
      ];
    });

    const jump = (item: any) => {
      router.push({ path: "/dashboard/about" });
      bus.emit("titilChage", item.title);
    };
    return { jump, appLink };
  },
});
</script>
