/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-28 11:12:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 22:42:53
 */
import { IListItem } from '../types/yapi';
import { getInterceList } from '../yapi/getInfo';
const fs = require('fs-extra');
import { getConfig } from '../utils/config';
import { getInterfaceName } from '../utils/name';



const {
  quicktype,
  InputData,
  JSONSchemaInput,
  JSONSchemaStore,
} = require('quicktype-core');

interface IListItemCat extends IListItem {
  path: string;
  status: string;
  catid: number;
  project_id: number;
}
const tempJsonSchema = async (idLists: IListItemCat[]) => {
  const config = getConfig();
  const res = await getInterceList(idLists);
  Object.keys(res).forEach(async (item, index) => {
    const name =  getInterfaceName(res[item].path)
    // console.log('输出',  name)
    const { lines: body } = await quicktypeJSONSchema(
      'typescript',
      `${name}_body`,
      res[item].res_body
    );
    const { lines: body_other } = await quicktypeJSONSchema(
      'typescript',
      `${name}return`,
      res[item].req_body_other
    );
    const path = process.cwd();
    fs.outputFile(
      `${path}/${config.outDir}/${name}/body.ts`,
      body.join('\n'),
      (err: any) => {
        // throw new Error(err);
      }
    );
    fs.outputFile(
      `${path}/${config.outDir}/${name}/return.ts`,
      body_other.join('\n'),
      (err: any) => {
        // throw new Error(err);
      }
    );
  });
};

const quicktypeJSONSchema = async (
  targetLanguage: string,
  typeName: string,
  jsonSchemaString: string
) => {
  const schemaInput = new JSONSchemaInput(new JSONSchemaStore());
  await schemaInput.addSource({
    name: typeName,
    schema: jsonSchemaString,
    isConverted: false,
  });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: { 'just-types': 'true' },
  });
};

export { tempJsonSchema };
