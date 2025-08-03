
#!/bin/bash

echo "🔐 Setting up GPG + Git identity..."

# Replace with your actual GPG key ID or use dynamic listing
echo "Available GPG Keys:"
gpg --list-secret-keys --keyid-format=long

read -p "Enter your GPG key ID (e.g. ABC123DEF456): " KEYID
read -p "Enter your GitHub email: " EMAIL
read -p "Enter your Git username: " USERNAME

git config --global user.signingkey $KEYID
git config --global user.email "$EMAIL"
git config --global user.name "$USERNAME"
git config --global commit.gpgsign true

echo "✅ Git configured with GPG signing key $KEYID"

echo "🛠️ Configuring SSH trust..."
ssh-keygen -t ed25519 -C "$EMAIL"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo "📋 Public SSH key (add this to your GitHub SSH keys):"
cat ~/.ssh/id_ed25519.pub

echo "✅ Setup complete. Test with 'git commit -S' and push to a test branch."
