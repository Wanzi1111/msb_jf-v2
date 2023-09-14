# 美术宝工单系统

## Build Setup

```bash

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## 环境及规则

| 环境     | 地址                          | ⚠️ 注意事项                                   |
| -------- | ----------------------------- | --------------------------------------------- |
| 测试环境 | https://mp-test.meishubao.com | 部署触发方式：合并代码至 test-mp              |
| 预发环境 | https://mp-pre.meishubao.com  | 部署触发方式：合并代码至 pre-mp(暂无预发环境) |
| 线上环境 | https://mp.meishubao.com/     | 基础服务中台线上环境！                        | 部署触发方式：提交远程 tag，格式为：msb-admin-middle-end\_ |

## 上线审批单规则： （入口： https://devops.meishubao.com/createApprovalForm/form） ！！！属于微服务

- gitlab_url：https://gitlab.meishubao.com/msb-fe/msb-admin-middle-end
- appGroup：msb-fe
- appName： msb-admin-middle-end
- appJob: deploy:live
- appTag: msb-admin-middle-end_20210902_v01
- rollback_tag: 上次上线的稳定 tag
