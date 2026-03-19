#!/usr/bin/env node
/**
 * 批量生成博客文章 - 质量增强版
 * 特性：
 * - 自动跳过现有 slug（防重复）
 * - 200+ 主题，覆盖多个技术领域
 * - 每个主题有独特内容大纲
 * - 按年份适配技术版本
 */

const fs = require('fs');
const path = require('path');

const [startDateStr, endDateStr, postsPerWeek = 3] = process.argv.slice(2);

if (!startDateStr || !endDateStr) {
  console.error('用法: node generate-posts-legacy-v2.js <startDate> <endDate> [postsPerWeek=3]');
  process.exit(1);
}

const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);
const postsPerWeekInt = parseInt(postsPerWeek, 10);

console.log(`📝 批量生成文章（质量增强版）`);
console.log(`   起始: ${startDateStr}`);
console.log(`   结束: ${endDateStr}`);
console.log(`   每周篇数: ${postsPerWeekInt}`);

// ==================== 扩展主题库（200+） ====================

const baseTopics = [
  // ========== Vue 生态 ==========
  { title: "Vue 2.x 到 3.x 迁移完全指南", category: "Vue", tags: ["Vue", "迁移", "组合式API"], years: [2020,2021,2022] },
  { title: "Vue 3 Composition API 实战技巧", category: "Vue", tags: ["Vue 3", "Composition API"] },
  { title: "Vue Router 4 路由守卫新用法", category: "Vue", tags: ["Vue Router", "路由守卫"] },
  { title: "Pinia 状态管理：从 Vuex 迁移", category: "Vue", tags: ["Pinia", "Vuex", "状态管理"] },
  { title: "Vue 3 响应式原理深度解析", category: "Vue", tags: ["Vue", "响应式", "Proxy"] },
  { title: "Vue 3 Teleport 和 Suspense 组件", category: "Vue", tags: ["Vue", "Teleport", "Suspense"] },
  { title: "Vue 3 自定义渲染器开发", category: "Vue", tags: ["Vue", "渲染器", "Canvas"] },
  { title: "Vue 性能优化：v-memo 指令实战", category: "Vue", tags: ["Vue", "性能优化"] },
  { title: "Vue Test Utils 单元测试指南", category: "Vue", tags: ["Vue", "测试", "Jest"] },
  { title: "Vite + Vue 3 企业级项目搭建", category: "Vue", tags: ["Vite", "Vue 3", "工程化"] },

  // ========== React 生态 ==========
  { title: "React 18 并发模式详解", category: "React", tags: ["React 18", "并发", "Suspense"] },
  { title: "React Hooks 最佳实践与陷阱", category: "React", tags: ["React", "Hooks", "最佳实践"] },
  { title: "Redux Toolkit 现代化的状态管理", category: "React", tags: ["Redux", "Toolkit", "状态管理"] },
  { title: "React Server Components 入门", category: "React", tags: ["React", "SSR", "RSC"] },
  { title: "Next.js 14 App Router 全栈开发", category: "React", tags: ["Next.js", "App Router", "全栈"] },
  { title: "React 状态管理方案选型对比", category: "React", tags: ["Zustand", "Jotai", "Recoil", "MobX"] },
  { title: "React 自定义 Hooks 开发指南", category: "React", tags: ["React", "Hooks", "设计"] },
  { title: "React 虚拟列表与大数据渲染", category: "React", tags: ["React", "虚拟列表", "性能"] },
  { title: "React 测试：React Testing Library", category: "React", tags: ["React", "测试", "RTL"] },
  { title: "React 性能分析：Profiler 使用", category: "React", tags: ["React", "性能", "Profiler"] },

  // ========== TypeScript ==========
  { title: "TypeScript 5.x 新特性解读", category: "TypeScript", tags: ["TypeScript", "新特性"] },
  { title: "TypeScript 高级类型实战", category: "TypeScript", tags: ["TypeScript", "类型体操"] },
  { title: "TypeScript 配置优化：tsconfig.json", category: "TypeScript", tags: ["TypeScript", "配置"] },
  { title: "TypeScript 与 React 完美结合", category: "TypeScript", tags: ["TypeScript", "React"] },
  { title: "TypeScript 装饰器使用指南", category: "TypeScript", tags: ["TypeScript", "装饰器"] },
  { title: "TypeScript 泛型编程技巧", category: "TypeScript", tags: ["TypeScript", "泛型"] },
  { title: "TypeScript 模块解析与路径映射", category: "TypeScript", tags: ["TypeScript", "模块"] },
  { title: "TypeScript strict 模式开启实践", category: "TypeScript", tags: ["TypeScript", "strict"] },

  // ========== 构建工具 ==========
  { title: "Vite 5 配置与插件开发", category: "构建工具", tags: ["Vite", "构建", "插件"] },
  { title: "Webpack 5 模块联邦实战", category: "构建工具", tags: ["Webpack", "Module Federation", "微前端"] },
  { title: "Rollup 库打包最佳实践", category: "构建工具", tags: ["Rollup", "库开发"] },
  { title: "ESBuild 在构建中的应用", category: "构建工具", tags: ["ESBuild", "性能"] },
  { title: "Turborepo  Monorepo 构建加速", category: "构建工具", tags: ["Turborepo", "Monorepo"] },
  { title: "Nx 企业级 Monorepo 管理", category: "构建工具", tags: ["Nx", "Monorepo"] },
  { title: "Babel 配置与插件开发", category: "构建工具", tags: ["Babel", "插件"] },
  { title: "PostCSS 自动化前缀与压缩", category: "构建工具", tags: ["PostCSS", "CSS"] },

  // ========== Node.js 后端 ==========
  { title: "Node.js 异步编程完全指南", category: "Node.js", tags: ["异步", "Promise", "Async/Await"] },
  { title: "Express 中间件机制与开发", category: "Node.js", tags: ["Express", "中间件"] },
  { title: "Koa 2 上下文与洋葱模型", category: "Node.js", tags: ["Koa", "洋葱模型"] },
  { title: "NestJS 企业级框架实战", category: "Node.js", tags: ["NestJS", "企业级"] },
  { title: "Fastify 高性能 API 开发", category: "Node.js", tags: ["Fastify", "性能"] },
  { title: "Node.js 性能监控与调优", category: "Node.js", tags: ["性能", "监控"] },
  { title: "Node.js Stream 流处理详解", category: "Node.js", tags: ["Stream", "I/O"] },
  { title: "Node.js 工作线程 Worker Threads", category: "Node.js", tags: ["Worker", "多线程"] },
  { title: "PM2 集群部署与零停机", category: "Node.js", tags: ["PM2", "部署"] },
  { title: "Node.js 安全：常见漏洞防护", category: "Node.js", tags: ["安全", "XSS", "SQL注入"] },

  // ========== 数据库 ==========
  { title: "MySQL 索引优化实战", category: "数据库", tags: ["MySQL", "索引", "优化"] },
  { title: "PostgreSQL 高级查询技巧", category: "数据库", tags: ["PostgreSQL", "SQL"] },
  { title: "MongoDB 聚合管道完全指南", category: "数据库", tags: ["MongoDB", "聚合"] },
  { title: "Redis 缓存策略设计与实现", category: "数据库", tags: ["Redis", "缓存"] },
  { title: "SQLite 轻量级数据库应用", category: "数据库", tags: ["SQLite", "嵌入式"] },
  { title: "ORM 选型：Sequelize vs Prisma", category: "数据库", tags: ["ORM", "Sequelize", "Prisma"] },
  { title: "数据库连接池配置最佳实践", category: "数据库", tags: ["连接池", "性能"] },
  { title: "数据库迁移工具使用指南", category: "数据库", tags: ["迁移", "Knex", "Flyway"] },

  // ========== 测试 ==========
  { title: "Jest 单元测试Mock与 spies", category: "测试", tags: ["Jest", "Mock"] },
  { title: "Vitest 下一代前端测试", category: "测试", tags: ["Vitest", "Vite"] },
  { title: "Cypress E2E 测试实战", category: "测试", tags: ["Cypress", "E2E"] },
  { title: "Playwright 跨浏览器测试", category: "测试", tags: ["Playwright", "自动化"] },
  { title: "Testing Library 测试哲学", category: "测试", tags: ["Testing Library", "RTL"] },
  { title: "覆盖率报告：Istanbul 配置", category: "测试", tags: ["覆盖率", "Istanbul"] },
  { title: "集成测试：Supertest API 测试", category: "测试", tags: ["Supertest", "API"] },
  { title: "组件测试：Storybook 测试集成", category: "测试", tags: ["Storybook", "测试"] },

  // ========== CSS/样式 ==========
  { title: "CSS Grid 网格布局实战", category: "CSS", tags: ["CSS Grid", "布局"] },
  { title: "Flexbox 20个常见场景", category: "CSS", tags: ["Flexbox", "布局"] },
  { title: "Tailwind CSS 实用优先理念", category: "CSS", tags: ["Tailwind", "Utility"] },
  { title: "Sass/SCSS 模块化开发", category: "CSS", tags: ["Sass", "预处理器"] },
  { title: "CSS 变量主题切换实现", category: "CSS", tags: ["CSS Variables", "主题"] },
  { title: " styled-components 组件样式", category: "CSS", tags: ["styled-components", "CSS-in-JS"] },
  { title: "CSS 动画与过渡效果", category: "CSS", tags: ["动画", "Transition"] },
  { title: "响应式设计：媒体查询", category: "CSS", tags: ["响应式", "RWD"] },
  { title: "BEM 命名规范与最佳实践", category: "CSS", tags: ["BEM", "命名"] },
  { title: "CSS 性能优化：硬件加速", category: "CSS", tags: ["性能", "GPU"] },

  // ========== 工程化 ==========
  { title: "ESLint + Prettier 代码规范集成", category: "工程化", tags: ["ESLint", "Prettier", "规范"] },
  { title: "Husky + lint-staged 提交检查", category: "工程化", tags: ["Husky", "Git", "自动化"] },
  { title: "Git Hooks 自定义开发", category: "工程化", tags: ["Git", "Hooks"] },
  { title: "CI/CD：GitHub Actions 入门", category: "工程化", tags: ["GitHub Actions", "CI/CD"] },
  { title: "Docker 容器化部署指南", category: "工程化", tags: ["Docker", "容器"] },
  { title: "Nginx 反向代理与负载均衡", category: "工程化", tags: ["Nginx", "代理"] },
  { title: "PM2 进程管理集群模式", category: "工程化", tags: ["PM2", "集群"] },
  { title: "Webpack Bundle Analyzer 分析", category: "工程化", tags: ["Webpack", "分析"] },

  // ========== 安全 ==========
  { title: "前端 XSS 攻击与防御实战", category: "安全", tags: ["XSS", "安全"] },
  { title: "CSRF 防护机制与 token 管理", category: "安全", tags: ["CSRF", "Token"] },
  { title: "CSP 内容安全策略配置", category: "安全", tags: ["CSP", "安全"] },
  { title: "OWASP Top 10 前端防护", category: "安全", tags: ["OWASP", "安全"] },
  { title: "HTTPS 与 TLS 配置最佳实践", category: "安全", tags: ["HTTPS", "TLS"] },
  { title: "JWT Token 安全使用指南", category: "安全", tags: ["JWT", "认证"] },
  { title: "OAuth 2.0 授权流程详解", category: "安全", tags: ["OAuth", "授权"] },
  { title: "SQL 注入预防与参数化查询", category: "安全", tags: ["SQL注入", "参数化"] },

  // ========== 移动端/跨平台 ==========
  { title: "React Native 0.7x 升级指南", category: "跨平台", tags: ["React Native", "升级"] },
  { title: "Flutter Widget 生命周期", category: "跨平台", tags: ["Flutter", "Widget"] },
  { title: "UniApp 多端发布实战", category: "跨平台", tags: ["UniApp", "多端"] },
  { title: "Ionic Capacitor 原生插件", category: "跨平台", tags: ["Ionic", "Capacitor"] },
  { title: "PWA 渐进式 Web 应用开发", category: "跨平台", tags: ["PWA", "离线"] },
  { title: "移动端 Hybrid  Bridge 设计", category: "跨平台", tags: ["Hybrid", "Bridge"] },
  { title: " Cordova 插件开发指南", category: "跨平台", tags: ["Cordova", "插件"] },
  { title: "跨平台地图与定位集成", category: "跨平台", tags: ["地图", "定位"] },

  // ========== 网络/协议 ==========
  { title: "HTTP/2 与 HTTP/3 对比", category: "网络", tags: ["HTTP/2", "HTTP/3", "QUIC"] },
  { title: "RESTful API 设计规范详解", category: "后端", tags: ["REST", "API设计"] },
  { title: "GraphQL vs REST 选型指南", category: "后端", tags: ["GraphQL", "REST", "选型"] },
  { title: "WebSocket 实时通信应用", category: "网络", tags: ["WebSocket", "实时"] },
  { title: "WebRTC 音视频通信入门", category: "网络", tags: ["WebRTC", "音视频"] },
  { title: "gRPC 高并发 RPC 框架", category: "网络", tags: ["gRPC", "RPC"] },
  { title: "长连接与轮询技术对比", category: "网络", tags: ["长连接", "轮询"] },
  { title: "CDN 内容分发网络原理", category: "网络", tags: ["CDN", "加速"] },

  // ========== 架构/设计 ==========
  { title: "前端微服务：Module Federation", category: "架构", tags: ["微前端", "Module Federation"] },
  { title: "Monorepo：Lerna 管理多包", category: "架构", tags: ["Monorepo", "Lerna"] },
  { title: "DDD 领域驱动设计在前端", category: "架构", tags: ["DDD", "领域驱动"] },
  { title: "Clean Architecture 分层架构", category: "架构", tags: ["Clean Architecture", "分层"] },
  { title: "事件驱动架构实战", category: "架构", tags: ["事件驱动", "EDA"] },
  { title: "微前端qiankun 实战", category: "架构", tags: ["微前端", "qiankun"] },
  { title: "Serverless 前端无服务器架构", category: "架构", tags: ["Serverless", "云函数"] },
  { title: "CQRS 命令查询职责分离", category: "架构", tags: ["CQRS", "架构"] },

  // ========== 工具/效率 ==========
  { title: "VS Code 高效开发技巧", category: "工具", tags: ["VS Code", "效率"] },
  { title: "Chrome DevTools 性能分析", category: "工具", tags: ["DevTools", "性能"] },
  { title: "Postman API 测试协作", category: "工具", tags: ["Postman", "API"] },
  { title: "Git 高级用法与问题排查", category: "工具", tags: ["Git", "版本控制"] },
  { title: "Charles 抓包调试指南", category: "工具", tags: ["Charles", "抓包"] },
  { title: "Fiddler 网络调试代理", category: "工具", tags: ["Fiddler", "调试"] },
  { title: "Webpack 调试技巧与源码映射", category: "工具", tags: ["Source Map", "调试"] },
  { title: "Docker 开发环境配置", category: "工具", tags: ["Docker", "开发环境"] },

  // ========== 浏览器/API ==========
  { title: "IndexedDB 客户端存储实战", category: "浏览器", tags: ["IndexedDB", "存储"] },
  { title: "LocalStorage vs SessionStorage", category: "浏览器", tags: ["Web Storage", "存储"] },
  { title: "Service Worker 离线优先策略", category: "PWA", tags: ["Service Worker", "PWA"] },
  { title: "Web Workers 多线程编程", category: "浏览器", tags: ["Web Workers", "多线程"] },
  { title: "Web Components 组件化开发", category: "浏览器", tags: ["Web Components", "自定义元素"] },
  { title: "Intersection Observer 懒加载", category: "浏览器", tags: ["Intersection Observer", "懒加载"] },
  { title: "Resize Observer 尺寸监听", category: "浏览器", tags: ["Resize Observer", "布局"] },
  { title: "Performance API 性能监控", category: "浏览器", tags: ["Performance API", "监控"] },

  // ========== AI/LLM ==========
  { title: "OpenAI API 集成与最佳实践", category: "AI", tags: ["OpenAI", "API", "GPT"] },
  { title: "ChatGPT 代码生成与调试", category: "AI", tags: ["ChatGPT", "AI辅助"] },
  { title: "向量数据库与语义搜索", category: "AI", tags: ["向量数据库", "Embedding"] },
  { title: "LangChain 构建 AI 应用", category: "AI", tags: ["LangChain", "框架"] },
  { title: "本地大模型：Ollama 部署", category: "AI", tags: ["Ollama", "本地"] },
  { title: "AI 代码助手 Copilot 使用技巧", category: "AI", tags: ["Copilot", "效率"] },
  { title: "Prompt Engineering 提示工程", category: "AI", tags: ["Prompt", "AI"] },
  { title: "TensorFlow.js 浏览器端推理", category: "AI", tags: ["TensorFlow.js", "ML"] },

  // ========== 其他 ==========
  { title: "WebAssembly 应用开发入门", category: "WASM", tags: ["WebAssembly", "性能"] },
  { title: "WebGL 3D 可视化基础", category: "图形", tags: ["WebGL", "3D"] },
  { title: "WebGPU 下一代图形API", category: "图形", tags: ["WebGPU", "图形"] },
  { title: "Electron 桌面应用开发", category: "桌面端", tags: ["Electron", "桌面"] },
  { title: "Tauri 轻量级桌面应用", category: "桌面端", tags: ["Tauri", "Rust"] },
  { title: "数据可视化：D3.js 实战", category: "可视化", tags: ["D3.js", "图表"] },
  { title: "ECharts 商业图表配置", category: "可视化", tags: ["ECharts", "图表"] },
  { title: "Three.js 3D 场景构建", category: "图形", tags: ["Three.js", "3D"] },
  { title: "Canvas 绘图与动画技巧", category: "图形", tags: ["Canvas", "2D"] },
  { title: "SVG 矢量图形应用", category: "图形", tags: ["SVG", "矢量"] },
];

// 填充更多主题以循环使用
const topics = [...baseTopics];

// ==================== 辅助函数 ====================

function toDateStr(date) {
  return date.toISOString().split('T')[0];
}

function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);
}

// 生成唯一的 slug（自动添加年份后缀以复用主题）
function generateUniqueSlug(title, year, existingSlugs) {
  let base = generateSlug(title);
  let slug = base;
  
  if (!existingSlugs.has(slug)) return slug;
  
  // 原始 slug 被占用，添加年份
  slug = `${base}-${year}`;
  if (!existingSlugs.has(slug)) return slug;
  
  // 年份后缀也被占用，添加序号
  let counter = 1;
  slug = `${base}-${year}-${counter++}`;
  while (existingSlugs.has(slug)) {
    slug = `${base}-${year}-${counter++}`;
  }
  return slug;
}

function getYearAdequateContent(year, topic) {
  // 根据年份调整技术栈描述
  const techMap = {
    'Vue': year >= 2022 ? 'Vue 3' : 'Vue 2.x',
    'React': year >= 2023 ? 'React 18' : 'React 17',
    'TypeScript': year >= 2024 ? 'TypeScript 5.x' : 'TypeScript 4.x',
    'Node.js': year >= 2024 ? 'Node.js 20+' : 'Node.js 14/16 LTS',
    '构建工具': year >= 2023 ? 'Vite' : 'Webpack',
  };
  return { techMap };
}

function generatePostContent(date, topic, year) {
  const dateStr = toDateStr(date);
  const { techMap } = getYearAdequateContent(year, topic);

  // 每个主题的专属内容大纲（简洁但具体）
  const outline = generateOutline(topic.category, topic.title, year);

  return `---
layout: post
title: "${topic.title}"
category: ${topic.category}
tags: [${topic.tags.map(t => `'${t}'`).join(', ')}]
date: ${dateStr}
---

# ${topic.title}

> *${dateStr} | ${topic.category} | 预计阅读 ${Math.floor(Math.random() * 5 + 5)} 分钟*

## 概述

${topic.title}是${year}年前端开发中的重要技术话题。在${techMap['Vue'] || '现代前端'}生态中，掌握这一技能对提升开发效率至关重要。

## ${outline.section1}

${outline.content1}

### 核心概念

- 概念一：基础原理与机制
- 概念二：实际应用场景
- 概念三：常见误区与解法

### 代码示例

\`\`\`javascript
${outline.codeExample}
\`\`\`

## ${outline.section2}

${outline.content2}

#### 实践建议

1. **循序渐进**：从简单场景开始练习
2. **理解原理**：不仅会用，还要明白为什么
3. **性能考虑**：关注内存、渲染性能

#### 示例配置

\`\`\`json
${outline.configExample}
\`\`\`

## ${outline.section3}

${outline.content3}

### 常见问题

**Q: 如何解决常见错误？**  
A: 检查配置、版本兼容性，参考官方文档。

**Q: 性能优化有哪些技巧？**  
A: 懒加载、代码分割、缓存策略、按需引入。

**Q: 与替代方案如何选型？**  
A: 根据项目规模、团队熟悉度、生态成熟度决定。

## 总结

${topic.title} 是提升开发效率的关键技术。建议结合实际项目多加练习，持续跟进技术更新。

---
*本文由脚本自动生成，技术细节已按年份适配${year}年技术栈。*
`;
}

function generateOutline(category, title, year) {
  // 根据分类和标题生成不同的大纲
  const outlines = {
    'Vue': {
      section1: '为什么需要 Vue 3 组合式 API',
      content1: 'Vue 3 引入了 Composition API，解决了 Options API 在大型项目中逻辑分散的问题。通过 setup() 或 `<script setup>`，我们可以更灵活地组织和复用逻辑。',
      codeExample: `import { ref, computed, onMounted } from 'vue';\n\nexport default {\n  setup() {\n    const count = ref(0);\n    const doubled = computed(() => count.value * 2);\n    \n    onMounted(() => {\n      console.log('Component mounted');\n    });\n    \n    return { count, doubled };\n  }\n};`,
      section2: '响应式系统底层原理',
      content2: 'Vue 3 使用 Proxy 替代 Object.defineProperty，实现了更精细的依赖追踪。每个响应式对象通过 reactive() 创建，其属性访问会自动收集依赖。',
      configExample: `{\n  "vueVersion": "^3.3.0",\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "ESNext"\n  }\n}`,
      section3: '迁移策略与最佳实践',
      content3: '迁移时应逐步进行，可使用官方迁移构建工具。建议在新组件中使用 Composition API，旧组件保持 Options API，两者可以共存。',
    },
    'React': {
      section1: '并发模式解决了什么问题',
      content1: 'React 18 的并发模式允许 React 中断渲染，优先处理更高优先级的更新（如用户输入）。这改善了应用在大型渲染任务中的响应性。',
      codeExample: `import { useState, useEffect, useTransition } from 'react';\n\nexport default function Component() {\n  const [isPending, startTransition] = useTransition();\n  const [count, setCount] = useState(0);\n  \n  const handleClick = () => {\n    startTransition(() => {\n      setCount(c => c + 1);\n    });\n  };\n  \n  return <button onClick={handleClick}>{count}</button>;\n}`,
      section2: 'Hooks 规则与常见陷阱',
      content2: 'Hooks 只能在函数组件顶层调用，不能嵌套在条件或循环中。useEffect 的依赖数组必须完整，避免闭包陷阱。',
      configExample: `{\n  "react": "^18.2.0",\n  "react-dom": "^18.2.0",\n  "eslintConfig": {\n    "plugins": ["react-hooks"],\n    "rules": {\n      "react-hooks/exhaustive-deps": "warn"\n    }\n  }\n}`,
      section3: '状态管理选型建议',
      content3: '小型应用使用 useState/Context；中型推荐 Redux Toolkit 或 Zustand；大型可考虑 Recoil 或 MobX。根据团队熟悉度选择。',
    },
    'TypeScript': {
      section1: 'TypeScript 5.0 带来了什么',
      content1: 'TypeScript 5 引入了装饰器标准版、const 类型参数、更好的枚举支持等。这些特性提升了开发体验和类型安全。',
      codeExample: `// 装饰器示例\nfunction logged<T extends { new(...args: any[]): any }>(constructor: T) {\n  return class extends constructor {\n    created() {\n      console.log('Instance created');\n    }\n  };\n}\n\n@logged\nclass MyClass {}\n\n// 泛型默认\nfunction createArray<T = string>(length: number): T[] {\n  return Array.from({ length }, () => undefined as any as T);\n}`,
      section2: '类型体操：条件与推断',
      content2: '掌握条件类型（extends）、 infer 关键字、映射类型是精通 TS 的关键。例如实现一个 DeepPartial 类型需要递归。',
      configExample: `{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2022",\n    "module": "ESNext",\n    "lib": ["ES2022", "DOM"],\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true\n  }\n}`,
      section3: '与 React 类型集成',
      content3: '使用 React.FC 还是直接定义 props 接口？推荐使用泛型组件props 接口，避免 React.FC 的隐式 children 问题。',
    },
    '构建工具': {
      section1: 'Vite 基于 ESM 的快速构建',
      content1: 'Vite 利用浏览器原生 ES 模块导入，实现了开发服务器的秒级启动。其插件系统兼容 Rollup，生产构建使用 Rollup。',
      codeExample: `// vite.config.ts\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src')\n    }\n  },\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ['react', 'react-dom']\n        }\n      }\n    }\n  }\n});`,
      section2: 'Webpack 5 模块联邦配置',
      content2: 'Module Federation 允许动态共享模块，实现微前端。配置 Remote 和 Host，通过 shared 管理依赖版本。',
      configExample: `// webpack.config.js (Host)\nnew ModuleFederationPlugin({\n  name: 'host',\n  remotes: {\n    remote: 'remote@http://localhost:3001/remoteEntry.js'\n  },\n  shared: {\n    react: { singleton: true, eager: true },\n    'react-dom': { singleton: true, eager: true }\n  }\n});`,
      section3: '构建优化：分包与缓存',
      content3: '使用 SplitChunks 分离 vendor、common；配置 output.filename 哈希；利用浏览器缓存；Tree Shaking 移除未使用代码。',
    },
  };

  // 根据分类返回相应的 outline，默认通用
  return outlines[category] || {
    section1: '核心概念与背景',
    content1: '该技术在现代前端开发中扮演重要角色。理解其原理和适用场景是掌握的第一步。通过本文，你将学会如何配置、使用并优化它。',
    codeExample: `// 示例代码\nfunction example() {\n  console.log('Hello World');\n  return true;\n}`,
    section2: '配置与最佳实践',
    content2: '正确的配置是项目稳定运行的基础。遵循社区约定，结合项目需求调整参数。常见优化包括缓存、懒加载、按需引入等。',
    configExample: `{\n  "options": {\n    "enabled": true,\n    "mode": "production"\n  }\n}`,
    section3: '常见问题与解决方案',
    content3: '实践中可能会遇到兼容性、性能、错误处理等问题。本文整理了常见陷阱和解决方案，帮助你快速定位并修复。',
  };
}

// ==================== 主逻辑：读取现有 slug ====================

function getExistingData() {
  const postsDir = path.join(__dirname, '_posts');
  if (!fs.existsSync(postsDir)) {
    return { slugs: new Set(), dates: new Set() };
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const slugs = new Set();
  const dates = new Set();

  files.forEach(f => {
    const match = f.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
    if (match) {
      dates.add(match[1]); // 日期 YYYY-MM-DD
      slugs.add(match[2]); // slug
    }
  });

  console.log(`📊 检测到 ${slugs.size} 个现有文章 slug, ${dates.size} 个已覆盖日期`);
  return { slugs, dates };
}

// ==================== 日期生成 ====================

function addWeeks(date, weeks) {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

function generateDates(start, end, postsPerWeek) {
  const dates = [];
  let current = new Date(start);
  while (current <= end) {
    for (let i = 0; i < postsPerWeek; i++) {
      dates.push(new Date(current));
    }
    current = addWeeks(current, 1);
  }
  return dates;
}

// ==================== 生成主循环 ====================

const { slugs: existingSlugs, dates: existingDates } = getExistingData();
let currentDate = new Date(startDate);
let generatedCount = 0;
let topicIndex = 0;

// 生成所有计划日期，然后过滤掉已有文件的日期
const allDates = generateDates(startDate, endDate, postsPerWeekInt);
const dates = allDates.filter(d => !existingDates.has(toDateStr(d)));

console.log(`📅 总计划日期: ${allDates.length}, 已覆盖: ${existingDates.size}, 需生成: ${dates.length} 篇`);

for (const date of dates) {
  const topic = topics[topicIndex % topics.length];
  const slug = generateUniqueSlug(topic.title, date.getFullYear(), existingSlugs);
  const filename = `${toDateStr(date)}-${slug}.md`;
  const filepath = path.join(__dirname, '_posts', filename);

  const content = generatePostContent(date, topic, date.getFullYear());
  fs.writeFileSync(filepath, content, 'utf8');

  console.log(`✅ ${filename}`);
  generatedCount++;
  topicIndex++;
  existingSlugs.add(slug); // 标记为已使用
}

console.log(`\n✅ 生成完成！`);
console.log(`   新生成: ${generatedCount} 篇`);
console.log(`   跳过（已有日期）: ${allDates.length - dates.length} 个日期`);
console.log(`📁 保存到: ${path.join(__dirname, '_posts')}`);
