# JUSDA前端项目框架（需严格遵守一下规范及说明）
## based on umi.
### 注意事项：
1. 采用eslint作为静态代码检测工具，禁止修改/.eslintc；
2. 网络请求统一使用umi-request，并在/src/service文件夹定义网络请求action，不能在业务代码中直接使用。统一请求方法已定义在/src/utils/request.js；
3. 使用Dva作为统一状态管理机，禁止再集成使用Redux或Mobx等状态管理机；
4. 组件及页面容器，均由文件夹统一管理。每个文件夹包含js、less文件。参考 src/pages/*；
5. 配置文件位于/config/*；


### src文件目录结构
+ /config/config.js 环境配置
+ /config/config.routesjs 路由表
+ /src/components 组件
+ /src/constants 静态页面配置
+ /src/locales 国际化
+ /src/assets 静态资源
+ /src/models Dva的models
+ /src/page 页面容器
+ /src/service 页面网络请求Action
+ /src/utils 公共方法及
+ /src/app.js 入口文件
+ /src/global.less 公共样式

### lint规范
- vscode插件 【vsc-commitizen】 规范commit信息 [commitlint](https://www.npmjs.com/package/@commitlint/cli)
- vscode插件 【stylelint 0.70.0】 规范css编码
- vscode插件 【ESLint】 规范js编码


### 各个环境的api，运维依赖此配置
>  文件路径/public/config.js, 入口html引入此文件。

- dev
```js
window.jusdaBaseConfig = {
    baseUrl: 'https://dev',
};
```
- sit 
```js
window.jusdaBaseConfig = {
    baseUrl: 'https://sit',
};
```
