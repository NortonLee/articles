@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
node fill-missing-posts.js
pause