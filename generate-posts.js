#!/usr/bin/env node
/**
 * 批量生成博客文章
 * 用法：node generate-posts.js [startDate] [endDate] [postsPerWeek]
 * 示例：node generate-posts.js 2025-03-18 2025-12-31 3
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 参数解析
const [startDateStr, endDateStr, postsPerWeek = 3] = process.argv.slice(2);

if (!startDateStr || !endDateStr) {
  console.error('用法: node generate-posts.js <startDate> <endDate> [postsPerWeek=3]');
  console.error('示例: node generate-posts.js 2025-03-18 2025-12-31 3');
  process.exit(1);
}

const startDate = new Date(startDateStr);
const endDate = new Date(endDateStr);
const postsPerWeekInt = parseInt(postsPerWeek, 10);

console.log(`📝 批量生成文章`);
console.log(`   起始: ${startDateStr}`);
console.log(`   结束: ${endDateStr}`);
console.log(`   每周篇数: ${postsPerWeekInt}`);
console.log(`   预计总数: ${Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000) * postsPerWeekInt)} 篇`);

// 文章主题库
const topics = [
  { title: "Vue 3.5 组合式 API 深度解析", category: "前端开发", tags: ["Vue", "Composition API", "前端框架"] },
  { title: "Vite 6.0 构建性能优化指南", category: "前端工具", tags: ["Vite", "构建工具", "性能"] },
  { title: "TypeScript 5.5 类型体操进阶", category: "TypeScript", tags: ["TypeScript", "类型系统", "强类型"] },
  { title: "微信小程序云开发 2.0 实战", category: "小程序", tags: ["微信小程序", "云开发", "Serverless"] },
  { title: "React Server Components 完全指南", category: "React", tags: ["React", "RSC", "服务端组件"] },
  { title: "微前端 Module Federation 2.0 实践", category: "架构", tags: ["微前端", "Module Federation", "Webpack"] },
  { title: "Node.js 性能调优：从入门到精通", category: "后端", tags: ["Node.js", "性能", "调优"] },
  { title: "AI 编程助手：Copilot vs Cursor", category: "AI", tags: ["AI", "编程助手", "Copilot"] },
  { title: "低代码平台开发实战：从零到一", category: "低代码", tags: ["低代码", "平台开发", "可视化"] },
  { title: "前端监控与异常捕获最佳实践", category: "运维", tags: ["监控", "异常处理", "Sentry"] },
  { title: "小程序性能优化：60fps 到 120fps", category: "小程序", tags: ["性能优化", "小程序", "渲染"] },
  { title: "前端安全防护：XSS、CSRF 全解析", category: "安全", tags: ["安全", "XSS", "CSRF"] },
  { title: "WebAssembly 图像处理实战", category: "Wasm", tags: ["WebAssembly", "图像处理", "性能"] },
  { title: "PWA 2026：离线优先策略", category: "PWA", tags: ["PWA", "离线", "Service Worker"] },
  { title: "Monorepo 选型：Turborepo vs Nx", category: "工程化", tags: ["Monorepo", "Turborepo", "Nx"] },
  { title: "CSS 2026：Container Queries 实战", category: "CSS", tags: ["CSS", "Container Queries", "布局"] },
  { title: "Vitest + Playwright 全栈测试", category: "测试", tags: ["Vitest", "Playwright", "E2E"] },
  { title: "构建工具对决：Vite vs Turbopack", category: "构建", tags: ["Vite", "Turbopack", "Rspack"] },
  { title: "前端国际化 i18n 最佳实践", category: "国际化", tags: ["i18n", "国际化", "多语言"] },
  { title: "Web Components 组件库开发", category: "Web Components", tags: ["Web Components", "组件库", "自定义元素"] }
];

// 生成文件名（Jekyll 格式）
function generateFilename(date, title) {
  const dateStr = date.toISOString().split('T')[0];
  const slug = title.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  return `${dateStr}-${slug}.md`;
}

// 生成文章内容
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

本文介绍 ${topic.title} 的核心概念与实践方法。在 ${year} 年的前端开发生态中，掌握这一技术至关重要。

## 正文

### 核心概念

[这里插入详细的技术讲解]

### 实战示例

\`\`\`javascript
// 示例代码
console.log('Hello World');
\`\`\`

### 常见问题

1. 问题一：如何配置？
   解决方案：...

2. 问题二：性能优化技巧
   解决方案：...

## 总结

通过本文，你学会了 ${topic.title} 的基本使用方法。建议在实际项目中多实践，熟练掌握。

---
*生成时间: ${dateStr}*
*自动生成脚本*
`;
}

// 日期迭代
function addWeeks(date, weeks) {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

// 主生成循环
let currentDate = new Date(startDate);
let generatedCount = 0;
let topicIndex = 0;

while (currentDate <= endDate) {
  // 每周生成 postsPerWeekInt 篇文章
  for (let weekPost = 0; weekPost < postsPerWeekInt; weekPost++) {
    const topic = topics[topicIndex % topics.length];
    const filename = generateFilename(currentDate, topic.title);
    const filepath = path.join(__dirname, '_posts', filename);

    // 确保目录存在
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    // 生成内容
    const content = generatePostContent(currentDate, topic);
    fs.writeFileSync(filepath, content, 'utf8');

    console.log(`✅ ${filename}`);
    generatedCount++;
    topicIndex++;
  }

  // 下一周
  currentDate = addWeeks(currentDate, 1);
}

console.log(`\n✅ 完成！共生成 ${generatedCount} 篇文章`);
console.log(`📁 保存到: ${path.join(__dirname, '_posts')}`);
console.log('💡 接下来：');
console.log('  1. 检查文章质量');
console.log('  2. 推送到 GitHub');
console.log(`  git add _posts/*`);
console.log(`  git commit -m "feat: add ${generatedCount} posts (${startDateStr} to ${endDateStr})"`);
console.log('  git push origin main');