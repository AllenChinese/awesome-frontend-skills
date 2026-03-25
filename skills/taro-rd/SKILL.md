---
name: Taro开发专家技能
description: Taro 跨端项目研发流程与代码落地助手。只要用户提到 Taro/小程序/H5、页面新增或改造、路由与分包、接口封装、环境变量与构建配置、样式适配与 CSS Modules、Taro 生命周期（useDidShow/useLaunch 等）、TARO_ENV/TARO_APP_ENV，就优先使用本技能来按项目约定产出可直接落地的改动方案与代码。
---

# Taro 研发 Skill（面向当前仓库约定）

目标：在不引入新框架、不改变既有架构的前提下，把需求落到本仓库可运行、可维护的 Taro 代码上；输出包含“改哪些文件 + 为什么 + 如何验证”。

## 适用前提（自动识别）

- 框架：Taro 3.6.x（本仓库依赖为 3.6.28）+ React 18 + TypeScript + Webpack5
- 目录约定：`src/pages` 页面、`src/components` 组件、`src/apis` 接口、`src/utils` 通用能力
- 路径别名：`@/*` 指向 `src/*`
- 样式：Sass + CSS Modules（常见为 `index.module.scss`）
- 环境变量：以 `TARO_APP_` 开头（例如 `TARO_APP_BASE_URL`），并通过 `TARO_APP_ENV` 选择构建配置

## 工作方式（必须遵循）

1. 先判断目标端与场景
   - 目标端：`process.env.TARO_ENV`（如 `weapp` / `h5` / `alipay` 等）
   - 构建环境：`process.env.TARO_APP_ENV`（本仓库约定 `local` / `test` / 生产）
2. 复用已有模式再扩展
   - 新增页面/组件/接口时，先定位仓库中“最相似的实现”作为模板
3. 最小化改动面
   - 优先在既有模块中扩展；确需新增文件时，保持与同目录文件一致的命名与导出风格
4. 不额外增加注释
   - 除非用户明确要求，或修改区域本身已存在固定注释规范需要保持一致

## 项目速查（落地时优先参考）

- Taro 构建配置入口：`config/index.ts`（基于 `TARO_APP_ENV` 合并 dev/test/prod）
- App 入口：`src/app.tsx`、路由/分包：`src/app.config.ts`
- 页面三件套：`src/pages/**/index.tsx` + `index.config.ts` + `index.module.scss`
- 请求封装：`src/utils/request`（支持 `needAuth/showLoading/showError` 等扩展配置）
- 接口组织：`src/apis/*.ts`（函数式导出，入参 interface + 调用 request）

## 交付物模板（每次都按这个结构输出）

### 1) 需求复述（1-3 句）

- 说明要改什么、影响哪些端（weapp/h5 等）、是否涉及分包/路由/权限

### 2) 改动点清单（文件级）

用列表写清楚每个文件的改动目的，例如：
- `src/pages/xxx/index.tsx`：新增页面 UI 与交互
- `src/pages/xxx/index.config.ts`：配置标题/导航条/分享等
- `src/app.config.ts`：加入 pages 或 subPackages
- `src/apis/yyy.ts`：新增接口方法

### 3) 关键实现（代码）

- 只给与本需求相关的代码片段/文件 patch
- 使用 `@/` 别名导入
- 样式优先使用 `index.module.scss` 并通过 `styles[...]` 引用

### 4) 验证方式（可复制命令 + 预期现象）

- 优先引用 `package.json` 现有脚本（如 `dev:weapp` / `dev:h5` / `build:*`）
- 写出“看到什么算成功”

## 常见任务的落地指引

### A. 新增页面（主包 or 分包）

1. 判断落点：
   - 主包页面：加到 `src/app.config.ts` 的 `pages`
   - 分包页面：加到 `src/app.config.ts` 的 `subPackages[].pages`，并确保 `root` 正确
2. 新建页面目录：
   - `src/pages/<page-name>/index.tsx`
   - `src/pages/<page-name>/index.config.ts`
   - `src/pages/<page-name>/index.module.scss`
3. `index.config.ts` 约定：
   - 定义 `const pageConfig: Taro.PageConfig = { ... }`
   - `export default definePageConfig(pageConfig);`
4. 生命周期选择：
   - 页面展示刷新用 `useDidShow`
   - 首次启动/初始化用 `useLaunch`（通常在 `app.tsx`）

### B. 新增/修改接口调用（走统一 request）

1. 文件归类：
   - 优先放在已有同业务域文件（如 `src/apis/user.ts`、`src/apis/order.ts`）
2. 书写模式：
   - 定义入参 `interface`（可选入参 `params?: X`）
   - `return request({ url, method, data: params })`
   - 若不需要登录态：`request( ..., { needAuth: false } )`
   - 若要 toast：`{ showError: true }`；需要 loading：`{ showLoading: true, loadingText?: string }`
3. 环境相关：
   - 基础域名走 `process.env.TARO_APP_BASE_URL`（request 内已处理）

### C. 新增组件（复用 CSS Modules + 现有组件组织）

- 组件目录：`src/components/<ComponentName>/`
- 文件命名：`index.tsx` + `index.module.scss` 或与同目录保持一致
- 导出风格：默认导出组件或命名导出，保持与同目录一致
- 样式：尽量避免全局污染；需要复用变量可依赖 Sass resources（项目已全局注入）

### D. H5/小程序差异处理

优先策略：
1. 优先用已有工具函数封装差异（例如平台判断、导航、桥接能力）
2. 分支写法：以 `process.env.TARO_ENV === 'h5'` 或项目已有 `isMini()` 等能力判断
3. 禁止直接访问小程序特有 API 于 H5 分支外

## 产出要求（用于自检）

- 新增页面已注册到 `app.config.ts`（主包或分包）
- 代码可通过 `npm run lint`（避免未使用变量、类型错误）
- 不引入新依赖（除非用户明确要求且仓库已有先例）
- 修改点最小且与现有风格一致（导入路径、样式组织、函数导出方式）