import { useAppStore } from '../store/modules/app'
import * as httpclient from '../utils/axios/index'
enum Api {
    GetMemberInfo = '/bec/gev/v2/member',
}
export default {
  // 获取人员信息
  getUserInfo () {
    const appStore = useAppStore()
    const token = appStore.getToken
    const headers: any = {}
    headers['Content-Type'] = 'application/json'
    headers.Authorization = `Bearer ${token}`
    return httpclient.getPromise(appStore.getAppBasicUrl + Api.GetMemberInfo, { headers })
  }

}
