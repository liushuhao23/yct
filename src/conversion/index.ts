/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-28 11:12:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-28 11:18:03
 */
import { IListItem } from '../types/yapi'
import { getInterceList } from '../yapi/getInfo'
interface IListItemCat extends IListItem {
    path: string,
    status: string,
    catid: number,
    project_id: number
}
const tempJsonSchema = async(idLists: IListItemCat[]) => {
    const res = await getInterceList(idLists)
    console.log('输出',  res)
}

export { tempJsonSchema }