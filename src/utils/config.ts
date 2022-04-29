/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 19:49:20
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 21:27:57
 */
import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import { IConfig } from '../types/config'
import { clg } from './console'

let configRootPath = process.cwd()

console.log(configPath(), 'configRootPath')

/**
 * @description 获取配置文件路径
 * @author liushuhao
 * @date
 */
function configPath () {
  return path.resolve(configRootPath, './yct.config.js')
}

/**
 * @description 获取配置
 * @author liushuhao
 * @date
 * @export
 * @return {*}
 */
export function getConfig (): IConfig {
  if (!existConfig()) {
    throw new Error('ygt.config.js 配置文件不存在')
  }
  if (require.cache[configPath()]) {
    delete require.cache[configPath()]
  }
  const config: IConfig = require(configPath())
  if (!config.account || !config.password) {
    throw new Error('请配置Yapi账号密码')
  }
  if (!config.originUrl) {
    throw new Error('请配置Yapi地址')
  }
  if (!config.outDir) {
    throw new Error('请配置Yapi文件生成输出目录')
  }
//   if (!config.fetchModule) {
//     throw new Error('请配置Yapi请求声明模块')
//   }
  if (!config.projectMapping) {
    throw new Error('请配置Yapi项目映射')
  }
  // config.outDir = path.resolve(configRootPath, config.outDir)
  return config
}

/**
 * @description 是否存在配置
 * @author liushuhao
 * @date
 */
export const existConfig = (): boolean => {
  return fs.existsSync(configPath())
}

/**
 * @description 初始化默认配置
 * @author liushuhao
 * @date
 */
export const initConfig = async (): Promise<void> => {
  if (existConfig()) {
    const res = await inquirer.prompt({
      type: 'confirm',
      message: '已存在本地配置，是否覆盖？',
      name: 'isOverlap',
      default: false
    })
    if (!res.isOverlap) {
      clg('red', '已取消生成配置')
      return
    }
  }
  generateDefaultConfig()
  clg('green', '默认配置已生成，请根据文档进行配置')
}

/**
 * @description 生成默认配置
 * @author liushuhao
 * @date
 */
export const generateDefaultConfig = (): void => {
  const originPath = path.resolve(__dirname, '../templates/configTemplate/ygt.config.js')
  fs.copyFileSync(originPath, configPath())
}
