/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-26 00:06:31
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 16:54:34
 */
import { IApiInfoResponse } from '../types/yapi'
import { http } from './http'

/**
 * @description 下划线转驼峰
 * @author liushuhao
 * @date
 * @export
 * @param name
 * @param [isBigHump=false] 是否大驼峰
 * @return {*}
 */
export function underlineToHump(name: string, isBigHump = false): string {
    let hump = name.replace(/[_|\-|\s](\w)/g, function (all, letter) {
        return letter.toUpperCase()
    })
    hump = (isBigHump ? hump.charAt(0).toLocaleUpperCase() : hump.charAt(0).toLocaleLowerCase()) + hump.substr(1)
    return hump
}

/**
 * @description 中文转英文
 * @author liushuhao
 * @date 
 * @export
 * @param text 翻译的文本
 * @return {*}
 */
export function zhCN2EN(text: string): Promise<string> {
    return new Promise((resolve) => {
        if (/[\u4e00-\u9fa5]/.test(text)) {
            const url = `http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${encodeURIComponent(
                text
            )}`
            http
                .get(url)
                .then((res) => {
                    const text = res.data.translateResult[0][0].tgt.replace(/\s+/g, '')
                    resolve(underlineToHump(text, true))
                })
                .catch(() => {
                    throw new Error('有道翻译接口请求失败')
                })
        } else {
            resolve(underlineToHump(text, true))
        }
    })
}

/**
 * @description 接口path路径变为驼峰
 * @author liushuhao
 * @date
 * @export
 * @param api
 * @param [isBigHump=true]
 * @return {*}
 */
export function pathToHump(api: Partial<IApiInfoResponse>, isBigHump = true): string {
    let name = (api.path as string).replace(/[{|}]/g, '').replace(/\//g, '_')
    name = underlineToHump(name, isBigHump)
    return name
}


/**
 * @description 通过path生成接口名字
 * @author liushuhao
 * @date
 * @export
 * @param api
 * @return {*}
 */
export function getInterfaceName(path: string): string {
    const newPath = `${path}`
    let pathName = ''
    newPath.split('/').forEach((item)=> {
        pathName += item 
    })
    const name = pathToHump({
        path: newPath
    })
    return `${name}`
}
