import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

export type ErrorInterceptor = (error: any) => any;

/**
 * 请求拦截器
 *
 * @param interceptor 拦截器
 * @param onError 错误回调
 * @returns 拦截器ID
 */
export function useRequestInterceptor (interceptor: RequestInterceptor, onError?: ErrorInterceptor): number {
  return axios.interceptors.request.use(interceptor, onError)
}

/**
 * 根据ID移除请求拦截器
 *
 * @param id 拦截器ID
 */
export function removeRequestInterceptor (id: number): void {
  axios.interceptors.request.eject(id)
}

/**
 * 响应拦截器
 *
 * @param interceptor 拦截器
 * @param onError 错误回调
 * @returns 拦截器ID
 */
export function useResponseInterceptor (interceptor: ResponseInterceptor, onError?: ErrorInterceptor): number {
  return axios.interceptors.response.use(interceptor, onError)
}

/**
 * 根据ID移除响应拦截器
 *
 * @param id 拦截器ID
 */
export function removeResponseInterceptor (id: number): void {
  axios.interceptors.response.eject(id)
}
