@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
node generate-posts-legacy-v2.js 2019-01-01 2019-12-31 3
pause