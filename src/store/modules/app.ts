/* eslint-disable */

import { defineStore } from 'pinia'
import { store } from '../index'

interface AppState {
  config: any
  appTitle: string
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    // 全局配置
    config: {},
    // 标题
    appTitle: ''
  }),
  getters: {
    /**
     * 获取全局配置
     */
    getConfig(): any {
      return this.config
    },
    /**
     * 获取标题
     */
    getAppTitle(): string {
      return this.appTitle
    }
  },
  actions: {
    /**
     * 设置全局配置
     */
    setConfig(config: any): void {
      return (this.config = config)
    },
    /**
     * 设置标题
     */
    setAppTitle(appTitle: string): string {
      return (this.appTitle = appTitle)
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
