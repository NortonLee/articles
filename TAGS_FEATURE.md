# 🏷️ Tags 页面使用指南

## 功能概览

articles 项目现已支持：

1. **标签云页面** (`/articles/tags.html`)
2. **首页快速标签导航**（显示最热门的15个标签）
3. **分页功能**（每页12篇文章）
4. **标签搜索过滤**（实时过滤标签卡片和对应文章分区）
5. **标签详情视图**（每个标签显示最新5篇文章，可查看全部）

---

## ✅ 已完成的改进

### 1. 分页功能
- **_config.yml**：启用 `jekyll-paginate`，设置 `paginate: 12`
- **index.html**：包含 `{% include pagination.html %}`
- **pagination.html**：上一页/下一页 + 页码导航

### 2. 标签系统
- **tags.html**：完整的标签聚合页面
  - 搜索框实时过滤标签
  - 网格化标签卡片（根据出现频率调整大小）
  - 每个标签显示有最新文章列表
  - "Show all" 链接可跳转到首页（需配合filter）

- **index.html**：首页快速标签栏
  - 显示权重最高的15个标签
  - 每个标签显示文章计数
  - 点击跳转到 tags.html 对应分部

- **header.html**：添加标签图标导航

---

## 🚀 如何使用

### 1. 标签页面访问

```
https://yourdomain.com/articles/tags.html
```

功能：
- 在搜索框输入关键词，实时过滤标签
- 点击标签卡片查看该标签的所有文章（显示前5篇）
- 点击 "Show all" 查看该标签全部文章（需要URL参数支持）

### 2. 首页标签快速导航

首页顶部显示热门标签，点击任意标签：
- 跳转到 tags.html 对应的标签分区
- 自动滚动到该标签区块

---

## 📊 标签统计示例

运行统计脚本：

```bash
cd E:\coding.net\articles
node tag_stats.js
```

输出示例：
```
📊 标签统计 (Top 20):
============================================================
 1. #Vue                 245 篇文章
 2. #React               198 篇文章
 3. #TypeScript          176 篇文章
 4. #Node.js             154 篇文章
 5. #Frontend            132 篇文章
 ...
```

---

## 🛠️ 技术实现

### 标签筛选逻辑（tags.html）

```javascript
function filterTags(query) {
    const tagCards = document.querySelectorAll('.tag-card');
    const tagSections = document.querySelectorAll('.tag-section');
    
    query = query.toLowerCase().trim();
    
    if (query === '') {
        tagCards.forEach(card => card.style.display = 'flex');
        tagSections.forEach(section => section.style.display = 'block');
        return;
    }
    
    tagCards.forEach(card => {
        const tagName = card.getAttribute('data-tag');
        card.style.display = tagName.includes(query) ? 'flex' : 'none';
    });
    
    tagSections.forEach(section => {
        const tagId = section.getAttribute('id');
        const tagName = tagId.replace('tag-', '').toLowerCase();
        section.style.display = tagName.includes(query) ? 'block' : 'none';
    });
}
```

### 标签大小计算

根据标签文章数量动态调整显示大小：

| 文章数 | CSS类 | 字号 |
|--------|-------|------|
| ≥ 20   | tag-xl | 1.2rem |
| 15-19  | tag-lg | 1.1rem |
| 10-14  | tag-md | 1.0rem |
| 5-9    | tag-sm | 0.95rem |
| < 5    | tag-xs | 0.85rem |

---

## 🎨 样式文件

- **modern.css**：主样式表（已更新）
  - `.tag-cloud-grid`：标签网格布局
  - `.tag-card`：标签卡片样式
  - `.quick-tag`：首页快速标签样式
  - `.post-card .tag`：文章卡片内的标签样式

---

## 📈 下一步建议

### 可选增强功能

1. **标签页面独立文章列表**
   - 实现基于标签的完整分页文章列表
   - 需要创建 `tagged.html` 布局
   - 使用 `site.tags.<tag_name>` 获取文章集合

2. **首页标签筛选**
   - 在首页添加 "Vue"、"React" 等快捷按钮
   - 点击后过滤当前页面显示的文章（前端过滤）

3. **标签 RSS 订阅**
   - 为每个热门标签生成专属 RSS feed
   - 使用 Jekyll 的 `jekyll-feed` 插件

4. **标签相似度推荐**
   - 基于标签共现频率推荐相关标签
   - 在文章页底部显示 "Related tags"

---

## 📂 文件清单

```
articles/
├── tags.html                      # ✨ 新增：标签主页面
├── tag_stats.js                   # ✨ 新增：标签统计脚本
├── stats_tags.bat                 # ✨ 新增：批处理统计
├── _config.yml                    # ✅ 更新：启用分页
├── index.html                     # ✅ 更新：添加快速标签导航
├── _includes/
│   ├── header.html               # ✅ 更新：添加标签图标
│   ├── pagination.html           # ✅ 新增：分页组件
├── assets/
│   └── css/
│       └── modern.css            # ✅ 更新：标签样式
└── STYLE_UPGRADE.md              # ✨ 升级文档
```

---

## 🐛 已知问题

1. **标签页面 "Show all" 按钮**
   - 当前点击会弹出 alert，实际需要后端支持 `?tag=Vue` 参数过滤
   - 解决方案：如需完整功能，需实现 Jekyll collection 过滤

2. **标签数量显示延迟**
   - 统计脚本基于 post.front matter，如果标签在正文中可能不准确
   - 建议确保所有文章都在 front matter 中定义 `tags` 字段

3. **分页性能**
   - 文章数量多（近3000篇）时，首页加载可能较慢
   - 建议：启用 Jekyll 构建缓存或增量构建

---

## 🎯 测试检查清单

- [ ] 访问 `/articles/tags.html` 能看到所有标签卡片
- [ ] 在搜索框输入 "Vue" 只显示相关标签
- [ ] 点击首页快速标签能跳转到 tags.html 对应分部
- [ ] 分页在首页正常工作（Page 2 显示第13-24篇文章）
- [ ] 移动端标签卡片网格自适应显示
- [ ] 暗色模式下标签颜色正常

---

**升级完成！** 🎉

如有问题请查看 `STYLE_UPGRADE.md` 或直接测试 modifications.

*大虾 (OpenClaw AI)*  
*2026-03-25*