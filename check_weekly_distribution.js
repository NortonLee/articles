const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Group by year-week
const weeks = {};
files.forEach(file => {
  const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (match) {
    const [_, year, month, day] = match;
    const date = new Date(Date.UTC(parseInt(year), parseInt(month)-1, parseInt(day)));
    const weekNum = getWeekNumber(date);
    const weekKey = `${year}-W${weekNum.toString().padStart(2, '0')}`;
    if (!weeks[weekKey]) weeks[weekKey] = [];
    weeks[weekKey].push(file);
  }
});

// Get week numbers
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstDayOfYear) / 86400000);
  return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
}

// Sort by year-week
const sortedWeeks = Object.keys(weeks).sort();

// Check for violations (weeks with > 3 posts or == 0)
let violations = 0;
console.log('📊 Weekly article distribution (recent weeks):');
sortedWeeks.slice(-50).forEach(week => {
  const count = weeks[week].length;
  const status = count === 0 ? '❌' : (count > 3 ? '⚠️' : '✅');
  if (count === 0 || count > 3) violations++;
  console.log(`  ${status} ${week}: ${count} 篇`);
});

console.log(`\n📈 Total weeks covered: ${sortedWeeks.length}`);
console.log(`⚠️  Violations found: ${violations}`);
console.log(`✅  System is healthy if violations = 0 (all weeks have 1-3 articles)`);

// Also check recent 2026 weeks specifically
console.log('\n🔍 2026年周分布检查:');
const weeks2026 = sortedWeeks.filter(w => w.startsWith('2026-'));
weeks2026.forEach(week => {
  const count = weeks[week].length;
  console.log(`  ${week}: ${count} 篇`);
});
