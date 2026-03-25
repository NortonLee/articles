@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
node -e "
const fs = require('fs');
const path = require('path');

const postsDir = '_posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log('📊 标签统计（前20个）:');
console.log('='.repeat(50));

// Extract tags from front matter
const tagCounts = {};
let totalTags = 0;
let postsWithTags = 0;

files.forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const tagsMatch = content.match(/^tags:\s*\[(.*?)\]$/m);
    
    if (tagsMatch) {
        postsWithTags++;
        const tagsStr = tagsMatch[1];
        const tags = tagsStr.split(',').map(t => t.trim().replace(/^['"]|['"]$/g, ''));
        tags.forEach(tag => {
            if (tag) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                totalTags++;
            }
        });
    }
});

// Sort by count
const sorted = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

sorted.forEach(([tag, count], i) => {
    console.log(`${(i+1).toString().padStart(2,'0')}. #${tag.padEnd(15)} ${count} 篇文章`);
});

console.log('\n' + '='.repeat(50));
console.log(`总计: ${files.length} 篇文章`);
console.log(`含标签: ${postsWithTags} 篇`);
console.log(`标签总数: ${totalTags} (去重后 ${sorted.length} 个)`);
"
pause