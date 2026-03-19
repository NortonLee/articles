const { execSync } = require('child_process');
const path = require('path');

try {
  const repoDir = 'E:\\coding.net\\articles';
  console.log('📦 Adding all posts...');
  execSync('git add _posts/*.md', { cwd: repoDir, stdio: 'inherit' });

  console.log('📝 Committing...');
  execSync('git commit -m "feat: add posts for 2020, 2019, and remaining 2018 (continuous weekly cadence)"', { cwd: repoDir, stdio: 'inherit' });

  console.log('🚀 Pushing to origin/master...');
  execSync('git push origin master', { cwd: repoDir, stdio: 'inherit' });

  console.log('✅ All done!');
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}