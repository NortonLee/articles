@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
node generate-posts-legacy-v2.js 2020-01-01 2020-12-31 3
pause