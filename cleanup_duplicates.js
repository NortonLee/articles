const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Group by date
const dateFiles = {};
files.forEach(file => {
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (match) {
    const date = match[1];
    if (!dateFiles[date]) dateFiles[date] = [];
    dateFiles[date].push(file);
  }
});

// For each date with multiple files, keep only the first one alphabetically
const toDelete = [];
Object.entries(dateFiles).forEach(([date, fileList]) => {
  if (fileList.length > 1) {
    const sorted = fileList.sort();
    const keep = sorted[0];
    const deleteList = sorted.slice(1);
    toDelete.push(...deleteList);
    console.log(`${date}: 保留 1 篇，删除 ${deleteList.length} 篇`);
  }
});

console.log(`\n📝 总计删除 ${toDelete.length} 个重复文件`);
console.log(`📈 删除后剩余: ${files.length - toDelete.length} 篇`);

// Confirm deletion
if (toDelete.length > 0) {
  console.log('\n⚠️  执行删除操作...');
  let deleted = 0;
  toDelete.forEach(file => {
    try {
      fs.unlinkSync(path.join(postsDir, file));
      deleted++;
    } catch (e) {
      console.error(`  删除失败: ${file}`, e.message);
    }
  });
  console.log(`✅ 已删除 ${deleted} 个文件`);
} else {
  console.log('✅ 无需删除，每天恰好只有一篇文章');
}
