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
    const appStore = useAppStore();
    const appLink = ref<AppLinkInfo[]>([]);

    onMounted(() => {
      appLink.value = [
        {
          url: "https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MTI3NjE2OX0=?timeStamp=1854c7bb91d",
          name: "交通专项大屏",
          desc: "交通专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "交通大屏",
        },
        {
          url: "http://localhost:8093",
          name: "防汛专项大屏",
          desc: "交通专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "防汛大屏",
        },
        {
          url: "https://workspace.easyv.cloud/bigscreen/1276169",
          name: "危化专项大屏",
          desc: "危化专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "危化大屏",
        },
        {
          url: "",
          name: "尾矿库专项大屏",
          desc: "尾矿库专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "尾矿库大屏",
        },
        {
          url: "https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MTUzMDEyNn0=?timeStamp=1854d61a8e3",
          name: "地灾专项大屏",
          desc: "地灾专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "地灾大屏",
        },
        {
          url: "https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6MTMzMzYwNH0=",
          name: "森火专项大屏",
          desc: "森火专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "森火大屏",
        },
        {
          url: "",
          name: "test4",
          desc: "工贸企业专项大屏采用EasyV技术快速搭建大屏以及通过认证验证保证访问请求安全性",
          icon: "",
          title: "工贸企业大屏",
        },
      ];
    });

    const jump = (item: any) => {
      appStore.setAppTitle(item.title);
      bus.emit("titilChage", item.title);
      router.push({ path: "/dashboard/about", query: { url: item.url } });
    };
    return { jump, appLink };
  },
});
</script>
