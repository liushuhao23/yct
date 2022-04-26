/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 17:03:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-27 00:00:11
 */
import { login } from './yapi/login'
import { getGroupId } from './yapi/group'
import { getProjectId } from './yapi/project'
import { getModular } from './yapi/listMenu'
import { getCatId } from './yapi/ListCat'
import { clg } from './utils/console'
import { stdout } from 'single-line-log'

const init = async () => {
    await login()
    const groupId = await getGroupId()
    clg('yellow', groupId, '选择的分组ID')
    const { projectId, projectName } = await getProjectId(groupId)
    clg('yellow', projectId, '选择的项目ID', projectName, '选择的项目名称')
    const modulars = await getModular(projectId)
    if(modulars[0].type === 'continue') {
        getCatId(modulars[0].modularId)
    } else if (modulars[0].type === 'all')  {
        //
    }
    clg('yellow',modulars)
}
init()