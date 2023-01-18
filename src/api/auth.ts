import { useAppStore } from '../store/modules/app'
import * as httpclient from '../utils/axios/index'
enum Api {
  GetMemberInfo = '/bec/gev/v2/member',
  Logout = '/v4/oauth/user/logout',
}
/* eslint-disable */
export default {
  // 获取人员信息
  getUserInfo() {
    const appStore = useAppStore()
    const token = appStore.getToken
    const headers: any = {}
    headers['Content-Type'] = 'application/json'
    headers.Authorization = `Bearer ${token}`
    return httpclient.getPromise(appStore.getAppBasicUrl + Api.GetMemberInfo, { headers })
  },

  // 登出
  doLogout() {
    const appStore = useAppStore()
    const token = appStore.getToken
    const headers: any = {}
    headers['Content-Type'] = 'application/json'
    headers.Authorization = `Bearer ${token}`
    return httpclient.postPromise(appStore.getAppLoginUrl + Api.Logout, appStore.getCurrentLoginInfo.mobile, { headers });
  }

}
