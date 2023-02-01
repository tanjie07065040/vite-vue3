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
        <div class="userinfo">{{ currentLoginInfo.name }}</div>
        <div class="exit" @click="logout">
          <div><img src="../assets/exit.png" /></div>
        </div>
        <div class="line"></div>
        <div class="applink" @click="showModal">
          <div><img src="../assets/list.png" /></div>
        </div>
      </div>
      <video src="../assets/header.webm" autoplay loop muted></video>
    </div>
    <div class="content">
      <router-view />
    </div>
    <!-- 系统切换 -->
    <div id="bbox" ref="bbox">
      <a-modal class="change-system" v-model:visible="visible" title="系统切换" footer="" :getContainer="() => $refs.bbox"
        destroyOnClose>
        <div class="system-box">
          <div class="tool geodisaster" :class="[
            {
              'geodisaster-active': selectData === 'geodisaster',
            },
          ]" @click="selectFunc('geodisaster')">
            <div class="title-box">地灾专项</div>
          </div>
          <div class="tool elevator" :class="[
            {
              'elevator-active': selectData === 'elevator',
            },
          ]" @click="selectFunc('elevator')">
            <div class="title-box">电梯专项</div>
          </div>
          <div class="tool industrial" :class="[
            {
              'industrial-active': selectData === 'industrial',
            },
          ]" @click="selectFunc('industrial')">
            <div class="title-box">工贸专项</div>
          </div>
          <div class="tool flood" :class="[
            {
              'flood-active': selectData === 'flood',
            },
          ]" @click="selectFunc('flood')">
            <div class="title-box">防汛专项</div>
          </div>
          <div class="tool traffic" :class="[
            {
              'traffic-active': selectData === 'traffic',
            },
          ]" @click="selectFunc('traffic')">
            <div class="title-box">交通专项</div>
          </div>
          <div class="tool populationdensity" :class="[
            {
              'populationdensity-active': selectData === 'populationdensity',
            },
          ]" @click="selectFunc('populationdensity')">
            <div class="title-box">人密专项</div>
          </div>
          <div class="tool forest" :class="[
            {
              'forest-active': selectData === 'forest',
            },
          ]" @click="selectFunc('forest')">
            <div class="title-box">森火专项</div>
          </div>
          <div class="tool chemical" :class="[
            {
              'chemical-active': selectData === 'chemical',
            },
          ]" @click="selectFunc('chemical')">
            <div class="title-box">危化专项</div>
          </div>
          <div class="tool tailingspond" :class="[
            {
              'tailingspond-active': selectData === 'tailingspond',
            },
          ]" @click="selectFunc('tailingspond')">
            <div class="title-box">尾矿专项</div>
          </div>
          <div class="tool firecontrol" :class="[
            {
              'firecontrol-active': selectData === 'firecontrol',
            },
          ]" @click="selectFunc('firecontrol')">
            <div class="title-box">消防专项</div>
          </div>
          <div class="tool composite" :class="[
            {
              'composite-active': selectData === 'composite',
            },
          ]" @click="selectFunc('composite')">
            <div class="title-box">综合专项</div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, onMounted, ref, reactive, onUnmounted, unref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";
import { dateUtil, getWeek } from "../utils/dateUtil";
import authServer from "../api/auth";
import weatherServer from "../api/weatherService";
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
    const selectData = ref("");
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

    // 初始化
    onMounted(() => {
      const info = appStore.applink;
      changeBg(info[0].key);
      changeTitle(info[0].key);
      start();
      initWeatherInfo();
      currentAppLink.value = appStore.getAppLink;
      if (currentAppLink.value && currentAppLink.value.length > 0) {
        currentTitle.value = currentAppLink.value[0].title;
      }
      currentDistrict.value = appStore.getAppDistrict;
      initUserInfo();
    });

    // 获取天气数据
    const initWeatherInfo = async () => {
      const now = dateUtil();
      const result = await weatherServer.getWeatherInfo();
      if (result && result.data) {
        currentWeather.value = result.data;
      } else {
        currentWeather.value = "";
      }
    };

    // 获取登录用户信息
    const initUserInfo = async () => {
      const result = await authServer.getUserInfo();
      currentLoginInfo.value = result.data;
      appStore.setCurrentLoginInfo(unref(currentLoginInfo))
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
    async function logout() {
      await authServer.doLogout();
      appStore.setToken(undefined);
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      const url =
        appStore.getConfig.CALLBACK_URL + '/';
      location.href = url;
    }

    // 系统切换显示
    function showModal() {
      visible.value = true;
    }

    // 系统切换
    function jump(item) {
      visible.value = false;
      bus.emit("SystemUrl", item.url);
      changeBg(item.key);
      changeTitle(item.key);
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
    function changeTitle(system) {
      switch (system) {
        case SysEnum.FOREST:
          titleBg.value = require("../assets/foresttitle.png");
          break;
        case SysEnum.GEODISASTER:
          titleBg.value = require("../assets/geotitle.png");
          break;
        case SysEnum.TRAFFIC:
          titleBg.value = require("../assets/traffictitle.png");
          break;
        case SysEnum.FLOOD:
          titleBg.value = require("../assets/floodtitle.png");
          break;
        case SysEnum.CHEMICAL:
          titleBg.value = require("../assets/chemicaltitle.png");
          break;
        case SysEnum.INDUSTRIAL:
          titleBg.value = require("../assets/industrialtitle.png");
          break;
        case SysEnum.TAILINGSPOND:
          titleBg.value = require("../assets/wkktitle.png");
          break;
        case SysEnum.ELEVATOR:
          titleBg.value = require("../assets/elevatortitle.png");
          break;
        case SysEnum.POPULATIONDENSITY:
          titleBg.value = require("../assets/rmtitle.png");
          break;
        case SysEnum.FIRECONTROL:
          titleBg.value = require("../assets/xftitle.png");
          break;
        case SysEnum.COMPOSITE:
          titleBg.value = require("../assets/zhtitle.png");
          break;
      }
    }

    function selectFunc(item) {
      selectData.value = item;
      let sys = null;
      appLinkInfo.forEach((ele) => {
        if (ele.key === item) {
          sys = ele;
        }
      });
      jump(sys);
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
      appLinkInfo,
      jump,
      systemUrl,
      selectFunc,
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
    margin-top: 30px;
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
      margin-left: 10vw;
    }

    .applink {
      margin-bottom: 6px;
    }

    .userinfo {}

    .exit {
      margin-left: 20px;
      margin-bottom: 6px;
    }
  }
}

.content {
  height: 1080px;
  width: 100%;
}

.system-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: wrap;

  .tool {
    width: 298px;
    height: 138px;
    margin: 18px 10px 0px 5px;
    position: relative;

    .title-box {
      width: 100%;
      position: absolute;
      color: #ffffff;
      font-size: 20px;
      bottom: 8px;
      text-align: center;
    }
  }

  .geodisaster {
    background-image: url(../assets/dizhaiA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/dizhaiB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .elevator {
    background-image: url(../assets/diantiA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/diantiB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .industrial {
    background-image: url(../assets/gongmaoA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/gongmaoB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .flood {
    background-image: url(../assets/honglaoA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/honglaoB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .traffic {
    background-image: url(../assets/jiaotongA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/jiaotongB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .populationdensity {
    background-image: url(../assets/renmiA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/renmiB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .forest {
    background-image: url(../assets/senhuoA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/senhuoB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .chemical {
    background-image: url(../assets/weihuaA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/weihuaB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .tailingspond {
    background-image: url(../assets/weikuangA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/weikuangB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .firecontrol {
    background-image: url(../assets/xiaofangA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/xiaofangB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .composite {
    background-image: url(../assets/zongheA.png);
    background-repeat: no-repeat;

    &-active,
    &:hover {
      background-image: url(../assets/zongheB.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}

:deep(.ant-modal) {
  position: relative;
  top: 70px !important;
  left: 39.4vw !important;
}

:deep(.ant-modal-close) {
  color: #ffffff;
}

:deep(.ant-modal-title) {
  display: none;
  // color: rgba(0, 0, 0, 0.85);
  // font-weight: bold;
  // font-size: 16px;
  // line-height: 22px;
  // word-wrap: break-word;
}

:deep(.ant-modal-header) {
  display: none;
  // color: rgba(0, 0, 0, 0.85);
  // font-weight: bold;
  // font-size: 16px;
  // line-height: 22px;
  // word-wrap: break-word;
}

// :deep(.ant-modal-body) {
//   width: 1000px;
//   height: 950px;
//   padding: 0;
//   background: url("../assets/changeSystemBg.png") no-repeat;
//   background-size: 696px 900px;
//   background-position-x: -45px;
//   background-position-y: 0;
//   // color: rgba(0, 0, 0, 0.85);
//   // font-weight: bold;
//   // font-size: 16px;
//   // line-height: 22px;
//   // word-wrap: break-word;
// }
:deep(.ant-modal-content) {
  width: 700px;
  height: 1000px;
  padding: 0;
  background: url("../assets/changeSystemBg.png") no-repeat;
  background-position-x: -25px;
  // color: rgba(0, 0, 0, 0.85);
  // font-weight: bold;
  // font-size: 16px;
  // line-height: 22px;
  // word-wrap: break-word;
}
</style>
