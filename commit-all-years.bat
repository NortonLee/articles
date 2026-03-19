@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
echo Adding all posts...
git add _posts/*.md
echo Committing...
git commit -m "feat: add posts for 2021-2026 (complete continuous coverage from 2018-03-26 to 2026-03-18)"
echo Pushing...
git push origin master
echo Done!
pause