@echo off
cd /d "C:\Users\Admin\OneDrive\Documents\GitHub\mari-core"
echo.
echo 🌿 Committing and pushing MARI-Core changes...
echo.

git add .
set /p msg=Enter symbolic commit message: 
git commit -m "%msg%"
git push origin main

echo.
echo ✅ Push complete!
pause