---
name: node-sdk-generator
description: 引导生成高质量 Node.js SDK / CLI 项目。遵循“文档先行”原则，先引导生成 README 和 TECH_DOC 确定产品边界与架构设计，再严格按设计落地 TypeScript 工程，包含 pnpm、Prettier 格式化、Vitest 测试和标准 Git 忽略配置。当用户提及“初始化 SDK”、“生成 Node 项目”、“创建一个工具库”、“开发一个 SDK”等意图时触发。
---

# Node SDK 项目生成器

## 🎯 核心目标
帮助用户从零到一快速搭建生产级的 Node.js SDK 或 CLI 工具。
核心工作流分为两个阶段：**第一阶段：文档生成（设计与契约）** -> **第二阶段：代码落地（工程化与实现）**。

## 📝 工作流规范

### 阶段一：文档生成（设计先行）
在编写任何代码之前，必须先和用户确认需求并生成以下两份文档。

1. **生成 `README.md` (产品/用户文档)**
   - **核心定位**：一句话描述项目做什么。
   - **安装方式**：强制使用 `pnpm add <package-name>`。
   - **快速开始**：提供宿主项目接入的最简代码示例。
   - **配置说明**：相关环境变量和可选/必填参数。
   - **本地调试说明**：如何运行脚本或开发用例。

2. **生成 `TECH_DOC.md` (技术架构文档)**
   - **目录结构设计**：划分 `src/`, `tests/`, `scripts/`, `dist/`。
   - **`package.json` 核心脚本规划**：`build` (tsc), `format` (prettier), `test` / `test:watch` (vitest), 以及相关的 `debug` 脚本。
   - **核心模块划分**：入口文件职责、类型定义职责、核心逻辑文件职责。
   - **外部依赖与 CI/CD**：服务接口请求方式或简单的 Actions 接入示例。

*重要：完成阶段一后，你必须暂停当前执行流，并向用户确认：“文档设计已生成完毕，是否确认按此设计开始生成项目代码和工程骨架？”。等待用户确认后再进行下一步。*

### 阶段二：代码落地与工程化
获得用户确认后，严格按照上述文档生成项目骨架和代码。必须包含以下技术细节：

#### 1. 包管理与构建
- 强制使用 **pnpm** 作为包管理器，生成 `package.json`，并配置 `packageManager` 字段。
- 使用 **TypeScript** 开发，生成 `tsconfig.json`（设定输出到 `dist/` 目录，开启 `.d.ts` 类型声明生成）。
- `package.json` 必须配置 `"files": ["dist", "README.md", "TECH_DOC.md"]` 白名单，确保不发布源码和测试文件。

#### 2. 代码规范 (Prettier)
- 将 `prettier` 安装为 `devDependencies`。
- 生成标准的 `.prettierrc`（例：`{"singleQuote": true, "trailingComma": "all", "printWidth": 100}` 等常用选项）。
- 生成 `.prettierignore`（包含 `node_modules`, `dist`, `pnpm-lock.yaml`, `*.lock` 等）。
- 在 `package.json` 添加脚本 `"format": "prettier --write ."`。

#### 3. 单元测试 (Vitest)
- 将 `vitest` 安装为 `devDependencies`。
- 在 `tests/` 目录下生成针对核心逻辑的测试用例文件，必须包含参数校验和基础行为的断言，覆盖正常及异常捕获路径。
- 在 `package.json` 添加测试脚本：`"test": "vitest run"` 和 `"test:watch": "vitest"`。

#### 4. Git 忽略配置
- 生成标准的 `.gitignore` 文件。
- 必须包含：`node_modules/`, `dist/`, `.env*`, `*.log`, `coverage/`, `.DS_Store` 及编辑器隐藏目录。

#### 5. 源码结构与实现
- `src/index.ts`：统一导出所有对外类型与核心方法。
- `src/types.ts`：定义核心配置入参、出参结构接口。
- `src/constants.ts`：定义默认配置与常量（**严禁硬编码任何真实敏感密钥**，使用 `<YOUR_KEY>` 等占位符）。
- `src/<core>.ts`（核心业务文件）：实现主功能，避免向外泄漏副作用（如直接使用无前缀的 `console.log`，建议可传参控制或使用专用的 logger）。
- 提供 `scripts/debug/` 脚本，便于在不打包或发布的情况下，直接使用 `tsx` 运行验证本地核心逻辑。

## 🛡️ 边界与禁忌
1. **绝不硬编码敏感信息**：任何涉及 AccessKey、Token、密码的内容，在代码和文档中必须使用占位符，或通过环境变量读取。
2. **严格控制副作用**：作为 SDK 提供时，不能直接向标准输出随意打日志，或使用 `process.exit()` 中断宿主进程。
3. **分阶段执行**：决不允许在未生成 README/TECH_DOC 的情况下直接开始写 `src/` 代码或执行 `pnpm install`。
