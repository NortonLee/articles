#!/usr/bin/env node
/**
 * 批量生成博客文章 - 扩展版（2018-2024 技术栈）
 * 用法：node generate-posts-legacy.js [startDate] [endDate] [postsPerWeek]
 * 示例：node generate-posts-legacy.js 2024-01-01 2024-12-31 3
 */

const fs = require('fs');
const path = require('path');

const [startDateStr, endDateStr, postsPerWeek = 3] = process.argv.slice(2);

if (!startDateStr || !endDateStr) {
  console.error('用法: node generate-posts-legacy.js <startDate> <endDate> [postsPerWeek=3]');
  process.exit(1);
}

const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);
const postsPerWeekInt = parseInt(postsPerWeek, 10);

console.log(`📝 批量生成文章（2018-2024 技术栈）`);
console.log(`   起始: ${startDateStr}`);
console.log(`   结束: ${endDateStr}`);
console.log(`   每周篇数: ${postsPerWeekInt}`);

// 扩展主题库（覆盖 2018-2024 技术）
const legacyTopics = [
  // Vue 生态系统
  { title: "Vue 2.x 到 3.x 迁移完全指南", category: "Vue", tags: ["Vue", "迁移", "组合式API"] },
  { title: "Vue Router 4 新特性详解", category: "Vue", tags: ["Vue Router", "前端路由"] },
  { title: "Vuex 4 与 Pinia 对比分析", category: "Vue", tags: ["Vuex", "Pinia", "状态管理"] },
  { title: "Vue 3 性能优化实战", category: "Vue", tags: ["Vue", "性能优化"] },

  // React 生态系统
  { title: "React 18 并发模式深度解析", category: "React", tags: ["React", "并发", "Suspense"] },
  { title: "React Hooks 最佳实践", category: "React", tags: ["React", "Hooks", "函数组件"] },
  { title: "Redux Toolkit 完全指南", category: "React", tags: ["Redux", "状态管理"] },
  { title: "React 函数组件 vs 类组件", category: "React", tags: ["React", "组件设计"] },
  { title: "Next.js 12/13 App Router 迁移", category: "React", tags: ["Next.js", "SSR", "路由"] },

  // 构建工具
  { title: "Webpack 5 配置详解", category: "构建工具", tags: ["Webpack", "打包", "优化"] },
  { title: "Rollup 实战：从零到一", category: "构建工具", tags: ["Rollup", "库打包"] },
  { title: "Babel 7 配置与插件开发", category: "构建工具", tags: ["Babel", "转译", "插件"] },
  { title: "GitHub Actions 自动化工作流", category: "CI/CD", tags: ["GitHub Actions", "自动化"] },

  // 微信小程序
  { title: "微信小程序自定义组件开发", category: "小程序", tags: ["微信小程序", "组件化"] },
  { title: "小程序性能优化：从 30% 到 90%", category: "小程序", tags: ["性能优化", "小程序"] },
  { title: "小程序云函数与云数据库", category: "小程序", tags: ["云开发", "Serverless"] },
  { title: "小程序与原生 App 混合开发", category: "小程序", tags: ["混合开发", "Hybrid"] },
  { title: "小程序 WXS 模块化编程", category: "小程序", tags: ["WXS", "数据处理"] },

  // Node.js 后端
  { title: "Node.js 异步编程：Promise、Async/Await", category: "Node.js", tags: ["异步", "Promise", "Async"] },
  { title: "Koa 2.x 中间件机制解析", category: "Node.js", tags: ["Koa", "中间件"] },
  { title: "Express 4.x 路由设计进阶", category: "Node.js", tags: ["Express", "路由"] },
  { title: "Node.js 性能监控与调优", category: "Node.js", tags: ["性能", "监控"] },
  { title: "Egg.js 企业级框架实战", category: "Node.js", tags: ["Egg.js", "企业级"] },

  // CSS/样式
  { title: "CSS Grid 布局完全指南", category: "CSS", tags: ["CSS Grid", "布局"] },
  { title: "Flexbox 实战：20 个常见场景", category: "CSS", tags: ["Flexbox", "布局"] },
  { title: "Sass/Less 预处理器选型", category: "CSS", tags: ["Sass", "Less", "预处理器"] },
  { title: "CSS 变量（Custom Properties）应用", category: "CSS", tags: ["CSS Variables", "主题"] },
  { title: "Tailwind CSS 快速上手", category: "CSS", tags: ["Tailwind", "Utility-First"] },

  // JavaScript 语言
  { title: "ES6+ 新特性完全手册", category: "JavaScript", tags: ["ES6", "语法"] },
  { title: "JavaScript 设计模式实战", category: "JavaScript", tags: ["设计模式", "架构"] },
  { title: "TypeScript 3.x 到 4.x 升级指南", category: "TypeScript", tags: ["TypeScript", "升级"] },
  { title: "面向对象编程：继承与组合", category: "JavaScript", tags: ["OOP", "继承"] },
  { title: "函数式编程在 JS 中的应用", category: "JavaScript", tags: ["函数式编程", "FP"] },

  // 工程化与质量
  { title: "ESLint + Prettier 代码规范", category: "工程化", tags: ["ESLint", "Prettier", "规范"] },
  { title: "Jest 单元测试实战", category: "测试", tags: ["Jest", "单元测试"] },
  { title: "Cypress E2E 测试入门", category: "测试", tags: ["Cypress", "E2E"] },
  { title: "代码覆盖率：Istanbul 配置", category: "测试", tags: ["覆盖率", "Istanbul"] },

  // 网络与 HTTP
  { title: "HTTP/2 与 HTTPS 配置实践", category: "网络", tags: ["HTTP/2", "HTTPS", "安全"] },
  { title: "RESTful API 设计规范", category: "后端", tags: ["REST", "API设计"] },
  { title: "GraphQL vs REST：选型指南", category: "后端", tags: ["GraphQL", "REST"] },
  { title: "WebSocket 实时通信实战", category: "网络", tags: ["WebSocket", "实时"] },

  // 移动端跨平台
  { title: "React Native 0.6x 升级指南", category: "React Native", tags: ["React Native", "跨平台"] },
  { title: "Flutter 与 React Native 对比", category: "跨平台", tags: ["Flutter", "RN", "选型"] },
  { title: "UniApp 多端开发实战", category: "UniApp", tags: ["UniApp", "多端"] },

  // 工具与效率
  { title: "VS Code 插件开发指南", category: "工具", tags: ["VS Code", "插件"] },
  { title: "Chrome DevTools 性能分析", category: "工具", tags: ["DevTools", "性能"] },
  { title: "Postman API 测试协作", category: "工具", tags: ["Postman", "API测试"] },

  // 安全与部署
  { title: "前端 XSS 防护实战", category: "安全", tags: ["XSS", "安全"] },
  { title: "CSRF 攻击与防御机制", category: "安全", tags: ["CSRF", "安全"] },
  { title: "Docker 容器化部署指南", category: "部署", tags: ["Docker", "容器"] },
  { title: "Nginx 配置：负载均衡与缓存", category: "部署", tags: ["Nginx", "运维"] },

  // 数据与状态
  { title: "IndexedDB 客户端存储", category: "浏览器", tags: ["IndexedDB", "存储"] },
  { title: "LocalStorage vs SessionStorage", category: "浏览器", tags: ["存储", "Web Storage"] },
  { title: "Service Worker 离线优先", category: "PWA", tags: ["Service Worker", "PWA"] },

  // 项目架构
  { title: "前端微服务：Module Federation", category: "架构", tags: ["微前端", "Module Federation"] },
  { title: "Monorepo：Lerna 与 Yarn Workspaces", category: "架构", tags: ["Monorepo", "Lerna"] },
  { title: "SSR vs SSG：静态生成选型", category: "架构", tags: ["SSR", "SSG", "渲染"] },

  // AI 与未来
  { title: "AI 代码助手：Copilot 初体验", category: "AI", tags: ["AI", "Copilot"] },
  { title: "ChatGPT 在开发中的应用", category: "AI", tags: ["ChatGPT", "AI辅助"] },
  { title: "机器学习前端推理：TensorFlow.js", category: "AI", tags: ["TensorFlow.js", "ML"] }
];

// 文件名生成
function generateFilename(date, title) {
  const dateStr = date.toISOString().split('T')[0];
  const slug = title.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  return `${dateStr}-${slug}.md`;
}

// 内容生成
function generatePostContent(date, topic) {
  const dateStr = date.toISOString().split('T')[0];
  const year = date.getFullYear();

  return `---
layout: post
title: "${topic.title}"
category: ${topic.category}
tags: [${topic.tags.map(t => `'${t}'`).join(', ')}]
date: ${dateStr}
---

# ${topic.title}

## 引言

${topic.title} 是 ${year} 年前端开发生态中的重要话题。本文将从实践角度出发，深入讲解相关概念与使用方法。

## 核心技术

### 概念解析

[这里解释核心概念]

### 实战步骤

1. 安装依赖
2. 配置环境
3. 编写代码
4. 测试验证

### 代码示例

\`\`\`javascript
// 示例代码
const example = () => {
  console.log('Hello World');
};
\`\`\`

## 常见问题

**Q1: 如何解决配置问题？**
A: 检查配置文件语法，确保版本兼容。

**Q2: 性能优化建议？**
A: 使用懒加载、代码分割、缓存策略。

## 总结

掌握 ${topic.title} 能显著提升开发效率。建议在实际项目中多加练习，积累经验。

---
*生成时间: ${dateStr}*
*自动生成脚本 - 补全历史博客*
`;
}

// 日期递增
function addWeeks(date, weeks) {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

// 主循环
let currentDate = new Date(startDate);
let generatedCount = 0;
let topicIndex = 0;

while (currentDate <= endDate) {
  for (let i = 0; i < postsPerWeekInt; i++) {
    const topic = legacyTopics[topicIndex % legacyTopics.length];
    const filename = generateFilename(currentDate, topic.title);
    const filepath = path.join(__dirname, '_posts', filename);

    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    const content = generatePostContent(currentDate, topic);
    fs.writeFileSync(filepath, content, 'utf8');

    console.log(`✅ ${filename}`);
    generatedCount++;
    topicIndex++;
  }

  currentDate = addWeeks(currentDate, 1);
}

console.log(`\n✅ 完成！共生成 ${generatedCount} 篇文章`);
console.log(`📁 保存到: ${path.join(__dirname, '_posts')}`);