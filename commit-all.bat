@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
echo Adding all posts...
git add _posts/*.md
if errorlevel 1 (
  echo Git add failed
  pause
  exit /b 1
)
echo Committing...
git commit -m "feat: add posts for 2020, 2019, and remaining 2018 (continuous weekly cadence)"
if errorlevel 1 (
  echo Git commit failed
  pause
  exit /b 1
)
echo Pushing to origin/master...
git push origin master
if errorlevel 1 (
  echo Git push failed
  pause
  exit /b 1
)
echo Done!
pause