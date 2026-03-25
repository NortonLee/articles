const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Count articles per date
const dateCounts = {};
files.forEach(file => {
  const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (match) {
    const date = match[1];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  }
});

// Find dates with multiple articles
const violations = Object.entries(dateCounts)
  .filter(([date, count]) => count > 1)
  .sort((a, b) => a[0].localeCompare(b[0]));

console.log(`📊 每日文章数量统计:`);
console.log(`  总文件数: ${files.length}`);
console.log(`  覆盖天数: ${Object.keys(dateCounts).length}`);
console.log(`  重复天数: ${violations.length}`);
console.log(`  平均每天: ${(files.length / Object.keys(dateCounts).length).toFixed(2)} 篇`);

console.log(`\n⚠️  一天有多篇文章的日期（需清理）:`);
violations.forEach(([date, count]) => {
  console.log(`  ${date}: ${count} 篇`);
});

// Find which files to keep (prefer the one with most complete frontmatter or longest content)
const toDelete = [];
violations.forEach(([date, count]) => {
  const dateFiles = files.filter(f => f.startsWith(date + '-'));
  // For now, mark all but one for deletion
  // Keep the first one (alphabetically) as it's likely the earliest generated
  const sorted = dateFiles.sort();
  const keep = sorted[0];
  const deleteList = sorted.slice(1);
  toDelete.push(...deleteList);

  console.log(`\n  ${date}: 保留 ${keep}, 删除 ${deleteList.length} 篇`);
});

console.log(`\n📝 清理建议:`);
console.log(`  总计删除 ${toDelete.length} 个文件`);
console.log(`  删除后总文件数: ${files.length - toDelete.length}`);
console.log(`  删除后每天平均: ${((files.length - toDelete.length) / Object.keys(dateCounts).length).toFixed(2)} 篇`);

if (toDelete.length > 0) {
  console.log(`\n🔧 执行的清理命令预览:`);
  toDelete.forEach(f => {
    console.log(`  del "${f}"`);
  });
}
