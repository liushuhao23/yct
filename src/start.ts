/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 17:03:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 17:26:42
 */
import { login } from './yapi/login'
import { getGroupId } from './yapi/group'
import { getProjectId } from './yapi/project'
import { getModular } from './yapi/listMenu'
import { getCatList, getCatId } from './yapi/ListCat'
import { tempJsonSchema } from './conversion/index'
import { existConfig, generateDefaultConfig } from './utils/config'
import { clg } from './utils/console'
import inquirer from 'inquirer'

async function init () {
  if (!existConfig()) {
    const res = await inquirer.prompt({
      type: 'confirm',
      message: '当前项目不存在config，是否生成默认配置',
      name: 'isGenerate',
      default: false
    })
    if (res.isGenerate) {
      generateDefaultConfig()
      return
    } else {
      clg('red', '已取消生成默认配置，请完善配置后重试')
      return
    }
  }
  await login()
  const groupId = await getGroupId()
  const { projectId, projectName } = await getProjectId(groupId)
  const modulars = await getModular(projectId)

  let checkedInterfaceList = []
  if (modulars[0].type === 'continue') {
    checkedInterfaceList = await getCatId(modulars[0].modularId)
  } else if (modulars[0].type === 'all') {
    checkedInterfaceList = await getCatList(modulars[0].modularId)
  }
  tempJsonSchema(checkedInterfaceList, projectName)
  return false
}
export { init }