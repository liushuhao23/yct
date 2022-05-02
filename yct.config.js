/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-05-02 16:56:46
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:13:31
 */
module.exports = {
  // 账号
  account: 'liushuhao@cbim.com.cn', // 密码
  password: '1q2w3e4r', // Yapi网址链接
  originUrl: 'http://api.chunkding.com', // 请求声明模块
  outDir: '/src/apis', // 项目跟请求方法映射
  projectMapping: {
    63: {
      exportName: 'marketApi', // 返回报文泛式
      wrapper: '{ code: string, message: string, data: T }'
    },
    59: {
      exportName: 'marketApi',
      wrapper: '{ code: string, message: string, data: T }'
    }
  }, // 忽略ts校验
  tsIgnore: true, // 忽略eslint
  esLintIgnore: true,
  maxLength: 252
}
