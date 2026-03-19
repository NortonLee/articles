const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.startsWith('2018-') && f.endsWith('.md'));
const dates = new Set();
files.forEach(f => {
  const match = f.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (match) dates.add(match[1]);
});

fs.writeFileSync('E:\\coding.net\\articles\\2018-count.txt',
`2018 files: ${files.length}\n2018 distinct dates: ${dates.size}\n`,
'utf8');
console.log(`2018 files: ${files.length}, distinct dates: ${dates.size}`);