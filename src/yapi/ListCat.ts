/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-26 23:21:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-28 10:07:23
 */
import { IListItem, IModularLiatResponse, catReturnResponse } from '../types/yapi'
import { http } from '../utils/http'
import inquirer, { QuestionCollection } from 'inquirer'
import { list } from "./api/index";


interface IListItemCat extends IListItem {
    path: string,
    status: string,
    catid: number,
    project_id: number
}
/**
 * @description: 
 * @param {number} catid
 * @return {*}
 * @author: liushuhao
 */
export async function getCatList(catid: number): Promise<IListItemCat[]> {
    return new Promise((resolve) => {
        // 拉取菜单列表
        http.get(list.getListCat, {
            params: {
                page: 1,
                limit: 100000,
                catid
            }
        }).then(async catReq => {
            // 抽取关键数据
            const catData = catReq?.data?.data?.list
            const catList: IListItemCat[] = catData.map((e: any) => {
                return {
                    name: e.title,
                    id: e._id,
                    path: e.path,
                    status: e.status,
                    catid: e.catid,
                    project_id: e.project_id
                }
            })  || []
            if (!catList.length) {
                throw new Error('当前暂无分类下接口列表')
            }
            resolve(catList)
        }).catch(err => {
            throw new Error(`yapi拉取分类下接口列表失败：${err.toString()}`)
        })
    })
}

export async function getCatId(catid: number): Promise<any | string> {
    return new Promise(async (resolve) => {
        const res = await getCatList(catid)
        const promptList: QuestionCollection = [{
            type: 'checkbox',
            message: '请选择要生成的接口:',
            name: 'catNames',
            choices: res.map(e => e.name),
            pageSize: 20
        }]
        const { catNames } = await inquirer.prompt(promptList)
        const checkedData: Array<IListItemCat> = res.filter(e => catNames.includes(e.name))
        if (checkedData.length === 0) {
            throw new Error('选择的接口有不存在接口')
          }
        resolve(checkedData)
        // console.log(checkedData, 'modularNames')
    })
}