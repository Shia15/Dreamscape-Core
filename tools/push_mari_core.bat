@echo off
cd /d "C:\Users\Admin\OneDrive\Documents\GitHub\mari-core"
echo.
echo 🌿 Committing and pushing MARI-Core changes...
echo.

git add .
set /p msg=Enter symbolic commit message: 
git commit -m "%msg%"

git push origin main
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Push failed. Check for permission or email issues.
) ELSE (
    echo ✅ Push successful.
)

echo.
pause