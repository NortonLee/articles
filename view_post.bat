@echo off
chcp 65001 >nul
node -e "const fs = require('fs'); const file = '_posts/2026-03-25-微前端架构实践.md'; const content = fs.readFileSync(file, 'utf8'); console.log(content);"