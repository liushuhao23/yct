/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 17:03:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-26 00:09:39
 */
import { login } from './yapi/login'
import { getGroupId } from './yapi/group'
import { getProjectId } from './yapi/project'
import { clg } from './utils/console'

const init = async () => {
    await login()
    const groupId = await getGroupId()
    clg('yellow', groupId, '选择的分组ID')
    const { projectId, projectName } = await getProjectId(groupId)
    clg('yellow', projectId, '选择的项目ID', projectName, '选择的项目名称')
}
init()