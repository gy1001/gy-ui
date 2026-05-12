# gy-ui

<p align="center">
  <b>一个基于 Vue 3 + TypeScript + Vite 的企业级金融业务组件库</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen" alt="Vue 3" />
  <img src="https://img.shields.io/badge/typescript-5.x-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-5.x-purple" alt="Vite" />
  <img src="https://img.shields.io/badge/pnpm-monorepo-orange" alt="pnpm workspace" />
</p>

---

## 📖 简介

`gy-ui` 是一个专注于 **金融与 B 端后台场景** 的 Vue 3 组件库。它不只是 UI 组件的集合，更是一整套 **前端工程化实践**，包含严格的 TypeScript 类型系统、完善的单元测试、自动化的构建与文档体系。

本项目采用 pnpm monorepo 架构，实现了组件库、文档站、本地调试 playground 和工具函数的解耦与协作，是展示现代前端架构能力的绝佳作品。

**核心特点：**

- 💎 **Monorepo 架构**：`@gy-ui/components`、`@gy-ui/utils`、`@gy-ui/docs` 独立包管理。
- 🛠️ **严格类型约束**：基于 TypeScript 泛型设计组件 Props，提供完整的类型推导。
- ✅ **质量保障**：使用 Vitest + @vue/test-utils 进行单元测试，行覆盖率目标 > 80%。
- 📚 **文档驱动**：VitePress 构建文档站，提供实时交互示例。
- 🎯 **金融场景定制**：从状态标签、金额输入到虚拟滚动表格，直接命中金融业务痛点。

---

## 🌟 组件列表

| 组件           | 说明                                              | 状态      |
| -------------- | ------------------------------------------------- | --------- |
| **Button**     | 基础按钮，验证链路示例                            | ✅ 已完成 |
| **StatusTag**  | 金融业务状态标签（待审核、已放款、逾期等）        | 🚧 开发中 |
| **MoneyInput** | 金额输入框（千分位格式化、中文大写转换、限额）    | 🚧 开发中 |
| **FnForm**     | 声明式表单校验（基于 provide/inject，无 UI 依赖） | 🚧 开发中 |
| **FnTable**    | 高性能虚拟滚动表格（支持固定列、合计行）          | 🚧 开发中 |
| ...            | 更多组件持续规划中                                |           |

---

## 🧱 技术栈

- **框架**：Vue 3 (Composition API + `<script setup>`)
- **语言**：TypeScript（严格模式）
- **构建工具**：Vite（Library Mode + Node.js API）
- **测试**：Vitest + @vue/test-utils + happy-dom
- **文档**：VitePress
- **包管理**：pnpm (workspace)
- **代码规范**：ESLint + Prettier + lint-staged

---

## 📁 目录结构

```

gy-ui
├── package.json # 根 package，依赖 workspace 协议
├── pnpm-workspace.yaml # pnpm 工作空间声明
├── tsconfig.base.json # 公共 TS 配置（被各子包继承）
├── tsconfig.json # 根 TS 配置（项目引用，管理子包）
│
├── packages
│ ├── components # 组件库核心（@gy-ui/components）
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ └── src
│ │ ├── index.ts # 统一导出所有组件
│ │ ├── env.d.ts # Vue 文件类型声明
│ │ └── Button.vue # 示例组件
│ │
│ ├── docs # 文档站（@gy-ui/docs）
│ │ ├── package.json
│ │ └── ... (VitePress 配置文件)
│ │
│ └── utils # 工具函数库（@gy-ui/utils）
│ ├── package.json
│ ├── tsconfig.json
│ └── src
│ └── index.ts
│
├── play # 本地调试 playground
│ ├── package.json
│ ├── vite.config.ts
│ ├── index.html
│ ├── main.ts
│ └── App.vue # 直接引用 @gy-ui/components 进行实时调试
│
└── README.md

```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8（推荐 9.x）

### 克隆并启动

```bash
# 1. 克隆仓库
git clone <你的仓库地址>
cd gy-ui

# 2. 安装依赖
pnpm install

# 3. 启动本地调试 Playground
cd play
pnpm dev
```

浏览器访问 `http://localhost:5173`，即可看到组件效果。

> ⚠️ 注意：所有依赖安装、类型检查等命令均需在**仓库根目录**执行，play 内部只负责启动调试服务。

---

## 🔧 常用命令

| 命令                 | 说明                                              |
| -------------------- | ------------------------------------------------- |
| `pnpm install`       | 安装所有子包依赖，建立 workspace 软链接           |
| `pnpm typecheck`     | 运行全局 TypeScript 类型检查（基于根 references） |
| `pnpm lint`          | 运行 ESLint 检查                                  |
| `pnpm test`          | 运行所有组件的单元测试                            |
| `pnpm test:coverage` | 生成测试覆盖率报告                                |
| `pnpm docs:dev`      | 启动文档站本地开发服务                            |
| `pnpm docs:build`    | 构建文档站静态文件                                |
| `pnpm build`         | 构建组件库产物（规划中）                          |

你可以在根目录 `package.json` 的 `scripts` 中添加这些命令，方便统一调用。

---

## 📝 开发指南

### 添加新组件

1. 在 `packages/components/src/` 下创建组件文件（如 `MyComp.vue`）
2. 在 `packages/components/src/index.ts` 中导出：
   ```typescript
   export { default as MyComp } from './MyComp.vue'
   ```
3. 在 `play/App.vue` 中引入并验证效果
4. 编写单元测试文件（如 `MyComp.spec.ts`）并确保通过
5. 在 `packages/docs/` 中编写组件文档

### TypeScript 类型声明

所有组件均使用 `<script setup lang="ts">`，Props 通过 `defineProps<T>()` 定义泛型，确保类型安全。 `.vue` 文件的类型识别依赖 `packages/components/src/env.d.ts`，请勿删除该文件。

### 单元测试

使用 Vitest + @vue/test-utils，测试用例放置在对应组件同目录的 `*.spec.ts` 文件中，运行 `pnpm test` 即可执行。

---

## 🤝 贡献与反馈

本项目目前为个人深度实践项目，如果你有改进建议或发现了 Bug，欢迎提交 Issue 或 PR。共同打磨一套高质量的金融前端物料。

---

## 📄 License

[MIT](LICENSE)

---
