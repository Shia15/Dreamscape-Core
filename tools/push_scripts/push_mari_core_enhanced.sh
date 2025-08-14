#!/bin/bash

# 🌐 AETHER Multi-Repository Push Script
# Enhanced version of the original push script with workspace awareness

cd "$(dirname "$0")/../.."

echo "🌐 AETHER Workspace - Multi-Repository Push"
echo "========================================="
echo ""

# Check if this is the mari-core repository
if [ ! -f "aether-workspace.json" ]; then
    echo "❌ This script must be run from the mari-core repository root"
    exit 1
fi

# Show current workspace status
echo "📊 Current workspace status:"
npm run workspace:status-all --silent
echo ""

# Get commit message
read -p "Enter symbolic commit message for mari-core: " commit_msg

if [ -z "$commit_msg" ]; then
    echo "❌ Commit message cannot be empty"
    exit 1
fi

echo ""
echo "🔄 Committing changes to mari-core..."

# Stage and commit changes
git add .
git commit -m "$commit_msg"

if [ $? -eq 0 ]; then
    echo "✅ Committed successfully"
    
    # Push to origin
    echo "📤 Pushing to origin..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Push complete!"
        echo ""
        echo "🌟 Next steps:"
        echo "  - Review changes in other repositories if needed"
        echo "  - Run 'npm run workspace:build-all' to test integration"
        echo "  - Use 'npm run workspace:sync-all' to sync other repos"
    else
        echo "❌ Push failed"
        exit 1
    fi
else
    echo "❌ Commit failed"
    exit 1
fi

echo ""
echo "🧠 Workspace sync complete!"