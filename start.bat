@echo off
cd /d "%~dp0"
echo Starting portfolio...
echo.
timeout /t 3 /nobreak >nul
start http://localhost:3000
npx.cmd next start --port 3000
pause
