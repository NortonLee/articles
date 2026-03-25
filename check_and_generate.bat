@echo off
echo Checking latest posts...
dir E:\coding.net\articles\_posts /b | findstr 2026-03-
echo.
echo Running dry-run generation for 2026-03-19 to 2026-03-25...
cd /d E:\coding.net\articles
node generate-posts-legacy-v2.js 2026-03-19 2026-03-25 3 --dry-run
pause
