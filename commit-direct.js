const { spawnSync } = require('child_process');
const path = require('path');

function findGit() {
  const candidates = [
    'C:\\Program Files\\Git\\bin\\git.exe',
    'C:\\Program Files (x86)\\Git\\bin\\git.exe',
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'C:\\Windows\\System32\\git.exe',
    'git' // hope it's in PATH
  ];
  for (const p of candidates) {
    try {
      // quick existence check
      require('fs').accessSync(p);
      return p;
    } catch (e) {
      continue;
    }
  }
  return 'git'; // fallback
}

const repoDir = 'E:\\coding.net\\articles';
const git = findGit();

function run(args) {
  console.log(`> git ${args.join(' ')}`);
  const res = spawnSync(git, args, { cwd: repoDir, stdio: 'inherit', shell: false });
  if (res.status !== 0) {
    console.error('Command failed');
    process.exit(res.status);
  }
}

try {
  run(['add', '_posts/*.md']);
  run(['commit', '-m', 'feat: add posts for 2020, 2019, and remaining 2018 (continuous weekly cadence)']);
  run(['push', 'origin', 'master']);
  console.log('✅ All done!');
} catch (e) {
  console.error(e);
  process.exit(1);
}