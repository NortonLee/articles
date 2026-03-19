@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles\_posts
del /q 2020-*.md 2>nul
echo ✅ 已删除 2020 年文件
pause