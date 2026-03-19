const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const years = {};
const slugs = new Set();

files.forEach(f => {
  const year = f.substring(0, 4);
  if (year >= '2018' && year <= '2026') {
    years[year] = (years[year] || 0) + 1;
  }
  const m = f.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  if (m) slugs.add(m[1]);
});

const result = `总文件数: ${files.length}
唯一 slug 数: ${slugs.size}
年份分布:
${Object.entries(years).sort((a,b)=>a[0]-b[0]).map(([y,c])=>`  ${y}: ${c}`).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, 'count-result.txt'), result, 'utf8');
console.log(result);