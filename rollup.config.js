/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-05-01 16:00:07
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-01 18:06:57
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { cleandir } from 'rollup-plugin-cleandir'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import alias from '@rollup/plugin-alias'
import copy from 'rollup-plugin-copy'

const extensions = ['.js', '.ts']

export default {
  // 输入目录
  input: ['./src/index.ts'],
  // 输出目录
  output: {
    dir: './dist/core',
    format: 'cjs'
  },
  plugins: [
    // 清理文件夹
    cleandir('./dist'),
    // 处理#!/usr/bin/env node
    preserveShebangs(),
    // 处理别名
    alias({
      entries: [
        { find: '@', replacement: '../src' }
      ]
    }),
    // 解析typescript
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNEXT'
        }
      }
    }),
    // 解析代码中依赖的node_modules
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferredBuiltins: false
    }),
    // 将JSON转换为ES6版本
    json(),
    // 代码压缩
    terser(),
    commonjs(),
    // 拷贝静态文件
    // copy({
    //   targets: [
    //     { src: 'src/templates/', dest: 'lib/' }
    //   ]
    // })
  ]
}
