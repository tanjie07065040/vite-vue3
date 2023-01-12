<template>
  <div class="layout">
    <div class="header">
      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ currentDate }}</div>
      <div class="weather">{{ currentWeather }}</div>
      <div class="title">{{ currentTitle }}</div>
      <div class="district">{{ currentDistrict }}</div>
      <div class="applink"></div>
      <div class="userinfo">{{ currentLoginInfo.name }}</div>
      <div class="exit" @click="logout"></div>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { defineComponent, onMounted, ref, reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";
import { dateUtil } from '../utils/dateUtil';
import authServer from '../api/auth';

export default defineComponent({
  name: "dashboard",
  components: {},
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const currentTitle = ref('');
    const currentTime = ref('');
    const currentDate = ref('');
    const currentWeather = ref('');
    const currentDistrict = ref('');
    const currentLoginInfo = ref('');
    const currentAppLink = ref([]);
    let timer;

    const state = reactive({
      year: 0,
      month: 0,
      week: '',
      day: 0,
      hour: '',
      minute: '',
      second: 0,
    });

    // 初始化
    onMounted(() => {
      start();
      currentWeather.value = '晴 18-20°C';
      currentAppLink.value = appStore.getAppLink;
      if (currentAppLink.value && currentAppLink.value.length > 0) {
        currentTitle.value = currentAppLink.value[0].title;
      }
      currentDistrict.value = appStore.getAppDistrict;
      initUserInfo();
    });

    // 获取登录用户信息
    const initUserInfo = async () => {
      const result = await authServer.getUserInfo();
      currentLoginInfo.value = result.data;
    }

    // 时间日期数据格式化
    const update = () => {
      const now = dateUtil();
      state.year = now.get('y');
      state.month = now.get('M') + 1;
      state.day = now.get('D');
      currentDate.value = now.get('y') + '-' + now.get('M') + 1 + '-' + now.get('D');
      currentTime.value = now.format('HH') + ':' + now.format('mm') + ':' + now.get('s');
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
      window.localStorage.removeItem('token');
      const url =
        appStore.getConfig.AUTHOR_URL +
        "?redirect_url=" +
        appStore.getConfig.CALLBACK_URL +
        "&tag=bigscreen";
      location.href = url;
    }

    onUnmounted(() => {
      stop();
    });

    return { currentTitle, currentDate, currentTime, currentWeather, currentDistrict, currentLoginInfo, logout };
  },
});
</script>

<style scoped>
.layout {
  max-width: 3840px;
  max-height: 1080px;
  overflow-x: hidden;
  overflow-y: hidden;
}

.header {
  height: 10%;
  width: 100%;
  display: flex;
  text-align: center;
  vertical-align: middle;
}

.time {
  width: 5%;
  position: relative;
  margin-top: 15px;
  font-size: 20px;
}

.date {
  width: 5%;
  position: relative;
  margin-top: 15px;
  font-size: 20px;
}

.weather {
  width: 10%;
  position: relative;
  margin-top: 15px;
  font-size: 20px;
}

.title {
  width: 60%;
  font-size: 40px;
}

.district {
  font-size: 20px;
  width: 5%;
  position: relative;
  margin-top: 15px;
}

.applink {
  width: 5%;
}

.userinfo {
  width: 5%;
  position: relative;
  font-size: 20px;
  margin-top: 15px;
}

.exit {
  width: 5%;
}

.content {
  height: 90%;
}
</style>
