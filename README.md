# MiniProgram-frontend

2022微信小程序比赛前端仓库

## 开发框架

- UI组件库：待定（LinUI、VantUI...）
- 目前的页面是供后端接口测试用
  - 先点击`获取用户信息`
  - 再点击`获取openid`
  - 再点击`获取token`
  - 随后在请求头里加上token进行api测试（或点击`token测试`）

## api构建

- 先在enums里定义后端api地址
- 然后在api.js里利用封装的`httpRequest`定义api函数
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
