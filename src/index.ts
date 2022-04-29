/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 17:03:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 20:07:33
 */
import { login } from './yapi/login'
import { getGroupId } from './yapi/group'
import { getProjectId } from './yapi/project'
import { getModular } from './yapi/listMenu'
import { getCatList, getCatId } from './yapi/ListCat'
import { tempJsonSchema } from './conversion/index'
import { clg } from './utils/console'
import { stdout } from 'single-line-log'
const init = async () => {

    const res_body = "{\"type\":\"object\",\"title\":\"empty object\",\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"type\":\"boolean\",\"mock\":{\"mock\":\"true\"}},\"code\":{\"type\":\"number\",\"mock\":{\"mock\":\"200\"}},\"data\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"id\":{\"type\":\"string\",\"mock\":{\"mock\":\"@id\"},\"description\":\"台账ID\"},\"title\":{\"type\":\"string\",\"mock\":{\"mock\":\"@title\"},\"description\":\"台账名称\"},\"key\":{\"type\":\"string\",\"mock\":{\"mock\":\"@string\"},\"description\":\"台账key\"},\"state\":{\"type\":\"string\",\"enum\":[\"run\",\"delete\"]},\"description\":{\"type\":\"string\",\"mock\":{\"mock\":\"@csentence\"}},\"updator\":{\"type\":\"string\",\"mock\":{\"mock\":\"@cname\"}},\"updateTime\":{\"type\":\"string\",\"mock\":{\"mock\":\"@datetime\"}},\"isMain\":{\"type\":\"boolean\",\"description\":\"是否是主台账\"},\"flowKey\":{\"type\":\"string\",\"description\":\"流程key\"},\"flowName\":{\"type\":\"string\",\"description\":\"流程名称\"}},\"required\":[\"id\",\"state\",\"key\",\"title\",\"description\",\"updator\",\"updateTime\",\"isMain\",\"flowKey\",\"flowName\"]}}},\"required\":[\"message\",\"success\",\"code\",\"data\"]}"
    // console.log('输出',  JSON.parse(res_body))
    await login()
    const groupId = await getGroupId()
    clg('yellow', groupId, '选择的分组ID')
    const { projectId, projectName } = await getProjectId(groupId)
    clg('yellow', projectId, '选择的项目ID', projectName, '选择的项目名称')
    const modulars = await getModular(projectId)

    let checkedInterfaceList = []
    if(modulars[0].type === 'continue') {
        checkedInterfaceList = await getCatId(modulars[0].modularId)
    } else if (modulars[0].type === 'all')  {
        checkedInterfaceList= await getCatList(modulars[0].modularId)
    }
    tempJsonSchema(checkedInterfaceList)
    clg('yellow',modulars)
}
init()