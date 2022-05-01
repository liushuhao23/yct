#!/usr/bin/env node
import pkg from '../package.json'
import { program } from 'commander'
import { initConfig } from './utils/config'
import { init } from './start'

// 配置执行参数
program
  .version(pkg.version, '-v, --version', '获取当前版本')
  .option('-i, --init', '初始化配置文件')
  .option('-g, --generate', '生成接口文档')

program.on('option:init', () => {
  initConfig()
})

program.on('option:generate', () => {
    init()
})

program.parse(process.argv)
