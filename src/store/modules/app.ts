/* eslint-disable */

import { defineStore } from "pinia";
import { store } from "@/store";

interface AppState {
  config: any;
  applink: any;
  appDistrict: string;
  appBasicUrl: string;
  token?: string;
  appLoginUrl: string;
  currentLoginInfo: any;
}
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    // 全局配置
    config: {},
    // 应用连接集合信息
    applink: [],
    // 当前城市行政区划
    appDistrict: "",
    // 基层云服务地址
    appBasicUrl: "",
    token: "",
    appLoginUrl: "",
    currentLoginInfo: {},
  }),
  getters: {
    /**
     * 获取全局配置
     */
    getConfig(): any {
      return this.config;
    },
    /**
        * 获取连接集合信息
        */
    getAppLink(): [] {
      return this.applink;
    },
    /**
       * 获取行政区划
       */
    getAppDistrict(): string {
      return this.appDistrict;
    },
    /**
      * 获取基层云地址
      */
    getAppBasicUrl(): string {
      return this.appBasicUrl;
    },
    getToken(): any {
      return this.token || undefined;
    },
    getAppLoginUrl(): string {
      return this.appLoginUrl;
    },
    getCurrentLoginInfo(): any {
      return this.currentLoginInfo;
    }
  },
  actions: {
    /**
     * 设置全局配置
     */
    setConfig(config: any): void {
      return (this.config = config);
    },
    /**
    * 设置系统连接信息
    */
    setAppLink(appLink: []): [] {
      return (this.applink = appLink);
    },
    /**
    * 设置行政区划
    */
    setAppDistrict(district: string): string {
      return (this.appDistrict = district);
    },
    /**
       * 设置基层云地址
       */
    setAppBasicUrl(appBasicUrl: string): string {
      return (this.appBasicUrl = appBasicUrl);
    },
    setToken(token: any): string {
      return (this.token = token ? token : '');
    },
    setAppLoginUrl(appLoginUrl: string): string {
      return (this.appLoginUrl = appLoginUrl);
    },
    setCurrentLoginInfo(loginInfo: any): any {
      return this.currentLoginInfo = loginInfo;
    }
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
