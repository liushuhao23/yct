/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 19:41:45
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-26 00:17:16
 */
import { list } from "./api/index";
import { http, setCookie } from '../utils/http'
import { getConfig } from '../utils/config'
import { clg } from '../utils/console'


const login = (): Promise<void> => {
    const config = getConfig()
    return new Promise((resolve, reject) => {
        // 登录
        clg('yellow', '> yapi登录中...')
        // 请求yapi登录接口，获取cookie
        http.post(list.login, {
            email: config.account,
            password: config.password
        }).then(res => {
            if (res.data.errcode === 0) {
                // 获取headers中的set-cookie
                let result = ''
                for (const item of (res as any).headers['set-cookie']) {
                    const cookieArr = item.split(';')
                    result += `${cookieArr[0]};`
                }
                // 设置请求通用cookie
                setCookie(result)
                clg('yellow', '> yapi登录成功')
                resolve()
            } else {
                clg('yellow', '> yapi登录失败：', res.data.errmsg)
                reject('yapi登录失败: ' + res.data.errmsg)
            }
        }).catch(err => {
            reject(err)
        })
    })
}


export { login }
