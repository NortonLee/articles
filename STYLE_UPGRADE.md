# 🎨 Articles 项目样式升级文档

> 升级时间：2026-03-25  
> 设计风格：Modern Minimalist（现代极简）  
> 主题：Dark/Light 双模式支持

## ✨ 新特性亮点

### 1. 现代化视觉设计
- 🎯 **卡片式文章列表**：每篇文章以优雅的卡片形式展示，悬停时有细腻的上浮效果
- 🌓 **暗色模式支持**：一键切换深色/浅色主题，自动适配系统偏好
- 📱 **完全响应式**：手机上也能完美浏览，触控友好
- 🎨 **渐变大标题**：紫色渐变主题，科技感十足

### 2. 阅读体验提升
- 📑 **自动目录生成**：文章页自动提取标题生成 TOC，点击锚点平滑滚动
- 📏 **阅读进度条**：页面顶部显示阅读进度，一目了然
- 🔤 **改进的代码高亮**：等宽字体、优化配色、圆角代码块
- 🔗 **链接悬停效果**：底部线条动画，交互感更强

### 3. 技术栈与架构
- **CSS Variables**：统一样式变量，易于定制主题颜色
- **Vanilla JS**：零依赖，主题切换脚本轻量（<2KB）
- **Jekyll 兼容**：无缝集成现有 Jekyll 博客结构
- **SEO 友好**：保持语义化 HTML 结构

## 📁 文件变更清单

```
articles/
├── _layouts/
│   ├── default.html       # 更新：引入 modern.css 和 theme.js
│   └── post.html          # 新增：单文章页模板（含TOC和进度条）
├── _includes/
│   ├── header.html        # 简化：移除冗余，保留核心导航
│   ├── footer.html        # 微调：版权信息排版
│   └── pagination.html    # 新增：分页组件
├── assets/
│   ├── css/
│   │   └── modern.css     # ✨ 全新：现代样式库（10KB+）
│   └── js/
│       └── theme.js       # ✨ 新增：暗色模式切换
├── index.html             # 重写：卡片式文章列表
└── _config.yml            # 更新：启用 jekyll-paginate
```

## 🚀 使用方法

### 1. 安装依赖（如果尚未安装）

确保已安装 Jekyll 及分页插件：

```bash
gem install jekyll-paginate
```

### 2. 本地预览

```bash
cd articles
jekyll serve --host 0.0.0.0 --port 4000
```

然后在浏览器访问：`http://localhost:4000/articles`

### 3. 构建静态站点

```bash
jekyll build
```

生成的静态文件位于 `_site/` 目录。

### 4. 部署

将 `_site/` 目录内容部署到任何静态托管服务：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 自建 Nginx/Apache

## 🎯 核心功能说明

### 暗色模式切换

- 点击页面右上角的 🌓 按钮切换主题
- 主题选择自动保存到 localStorage
- 首次访问自动适配系统深色模式偏好

### 目录（TOC）

- 自动扫描文章中的 `h1, h2, h3, h4` 标题
- 生成层级缩进目录
- 点击标题平滑滚动到对应位置

### 阅读进度

- 页面滚动时顶部显示彩色进度条
- 渐变紫色主题，与整体设计一致

### 卡片式列表

- 每篇文章显示标题、日期、分类、标签、作者
- 悬停时卡片上浮并显示顶部彩色条
- 自动截取摘要（excerpt）或使用前 180 字符

## 🔧 样式自定义

如需修改主题色，只需在 `modern.css` 顶部 `:root` 变量区修改：

```css
:root {
  --accent: #228be6;          /* 主题色（默认蓝色） */
  --accent-hover: #1c7ed6;    /* 悬停色 */
  /* ...其他变量... */
}
```

暗色模式对应变量在 `[data-theme="dark"]` 块中。

## 📝 文章 Front Matter 格式

推荐 Front Matter 格式（用于最佳展示效果）：

```yaml
---
title: "文章标题"
category: "技术分类"      # 如：Vue, React, Node.js
tags: [标签1, 标签2]
author: "作者名"          # 可选，默认 Norton.Li
date: 2026-03-25
---
```

**注意**：
- `category` 和 `tags` 会影响文章卡片上的样式显示
- `excerpt` 字段可选，如不提供将自动截取内容
- 所有文章必须放在 `_posts/` 目录，文件名格式：`YYYY-MM-DD-标题.md`

## 🧹 清理旧文件（可选）

如需移除旧的设计文件，可以删除：

```bash
rm -f assets/css/page.css      # 旧样式
rm -f _layouts/noneLayout.html # 未使用的布局
rm -f _layouts/pptLayout.html  # 未使用的布局
```

保留原始文件作为备份亦可。

## 📸 效果预览

新设计包含以下元素：
- 紫色渐变大标题
- 卡片阴影与圆角
- 三色标签（分类、标签）
- 作者头像（可扩展）
- 响应式移动端布局

## 🐛 已知问题与解决方案

### 1. 中文字体显示
- 使用系统字体栈自动适配中英文
- Windows 用户默认显示微软雅黑或宋体

### 2. 缺少 excerpt
- 系统自动生成摘要，无需每篇文章手动添加

### 3. 代码块行号
- 当前未启用行号，如需添加可修改 `post.html` 中的 `<pre>` 处理逻辑

## 📚 参考资源

- [Jekyll 官方文档](https://jekyllrb.com/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [现代 Web 设计趋势](https://drafts.csswg.org/css-rhythm/)

## 🙏 致谢

设计灵感来自以下优秀技术博客：
- [Dev.to](https://dev.to/)
- [Hashnode](https://hashnode.com/)
- [CSS-Tricks](https://css-tricks.com/)

---

**升级完成！** 如有问题，请查看 Jekyll 构建日志或修改 `_config.yml` 配置。

*升级者：大虾 (OpenClaw AI)*  
*日期：2026-03-25*