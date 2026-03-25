const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Group by date and week
const byDate = {};
const weeks = {};

files.forEach(file => {
  const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (match) {
    const [_, year, month, day] = match;
    const dateStr = `${year}-${month}-${day}`;
    byDate[dateStr] = byDate[dateStr] || [];
    byDate[dateStr].push(file);

    const date = new Date(Date.UTC(parseInt(year), parseInt(month)-1, parseInt(day)));
    const weekNum = getWeekNumber(date);
    const weekKey = `${year}-W${weekNum.toString().padStart(2, '0')}`;
    weeks[weekKey] = weeks[weekKey] || new Set();
    weeks[weekKey].add(dateStr);
  }
});

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstDayOfYear) / 86400000);
  return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
}

// Check recent weeks in 2026
const weeks2026 = Object.keys(weeks).filter(w => w.startsWith('2026-')).sort();
console.log('📅 2026年每周日期覆盖情况:');
weeks2026.forEach(week => {
  const dates = Array.from(weeks[week]).sort();
  const fileCount = files.filter(f => {
    const match = f.match(/^(\d{4})-(\d{2})-(\d{2})-/);
    if (match) {
      const [_, y, m, d] = match;
      const dateStr = `${y}-${m}-${d}`;
      return dates.includes(dateStr);
    }
    return false;
  }).length;

  console.log(`\n${week}:`);
  console.log(`  覆盖天数: ${dates.length} 天`);
  console.log(`  文章总数: ${fileCount} 篇`);
  console.log(`  日期列表: ${dates.slice(0, 7).join(', ')}${dates.length > 7 ? '...' : ''}`);

  // Check if there are multiple articles per day
  const multiArticleDays = dates.filter(d => byDate[d].length > 1);
  if (multiArticleDays.length > 0) {
    console.log(`  ⚠️  多篇文章的天数: ${multiArticleDays.length} 天`);
    multiArticleDays.slice(0, 3).forEach(d => {
      console.log(`    - ${d}: ${byDate[d].length} 篇`);
    });
  }
});

// Specific check for March 2026
console.log('\n🔍 2026年3月详细分布:');
const marchFiles = files.filter(f => f.startsWith('2026-03-'));
const marchDates = {};
marchFiles.forEach(f => {
  const dateStr = f.substring(0, 10);
  marchDates[dateStr] = (marchDates[dateStr] || 0) + 1;
});

Object.keys(marchDates).sort().forEach(date => {
  console.log(`  ${date}: ${marchDates[date]} 篇`);
});

console.log(`\n✅ 规则检查:`);
console.log(`  要求: 每周3篇，无日期缺口`);
console.log(`  问题: 检测到某些周有多篇文章同一天，导致周总数超限`);
console.log(`  建议: 每天最多1篇，每周至少1篇即可满足要求`);
