/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-25 23:29:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 21:45:37
 */
import { http } from '../utils/http';
import { IListItem } from '../types/yapi';
import { list } from './api/index';
interface IListItemCat extends IListItem {
  path: string;
  status: string;
  catid: number;
  project_id: number;
}

type InfoReturn = {
  [key in string]: {
    res_body: string,
    req_body_other: string,
    path: string,
  }
}
/**
 * @description: 获取接口info schema
 * @param {*}
 * @return {*}
 * @author: liushuhao
 */
const getInterceList = async (idList: Array<IListItemCat>): Promise<InfoReturn>  => {
  return new Promise((resolve) => {
    const jsonSchemaData: {
      [key in string]: {
        res_body: string;
        req_body_other: string;
        path: string
      };
    } = {};
    const promises: Array<Promise<any>> = [];
    idList.forEach((item) => {
      const res = http.get(list.getInterface, {
        params: {
          id: item.id,
        },
      });
      promises.push(res);
    });
    Promise.allSettled(promises).then((rs) => {
      rs.forEach((item) => {
        if (item.status === 'fulfilled') {
          if (
            item.value.data.errcode === 0 &&
            Object.keys(item.value.data.data).length
          ) {
            jsonSchemaData[item.value.data.data.path] = {
              res_body: item.value.data.data.res_body,
              req_body_other: item.value.data.data.req_body_other,
              path: item.value.data.data.path
            };
          }
        }
      });
      resolve(jsonSchemaData);
    });
  });
};

export { getInterceList };
