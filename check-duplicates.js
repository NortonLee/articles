const fs = require('fs');
const path = require('path');

const postsDir = 'E:/coding.net/articles/_posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// 解析文件名：YYYY-MM-DD-slug.md
const groups = new Map();

files.forEach(file => {
  const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+?)\.md$/);
  if (!match) return;
  const [, year, month, day, slug] = match;
  const date = `${year}-${month}-${day}`;

  if (!groups.has(slug)) {
    groups.set(slug, []);
  }
  groups.get(slug).push({ date, file });
});

// 找出重复的 slug（同一主题有多个日期）
const duplicates = [];
for (const [slug, items] of groups) {
  if (items.length > 1) {
    duplicates.push({ slug, files: items.sort((a, b) => a.date.localeCompare(b.date)) });
  }
}

// 按重复次数排序
duplicates.sort((a, b) => b.files.length - a.files.length);

console.log(`总文件数: ${files.length}`);
console.log(`去重后 slug 数: ${groups.size}`);
console.log(`重复 slug 数: ${duplicates.length}\n`);

let totalDuplicates = 0;
duplicates.forEach(dup => {
  console.log(`[${dup.files.length} 篇] ${dup.slug}`);
  dup.files.forEach(f => console.log(`  - ${f.date} : ${f.file}`));
  totalDuplicates += dup.files.length - 1; // 保留一篇，其余为重复
  console.log('');
});

console.log(`\n总计需要删除的重复文件数: ${totalDuplicates}`);
console.log(`清理后预计剩余: ${files.length - totalDuplicates}`);

// 生成删除建议：保留最早的，删除后续重复
const toDelete = [];
duplicates.forEach(dup => {
  // 保留第一个（最早），其余删除
  for (let i = 1; i < dup.files.length; i++) {
    toDelete.push(dup.files[i].file);
  }
});

console.log(`\n待删除文件列表（count: ${toDelete.length}）:`);
toDelete.forEach(f => console.log(`  rm "${f}"`));

// 保存删除列表到文件，便于审核
fs.writeFileSync('E:/coding.net/articles/_posts/delete-duplicates.txt', toDelete.join('\n'), 'utf8');
console.log(`\n删除列表已保存到: E:/coding.net/articles/_posts/delete-duplicates.txt`);
