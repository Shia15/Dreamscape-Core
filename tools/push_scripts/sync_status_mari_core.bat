@echo off
cd /d "C:\Users\Admin\OneDrive\Documents\GitHub\mari-core"

echo.
echo 🧠 Checking symbolic sync status of MARI-Core...
echo -----------------------------

git status
echo -----------------------------
echo 🧾 Most recent local commit:
git log --oneline -n 1

echo -----------------------------
echo 🌐 Checking connection to GitHub remote...
git remote -v

echo -----------------------------
echo ✅ If all says 'up-to-date' and no uncommitted changes, your system is aligned.
echo.
pause