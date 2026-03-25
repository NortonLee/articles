const fs = require('fs');
const path = require('path');

const postsDir = '_posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log('\n📊 标签统计 (Top 20):');
console.log('='.repeat(60));

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
    const rank = (i + 1).toString().padStart(2, '0');
    const tagPadded = tag.padEnd(20);
    const countPadded = count.toString().padStart(4);
    console.log(`${rank}. #${tagPadded} ${countPadded} 篇文章`);
});

console.log('\n' + '='.repeat(60));
console.log(`📈 总计:`);
console.log(`   文章总数: ${files.length}`);
console.log(`   含标签文章: ${postsWithTags}`);
console.log(`   标签总数: ${totalTags} (去重后 ${sorted.length} 个)`);
console.log('='.repeat(60) + '\n');