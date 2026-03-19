@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles\_posts
del /q 2019-*.md 2>nul
echo ✅ 已删除 2019 年文件
pause