import { useAppStore } from '../store/modules/app'
import * as httpclient from '../utils/axios/index'

enum Api {
    getWeather = '/mew/traffic/v1/weather',
}

/* eslint-disable */
export default {
    // 获取天气信息
    getWeatherInfo() {
        const appStore = useAppStore()
        return httpclient.postPromise(appStore.getAppWeatherUrl + Api.getWeather)
    },

}
