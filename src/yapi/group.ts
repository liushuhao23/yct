/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 23:29:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:06:48
 */
import { http } from '../utils/http'
import { IListItem } from '../types/yapi'
import { list } from './api/index'
import inquirer, { QuestionCollection } from 'inquirer'

const getGroupList = async (): Promise<IListItem[]> => {
  const groupRes = await http.get(list.getGroupList, {})
  // 抽取关键数据
  const groupList: IListItem[] = groupRes?.data?.data?.map((e: any) => {
    return {
      name: e.group_name,
      id: e._id
    }
  }) || []
  // 判断数据是否为空
  if (groupList.length === 0) {
    throw new Error('当前暂无分组列表')
  }
  return groupList
}

// 获取分组ID
const getGroupId = async (): Promise<number> => {
  return new Promise(async (resolve) => {
    const groupList = await getGroupList()
    // 选择分组
    const promptList: QuestionCollection = [{
      type: 'list',
      message: '请选择要生成的分组:',
      name: 'name',
      choices: groupList.map((e) => e.name),
      pageSize: 20
    }]
    const groupName = await inquirer.prompt(promptList)
    // 选择的分组ID
    const groupId = groupList.find((e) => e.name === groupName.name)?.id
    if (!groupId) {
      throw new Error('选择的分组不存在')
    }
    resolve(groupId)
  })
}

export { getGroupList, getGroupId }
