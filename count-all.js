const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const years = {};
const slugs = new Set();
files.forEach(f => {
  const match = f.match(/^(\d{4})-/);
  if (match) {
    const year = match[1];
    years[year] = (years[year] || 0) + 1;
  }
  const slugMatch = f.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  if (slugMatch) slugs.add(slugMatch[1]);
});

const lines = [`Total files: ${files.length}`, `Unique slugs: ${slugs.size}`, '', 'By year:'];
Object.entries(years).sort((a,b)=>a[0]-b[0]).forEach(([y,c])=>lines.push(`  ${y}: ${c}`));

const output = lines.join('\n');
fs.writeFileSync('E:\\coding.net\\articles\\summary.txt', output, 'utf8');
console.log(output);