<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-05-02 22:12:09
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-05-02 22:15:26
-->
# YCT

> Yapi 生成 Typescript`请求方法`及`声明文件`工具

## 插件安装


1. `全局包`：使用`npm install -g yct`全局安装即可

## 插件使用

### 概念说明

层级关系：`分组` → `项目` → `模块` → `接口`



### 全局包使用方式

#### 使用说明：

```sh
// 生成默认配置
$ yct -i
// 根据项目修改配置后
$ yct -g
```



#### 完整功能列表：

```sh
$ yct --help
Options:
  -v, --version   获取当前版本
  -i, --init      初始化配置文件
  -g, --generate  生成接口文档
```

* `-v, --version`：获取包的版本号
* `-i, --init`：初始化配置文件，会放在项目当前执行目录下的yct.config.js
* `-g, --generate`：根据配置生成接口文件，当没有配置时会初始化默认配置



## 配置文件

工具默认会去寻找当前工作区的`yct.config.js`文件，该文件默认导出一个对象

### 配置示例

```javascript
module.exports = {
  // 账号
  account: 'xxx@xxx.cn',
  // 密码
  password: 'xxxxxx',
  // Yapi网址链接
  originUrl: 'https://yapi.xxxx.cn',
  // 输出目录
  outDir: './src/apis',
  // 项目跟请求方法映射
  projectMapping: {
  	// 项目跟请求方法映射（projectId为生成目录id）
  	// 参考url https://yapi.xxxx.cn/project/216/interface/api
  	// 其中216就是projectId,当未配置时y2t也会有相应的projectId提示
    216: {
      exportName: 'API',
      // 返回报文泛式
      // wrapper: '{ code: string, message: string, data: T }',
    },
  },
};

```

### 配置具体说明

* `account`：账号
* `password`：密码
* `originUrl`：Yapi 网址地址
* `outDir`：输出目录，相对于当前工作区的根目录
* `projectMapping`：项目映射。在微服务盛行的现在一个工程中可能会有多个 api 地址，所以这里按照`项目id`进行了请求方法映射。
  * `projectId`：项目 ID，例如url:https://xxx.xxx.com/project/216/interface/api，其中216即为项目ID
  * `exportName`：请求方法名称，为了兼容不同的请求库，所以生成的代码中不会直接生成 ajax 请求方法，需要外部传入，这里的`exportName`一般就是你配置好了的`axios`实例

