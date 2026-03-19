const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.startsWith('2020-') && f.endsWith('.md'));

console.log(`📁 2020 年现有文件数: ${files.length}`);
files.forEach(f => console.log(f));