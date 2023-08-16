/* eslint-disable */
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  onUnmounted,
  unref,
} from "vue";
import { useAppStore } from "../store/modules/app";
import bus from "vue3-eventbus";
import { dateUtil, getWeek } from "../utils/dateUtil";
import authServer from "../api/auth";
import weatherServer from "../api/weatherService";
import { SysEnum } from "../enums/sysEnum";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "dashboard",
  components: {},
  setup () {
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
    const webmBg = ref("");
    const visible = ref(false);
    const appLinkInfo = appStore.getAppLink;
    const systemUrl = ref("");
    const selectData = ref("");
    let timer: any;
    let weatherTimer: any;

    const state = reactive({
      year: 0,
      month: 0,
      week: "",
      day: 0,
      hour: "",
      minute: "",
      second: 0,
    });

    // 初始化
    onMounted(() => {
      const info = appStore.applink;
      changeBg(info[0].key);
      changeTitle(info[0].key);
      start();
      weatherStart();
      currentAppLink.value = appStore.getAppLink;
      if (currentAppLink.value && currentAppLink.value.length > 0) {
        currentTitle.value = (currentAppLink.value[0] as any).title;
      }
      currentDistrict.value = appStore.getAppDistrict;
      initUserInfo();
    });

    const weatherStart = () => {
      initWeatherInfo();
      clearInterval(weatherTimer);
      weatherTimer = setInterval(() => update(), 1000 * 60 * 60 * 24);
    };

    // 获取天气数据
    const initWeatherInfo = async () => {
      const now = dateUtil();
      const result = await weatherServer.getWeatherInfo();
      if (result && result.data) {
        currentWeather.value = result.data + "℃";
      } else {
        currentWeather.value = "";
      }
    };

    // 获取登录用户信息
    const initUserInfo = async () => {
      const result = await authServer.getUserInfo();
      currentLoginInfo.value = result.data;
      appStore.setCurrentLoginInfo(unref(currentLoginInfo));
    };

    // 时间日期数据格式化
    const update = () => {
      const now = dateUtil();
      state.year = now.get("y");
      state.month = now.get("M") + 1;
      state.day = now.get("D");
      currentDate.value =
                now.get("y") + "-" + (now.get("M") + 1) + "-" + now.get("D");
      currentTime.value =
                now.format("HH") +
                ":" +
                now.format("mm") +
                ":" +
                (now.get("s") > 9 ? now.get("s") : "0" + now.get("s"));
      currentWeek.value = getWeek();
    };

    // 开启日期时间计时器
    function start () {
      update();
      clearInterval(timer);
      timer = setInterval(() => update(), 1000);
    }

    // 停止时间日期计时器
    function stop () {
      clearInterval(timer);
      clearInterval(weatherTimer);
    }

    // 退出
    async function logout () {
      await authServer.doLogout();
      appStore.setToken(undefined);
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      const url = appStore.getConfig.CALLBACK_URL + "/";
      location.href = url;
    }

    // 系统切换显示
    function showModal () {
      visible.value = true;
    }

    // 系统切换
    function jump (item: any) {
      if (item && item.key && item.url) {
        visible.value = false;
        bus.emit("SystemUrl", item.url);
        changeBg(item.key);
        changeTitle(item.key);
      } else {
        message.warn("请联系管理员");
      }
    }

    // 头部背景切换
    function changeBg (system: any) {
      switch (system) {
        case SysEnum.FOREST:
          headerBg.value = require("../assets/forestbg.png");
          webmBg.value = require("../assets/sh.webm");
          break;
        case SysEnum.GEODISASTER:
          headerBg.value = require("../assets/geodisasterbg.png");
          webmBg.value = require("../assets/dz.webm");
          break;
        case SysEnum.TRAFFIC:
        case SysEnum.FLOOD:
        case SysEnum.CHEMICAL:
        case SysEnum.INDUSTRIAL:
        case SysEnum.TAILINGSPOND:
        case SysEnum.ELEVATOR:
        case SysEnum.FIRECONTROL:
        case SysEnum.POPULATIONDENSITY:
        case SysEnum.COMPOSITE:
          headerBg.value = require("../assets/blue.png");
          webmBg.value = require("../assets/header.webm");
          break;
      }
    }

    // 头部标题切换
    function changeTitle (system: any) {
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

    function selectFunc (item: any) {
      selectData.value = item;
      let sys = null;
      appLinkInfo.forEach((ele: any) => {
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
      webmBg,
      visible,
      showModal,
      appLinkInfo,
      jump,
      systemUrl,
      selectFunc,
      currentAppLink,
    };
  },
});
