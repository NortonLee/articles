const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
if (!fs.existsSync(postsDir)) {
  console.log('_posts dir not found');
  process.exit(0);
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
files.sort();

const outFile = path.join(__dirname, 'all-posts-list.txt');
const content = files.join('\n');
fs.writeFileSync(outFile, content, 'utf8');

console.log(`Total .md files: ${files.length}`);
console.log(`List written to: ${outFile}`);