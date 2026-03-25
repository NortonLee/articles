const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`📊 Articles project status:`);
console.log(`   Total files: ${files.length}`);
console.log(`   Date range: 2018-03-26 to 2026-03-25`);
console.log(`   Expected days: ~2949 days (8 years)`);
console.log(`   Coverage rate: ${(files.length / 2949 * 100).toFixed(1)}%`);

// Count unique dates
const uniqueDates = new Set();
files.forEach(file => {
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (match) uniqueDates.add(match[1]);
});
console.log(`   Unique dates: ${uniqueDates.size}`);
console.log(`   Avg articles/day: ${(files.length / uniqueDates.size).toFixed(2)}`);

// Check for missing dates between start and today
const startDate = new Date('2018-03-26');
const endDate = new Date('2026-03-25');
const allDates = [];
for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  allDates.push(d.toISOString().split('T')[0]);
}
const missing = allDates.filter(d => !uniqueDates.has(d));
console.log(`   Missing dates: ${missing.length}`);
if (missing.length > 0 && missing.length < 20) {
  console.log(`   Missing list: ${missing.join(', ')}`);
}

// Sample check for duplicate dates (should be none)
const dupes = files.filter(file => {
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match && files.filter(f => f.startsWith(match[1])).length > 1;
});
if (dupes.length === 0) {
  console.log(`✅  No duplicate dates (each day has exactly 1 article)`);
} else {
  console.log(`⚠️  Found ${dupes.length} dates with multiple articles`);
}
