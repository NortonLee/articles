const fs = require('fs');
const path = require('path');

const postsDir = 'E:/coding.net/articles/_posts';
const deleteListPath = 'E:/coding.net/articles/_posts/delete-duplicates.txt';

const toDelete = fs.readFileSync(deleteListPath, 'utf8').split('\n').filter(Boolean);

console.log(`准备删除 ${toDelete.length} 个重复文件...`);

let deleted = 0;
toDelete.forEach(file => {
  try {
    const fullPath = path.join(postsDir, file);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      deleted++;
    } else {
      console.warn(`文件不存在: ${file}`);
    }
  } catch (err) {
    console.error(`删除失败: ${file}`, err.message);
  }
});

console.log(`✅ 删除完成: ${deleted}/${toDelete.length} 个文件已删除`);

// 统计剩余文件
const remaining = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).length;
console.log(`📊 剩余 Markdown 文件数: ${remaining}`);
