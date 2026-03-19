@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
git add _posts/*.md
if errorlevel 1 (
  echo GIT_ADD_FAILED > "%temp%\git-commit-status.txt"
  exit /b 1
)
git commit -m "feat: add posts for 2020, 2019, and remaining 2018 (continuous weekly cadence)"
if errorlevel 1 (
  echo GIT_COMMIT_FAILED > "%temp%\git-commit-status.txt"
  exit /b 1
)
git push origin master
if errorlevel 1 (
  echo GIT_PUSH_FAILED > "%temp%\git-commit-status.txt"
  exit /b 1
)
echo SUCCESS > "%temp%\git-commit-status.txt"
exit /b 0