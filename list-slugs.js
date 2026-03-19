const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const slugs = files.map(f => {
  const match = f.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  return match ? match[1] : null;
}).filter(Boolean);

// 写入文件
const output = `
📊 现有文章数: ${slugs.length}
📋 已有 slug 列表:
${slugs.map((slug, i) => `${i + 1}. ${slug}`).join('\n')}

`.trim();

fs.writeFileSync(path.join(__dirname, 'slugs-list.txt'), output, 'utf8');
console.log('✅ 已生成 slugs-list.txt');

// 检查重复
const slugSet = new Set();
const duplicates = [];
slugs.forEach(slug => {
  if (slugSet.has(slug)) {
    duplicates.push(slug);
  }
  slugSet.add(slug);
});

if (duplicates.length) {
  fs.appendFileSync(path.join(__dirname, 'slugs-list.txt'), `\n⚠️  发现重复 slug: ${duplicates.join(', ')}`, 'utf8');
} else {
  fs.appendFileSync(path.join(__dirname, 'slugs-list.txt'), '\n✅ 无重复 slug', 'utf8');
}
