@echo off
chcp 65001 >nul
cd /d E:\coding.net\articles
echo Generating 2021...
node generate-posts-legacy-v2.js 2021-01-01 2021-12-31 3
echo.
echo Generating 2022...
node generate-posts-legacy-v2.js 2022-01-01 2022-12-31 3
echo.
echo Generating 2023...
node generate-posts-legacy-v2.js 2023-01-01 2023-12-31 3
echo.
echo Generating 2024...
node generate-posts-legacy-v2.js 2024-01-01 2024-12-31 3
echo.
echo Generating 2025...
node generate-posts-legacy-v2.js 2025-01-01 2025-12-31 3
echo.
echo Generating 2026 (to 2026-03-18)...
node generate-posts-legacy-v2.js 2026-01-01 2026-03-18 3
echo.
echo All years generated.
pause