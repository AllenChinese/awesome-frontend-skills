---
name: 前端代码注释技能
description: "为前端代码自动生成高质量注释（JSDoc/TSDoc/组件注释、函数与模块头注释、关键逻辑行内注释）。当用户提到\"添加/完善注释\"、\"生成JSDoc/TSDoc\"、\"给React/TS代码补注释\"、\"为代码写说明\"时，请优先使用本技能；当用户给出代码片段、文件路径、或要求\"注释风格\"、\"注释密度\"、\"中文/英文\"偏好时，也应触发。"
---

## 描述（What & When）
- 作用：为 JavaScript/TypeScript/React/Taro/CSS(SCSS) 等前端代码自动添加结构化注释，提升可读性、维护性与团队协作效率。
- 触发时机：
  - 用户提出“加注释/完善注释/生成 JSDoc/TSDoc/文档注释/组件注释/API 注释”等需求。
  - PR/代码评审阶段集中为变更点补充注释。
  - 需要统一注释规范、规范团队风格时。

## 输出风格
- 语言：默认与用户请求一致（优先中文）；支持 `language: zh|en`。
- 注释体系：
  - TS/JS：优先 TSDoc/JSDoc（`/** ... */`）；导出函数/类/组件/模块头必注释。
  - React 组件：Prop/事件/副作用说明、业务意图、交互要点。
  - 样式：模块头注释 + 区块注释；关键变量/混入用途说明。
- 密度控制：`density: low|medium|high`（默认 medium）。
- 严谨性：禁止臆测逻辑；不清楚处写“TODO/待确认”并保持简短。

## 使用方法
给出【代码或文件路径】+【可选配置】即可开始：
- 基本：
  - 指令：“请为下列 TS 代码添加 TSDoc 注释，密度 medium，中文输出”
  - 粘贴代码或指定文件路径
- 配置（可选）：
  ```json
  {
    "style": "tsdoc",        // tsdoc | jsdoc
    "language": "zh",        // zh | en
    "density": "medium",     // low | medium | high
    "framework": "react",    // auto | react | taro | vanilla
    "sections": ["module","exports","public-apis","complex-logic"],
    "includeInline": true      // 是否生成关键行内注释
  }
  ```

## 动作准则
1. 先分析：识别导出 API、公共组件、复杂逻辑（分支/副作用/异步/平台分支）。
2. 先模块后局部：从文件/模块头注释→导出实体→关键逻辑行内。
3. 类型优先：已有类型即复用；无法确定时保持空白或 TODO，但不凭空捏造。
4. 不改变行为：仅添加注释，除非用户明确允许改动代码（例如修正类型）。
5. 安全：不得输出敏感信息；不要生成误导性注释。

## 产出结构
- 模块头注释：用途/上下文/主要导出/依赖/平台差异
- 函数/方法：职责、参数、返回值、异常、副作用、复杂度提示
- 组件：Prop 定义、事件、状态/副作用、可访问性与交互说明
- 行内注释：仅在复杂分支、奇技淫巧、边界处理处插入

## 示例
**输入**（节选）
```ts
async function getPayParams(payData) {
  const res = await prePay(prePayParams)
  if (res.code === 10000) { return res.data }
  return null
}
```
**输出**
```ts
/**
 * 获取预支付参数
 * @param payData 支付数据（需包含 payId 等必备字段）
 * @returns 成功返回服务端返回的预支付参数；失败返回 null
 * @throws 不抛异常：异常以 sendException 上报且返回 null
 */
async function getPayParams(payData) { /* ... */ }
```

## 注意
- 对第三方 SDK（如 window.DpayWeb、wx.requestPayment）仅描述已知契约；未知字段不编造。
- 多端差异（WeApp/H5/App）需要在注释中明确指出分支条件与行为差异。
- 若发现可提升可靠性的小问题（如 JSON.parse 风险），仅在注释中标注 TODO，不直接改代码。

## 兼容性
- 无额外依赖；在前端/全栈项目中皆可用。
- 对 TS/JS/JSX/TSX/CSS/SCSS 具备效果；其余文件跳过。

## 快速开始
- 直接在对话中粘贴代码并说明期望风格与密度。
- 或者指定仓库文件路径，我将只读加载并生成注释补丁供你审阅。