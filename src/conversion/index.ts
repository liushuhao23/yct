/* eslint-disable camelcase */
/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-28 11:12:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:09:03
 */
import { IListItem } from '../types/yapi'
import { getInterceList } from '../yapi/getInfo'
import { getConfig } from '../utils/config'
import { getInterfaceName } from '../utils/name'
import { Progress } from '../utils/progress'
import { clg } from '../utils/console'
const fs = require('fs-extra')
type InfoReturn = {
  res_body: string,
  req_body_other: string,
  path: string,
  project_id: number
}
const {
  quicktype,
  InputData,
  JSONSchemaInput,
  JSONSchemaStore
} = require('quicktype-core')

interface IListItemCat extends IListItem {
  path: string;
  status: string;
  catid: number;
  project_id: number;
}
const tempJsonSchema = async (idLists: IListItemCat[], projectName: string) => {
  const config = getConfig()
  let index = 0
  const res = await getInterceList(idLists)
  const length = Object.keys(res).length
  const progress = new Progress('> 开始生成接口文件，进度: ', length)

  for (const key in res) {
    if (Object.prototype.hasOwnProperty.call(res, key)) {
      await generate(res[key], config, projectName)
      index++
      progress.push(index)
    }
  }
  clg('yellow', '> 生成接口文件已完成')
}

const generate = async (item: InfoReturn, config: { outDir: any; }, projectName: string) => {
  const name = getInterfaceName(item.path)
  const path = process.cwd()
  if (item.res_body) {
    const { lines: body } = await quicktypeJSONSchema(
      'typescript',
      `${name}_body`,
      item.res_body
    )
    try {
      await fs.outputFile(
        `${path}/${config.outDir}/${projectName}/${name}/body.ts`,
        body.join('\n')
      )
    } catch (err: any) {
      throw new Error(err)
    }
  }
  if (item.req_body_other) {
    // eslint-disable-next-line camelcase
    const { lines: body_other } = await quicktypeJSONSchema(
      'typescript',
      `${name}return`,
      item.req_body_other
    )
    try {
      await fs.outputFile(
        `${path}/${config.outDir}/${projectName}/${name}/return.ts`,
        body_other.join('\n')
      )
    } catch (err: any) {
      throw new Error(err)
    }
  }
}

const quicktypeJSONSchema = async (
  targetLanguage: string,
  typeName: string,
  jsonSchemaString: string
) => {
  const schemaInput = new JSONSchemaInput(new JSONSchemaStore())
  await schemaInput.addSource({
    name: typeName,
    schema: jsonSchemaString,
    isConverted: false
  })

  const inputData = new InputData()
  inputData.addInput(schemaInput)

  return await quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: { 'just-types': 'true' }
  })
}

const percentage = (num: number, total: number) => {
  if (num === 0 || total === 0) {
    return 0
  }
  return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
}

export { tempJsonSchema }
