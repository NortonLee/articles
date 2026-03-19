const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const years = {};

files.forEach(f => {
  const year = f.substring(0, 4);
  if (year >= '2018' && year <= '2026') {
    years[year] = (years[year] || 0) + 1;
  }
});

const sorted = Object.entries(years).sort((a,b)=>a[0]-b[0]);
const total = files.length;

const lines = [
  `Total .md files in _posts: ${total}`,
  '',
  'By year:',
  ...sorted.map(([y,c])=>`  ${y}: ${c}`),
  '',
  `Expected total (2026-03-18 reach): ~?`
];

const out = lines.join('\n');
fs.writeFileSync('E:\\coding.net\\articles\\count-all.txt', out, 'utf8');
console.log(out);