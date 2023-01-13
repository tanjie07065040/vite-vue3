<template>
  <div class="layout">
    <div class="header" :style="{
      background: 'url(' + headerBg + ')',
      'background-repeat': 'no-repeat',
      'background-size': '100% 124px',
    }">
      <div class="left">
        <div class="time">{{ currentTime }}</div>
        <div class="line"></div>
        <div class="date">{{ currentDate }}</div>
        <div class="line"></div>
        <div class="week">{{ currentWeek }}</div>
        <div class="line"></div>
        <div class="weather">{{ currentWeather }}</div>
      </div>
      <div class="title" :style="{
        background: 'url(' + titleBg + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
      }"></div>
      <div class="right">
        <div class="district">{{ currentDistrict }}</div>
        <div class="line"></div>
        <div class="applink" @click="showModal">
          <div><img src="../assets/list.png" /></div>
        </div>
        <div class="line"></div>
        <div class="userinfo">{{ currentLoginInfo.name }}</div>
        <div class="line"></div>
        <div class="exit" @click="logout">
          <div><img src="../assets/setting.png" /></div>
        </div>
      </div>
      <video src="../assets/header.webm" autoplay loop muted></video>
    </div>
    <div class="content">
      <router-view :data="systemUrl" />
    </div>
    <!-- 系统切换 -->
    <div id="bbox" ref="bbox">
      <a-modal class="change-system" v-model:visible="visible" title="系统切换" footer="" width="350px"
        :getContainer="() => $refs.bbox" destroyOnClose>
        <div class="system-box">
          <div class="system-item-box" v-for="(item, index) of appLinkInfo" :key="index" @click="jump(item)">
            <div class="system-img"><img :src="item.img" alt="" /></div>
            <div class="system-name">{{ item.name }}</div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, onMounted, ref, reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";
import { dateUtil, getWeek } from "../utils/dateUtil";
import authServer from "../api/auth";
import { SysEnum } from "../enums/sysEnum";
import dayjs from "dayjs";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const currentTitle = ref("");
    const currentTime = ref("");
    const currentDate = ref("");
    const currentWeek = ref("");
    const currentWeather = ref("");
    const currentDistrict = ref("");
    const currentLoginInfo = ref("");
    const currentAppLink = ref([]);
    const headerBg = ref("");
    const titleBg = ref("");
    const visible = ref(false);
    const appLinkInfo = appStore.getAppLink;
    const systemUrl = ref("");
    let timer;

    const state = reactive({
      year: 0,
      month: 0,
      week: "",
      day: 0,
      hour: "",
      minute: "",
      second: 0,
      week: "",
    });

    const SystemImgList = [
      {
        system: "traffic",
        img: new URL("../assets/jt.png", import.meta.url).href,
      },
      {
        system: "chemical",
        img: new URL("../assets/wh.png", import.meta.url).href,
      },
      {
        system: "flood",
        img: new URL("../assets/fx.png", import.meta.url).href,
      },
      {
        system: "forest",
        img: new URL("../assets/sh.png", import.meta.url).href,
      },
      {
        system: "geodisaster",
        img: new URL("../assets/dz.png", import.meta.url).href,
      },
      {
        system: "industrial",
        img: new URL("../assets/gm.png", import.meta.url).href,
      },
      {
        system: "tailingspond",
        img: new URL("../assets/wkk.png", import.meta.url).href,
      },
    ];

    // 初始化
    onMounted(() => {
      headerBg.value = require("../assets/blue.png");
      titleBg.value = require("../assets/title.png");
      start();
      currentWeather.value = "晴 18-20°C";
      currentAppLink.value = appStore.getAppLink;
      if (currentAppLink.value && currentAppLink.value.length > 0) {
        currentTitle.value = currentAppLink.value[0].title;
      }
      currentDistrict.value = appStore.getAppDistrict;
      initUserInfo();
      handImg();
    });

    function handImg() {
      if (appLinkInfo) {
        for (const e1 of appLinkInfo) {
          for (const e2 of SystemImgList) {
            if (e1.key === e2.system) {
              e1.img = e2.img;
            }
          }
        }
      }
    }

    // 获取登录用户信息
    const initUserInfo = async () => {
      const result = await authServer.getUserInfo();
      currentLoginInfo.value = result.data;
    };

    // 时间日期数据格式化
    const update = () => {
      const now = dateUtil();
      state.year = now.get("y");
      state.month = now.get("M") + 1;
      state.day = now.get("D");
      currentDate.value =
        now.get("y") + "-" + now.get("M") + 1 + "-" + now.get("D");
      currentTime.value =
        now.format("HH") + ":" + now.format("mm") + ":" + now.get("s");
      console.log(dayjs().day());
      currentWeek.value = getWeek();
    };

    // 开启日期时间计时器
    function start() {
      update();
      clearInterval(timer);
      timer = setInterval(() => update(), 1000);
    }

    // 停止时间日期计时器
    function stop() {
      clearInterval(timer);
    }

    // 退出
    function logout() {
      appStore.setToken(undefined);
      window.localStorage.removeItem("token");
      const url =
        appStore.getConfig.AUTHOR_URL +
        "?redirect_url=" +
        appStore.getConfig.CALLBACK_URL +
        "&tag=bigscreen";
      location.href = url;
    }

    // 系统切换显示
    function showModal() {
      console.log(111);
      visible.value = true;
    }

    // 系统切换
    function jump(item) {
      visible.value = false;
      bus.emit("SystemUrl", item.url);
      changeBg(item.key);
    }

    // 头部背景切换
    function changeBg(system) {
      switch (system) {
        case SysEnum.FOREST:
          headerBg.value = require("../assets/forestbg.png");
          break;
        case SysEnum.GEODISASTER:
          headerBg.value = require("../assets/geodisasterbg.png");
          break;
        case SysEnum.TRAFFIC:
        case SysEnum.FLOOD:
        case SysEnum.CHEMICAL:
        case SysEnum.INDUSTRIAL:
        case SysEnum.TAILINGSPOND:
          headerBg.value = require("../assets/blue.png");
          break;
      }
    }

    // 头部标题切换
    function changeBg(system) {
      switch (system) {
        case SysEnum.FOREST:
          titleBg.value = require("../assets/title.png");
          break;
        case SysEnum.GEODISASTER:
          titleBg.value = require("../assets/title.png");
          break;
        case SysEnum.TRAFFIC:
        case SysEnum.FLOOD:
        case SysEnum.CHEMICAL:
        case SysEnum.INDUSTRIAL:
        case SysEnum.TAILINGSPOND:
          titleBg.value = require("../assets/title.png");
          break;
      }
    }

    onUnmounted(() => {
      stop();
    });

    return {
      currentTitle,
      currentDate,
      currentTime,
      currentWeek,
      currentWeather,
      currentDistrict,
      currentLoginInfo,
      logout,
      headerBg,
      titleBg,
      visible,
      showModal,
      handImg,
      appLinkInfo,
      jump,
      systemUrl,
    };
  },
});
</script>

<style lang="less" scoped>
.layout {
  max-width: 3840px;
  max-height: 1080px;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}

.header {
  height: 8vh;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: #ffffff;
  font-size: 20px;

  video {
    position: fixed;
    mix-blend-mode: screen;
    pointer-events: none;
    left: 0;
    right: 0;
    top: 0;
  }

  .left {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    .line {
      width: 5px;
      height: 25%;
      background-color: #4ac2fa;
      margin: 0 20px 5px 20px;
    }

    .time {
      margin-left: 1vw;
    }

    .date {}

    .weather {}
  }

  .title {
    width: 60%;
    height: 100%;
  }

  .right {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    .line {
      width: 5px;
      height: 25%;
      background-color: #4ac2fa;
      margin: 0 20px 5px 20px;
    }

    .district {
      margin-left: 9vw;
    }

    .applink {
      margin-bottom: 6px;
    }

    .userinfo {}

    .exit {
      margin-bottom: 6px;
    }
  }
}

.content {
  height: 1080px;
  width: 100%;
}

.system-box {
  display: flex;
  flex-flow: wrap;

  .system-item-box {
    display: flex;
    width: 40%;
    line-height: 50px;
    margin-left: 12px;

    .system-img {
      margin: 16px 10px 0px 0px;
      width: 18px;
      height: 18px;

      :deep(img) {
        vertical-align: top;
      }
    }

    .system-name {
      color: #666666;
    }
  }
}

:deep(.ant-modal) {
  position: relative;
  top: 85px !important;
  left: 45vw !important;
  padding-bottom: 0;
}

:deep(.ant-modal-close) {
  color: #ffffff;
}

:deep(.ant-modal-title) {
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
}
</style>
