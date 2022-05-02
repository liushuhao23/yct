/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 22:43:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:10:09
 */
import axios from 'axios'
import { getConfig } from './config'

/**
 * @description 初始化请求default，防止修改config文件目录
 * @author liushuhao
 * @date
 * @export
 */
export function initAxios (): void {
  const config = getConfig()
  axios.defaults.baseURL = config.originUrl
}

/**
 * @description 设置cookie
 * @author liushuhao
 * @date
 * @export
 * @param cookie
 */
export function setCookie (cookie: string): void {
  axios.interceptors.request.use((req) => {
    req.headers = {
      ...req.headers,
      cookie: cookie
    }
    return req
  })
}
// initAxios()
export const http = axios
