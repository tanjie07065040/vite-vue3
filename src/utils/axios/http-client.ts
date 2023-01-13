import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * GET服务请求
 *
 * @param url REST URL地址
 * @param config 请求配置
 * @returns Promise<T>
 */
export function getPromise<T = any> (url: string, config?: AxiosRequestConfig) {
  return axios.get<T>(url, config).then(getResponseData)
}

/**
 * POST服务请求
 * @param url REST URL地址
 * @param data 请求体
 * @param config 请求配置
 * @returns Promise<T>
 */
export function postPromise<T = any> (url: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post<T>(url, data, config).then(getResponseData)
}

/**
 * PUT服务请求
 * @param url REST URL地址
 * @param data 请求体
 * @param config 请求配置
 * @returns Promise<T>
 */
export function putPromise<T = any> (url: string, data?: any, config?: AxiosRequestConfig) {
  return axios.put<T>(url, data, config).then(getResponseData)
}

/**
 * DELETE服务请求
 * @param url REST URL地址
 * @param config 请求配置
 * @returns Promise<any>
 */
export function deletePromise (url: string, config?: AxiosRequestConfig) {
  return axios.delete(url, config).then(getResponseData)
}

/**
 * 提取response data
 * @param response Axios Response
 */
function getResponseData<T> (response: AxiosResponse<T>) {
  return response.data
}
