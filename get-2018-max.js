const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir)
  .filter(f => f.startsWith('2018-') && f.endsWith('.md'))
  .map(f => {
    const match = f.match(/^(\d{4}-\d{2}-\d{2})-/);
    return match ? match[1] : null;
  }).filter(Boolean);

const dates = files.map(d => new Date(d)).sort((a, b) => a - b);
const maxDate = dates[dates.length - 1];

const output = `
📅 2018 年现有文件数: ${files.length}
🕐 最新日期: ${maxDate.toISOString().split('T')[0]}
📈 覆盖周数: ${Math.floor(files.length / 3)} 周
`.trim();

fs.writeFileSync('E:\\coding.net\\articles\\2018-status.txt', output, 'utf8');
console.log(output);