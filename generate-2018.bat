@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
node generate-posts-legacy-v2.js 2018-03-26 2018-12-31 3
pause