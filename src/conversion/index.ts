/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-28 11:12:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 11:16:15
 */
import { IListItem } from '../types/yapi'
import { getInterceList } from '../yapi/getInfo'

const {
    quicktype,
    InputData,
    JSONSchemaInput,
    JSONSchemaStore,
} = require("quicktype-core")
const path = require("path")

const fs = require("fs")


interface IListItemCat extends IListItem {
    path: string,
    status: string,
    catid: number,
    project_id: number
}
const tempJsonSchema = async (idLists: IListItemCat[]) => {
    const res = await getInterceList(idLists)
    // console.log('输出', res)
    Object.keys(res).forEach (async(item) => {
    const { lines: tsPerson } = await quicktypeJSONSchema(
        "typescript",
        "Book",
        res[item].res_body
      )
      console.log('输出',  tsPerson)
    })
    // const { lines: tsPerson } = await quicktypeJSONSchema(
    //     "typescript",
    //     "Book",
    //     bookSchema
    //   )
    
}


const  quicktypeJSONSchema = async (targetLanguage: string, typeName: string, jsonSchemaString: string)  =>{
    const schemaInput = new JSONSchemaInput(new JSONSchemaStore())
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString })

    const inputData = new InputData()
    inputData.addInput(schemaInput)
   
   
    return await quicktype({
      inputData,
      lang: targetLanguage,
    })
}
  

export { tempJsonSchema }