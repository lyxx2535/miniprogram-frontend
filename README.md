# MiniProgram-frontend

2022微信小程序比赛前端仓库

## 小程序开发手册

- 小程序`Pages`项目结构

  - `wxml`：极其类似`html`

  - `wxss`：即`css`

  - `js`：即原生`js`，但可以使用[微信api]([基础 | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/api/))
  - `json`：项目配置文件，引入组件等功能可以在此配置

- 全局文件

  - `app.js`：全局`js`，常结合微信api里的生命周期函数完成初始化操作
  - `app.wxss`：全局`css`
  - `app.json`：全局配置文件

- 小程序语法

  - 极其类似`vue`，结合[文档]([微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/framework/))上手很快

- Http通信

  - 使用`wx.request`等微信给的api，可以理解为微信的`axios`或者`ajax`。`wx.request`已统一在`http.js`中封装成`httpRequest`函数

- 测试api时要改一下设置

![image-20220418164815736](https://peng-img.oss-cn-shanghai.aliyuncs.com/markdown-img/image-20220418164815736.png)

## 开发约定

- UI组件库：待定（LinUI、VantUI...）
- 代码检查：eslint
- 所有的静态资源（图片等）部署后用url引入，因为小程序发布时有代码体积限制（我记得是2M）
- 在`dev分支`里开发（或者建一个自己的分支），最后统一`merge`到`main分支`
- 目前的页面是供后端接口测试用
  - 先点击`获取用户信息`
  - 再点击`获取openid`
  - 再点击`获取token`
  - 随后在请求头里加上token进行api测试（或点击`token测试`）

## api构建

- 先在enums里定义后端api地址
- 然后在api.js里利用封装的`httpRequest`定义函数
- 使用：在对应的模块js文件里使用即可

## Git 提交规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型修改
