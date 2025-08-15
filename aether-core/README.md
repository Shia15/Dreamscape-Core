# aether-core
Backend infrastructure for the Aether system. Includes: API logic, data models, system health, egg incubation logic, network syncing.
# 🌌 AETHER Core

**AETHER Core** is the **central symbolic and emotional engine** of the AETHER Ecosystem.  
It provides shared services, constants, and emotional state logic to coordinate all other modules.

---

## ✨ Purpose
- **Shared Symbolic Data**: Standard constants, enums, and mappings.
- **Emotional State Logic**: Mood evaluation, routing, and weights.
- **Foundation Layer**: Supports mari-core and aether-frontend.
- **Future Expansion**: Built for modular growth across multi-repo workspace.

---

## 📂 Structure
\`\`\`
aether-core/
├── src/             # Core logic, symbolic constants, agents
├── tests/           # Tests & future automated validation
├── tools/           # Workspace scripts hooks (if needed)
├── package.json     # Project metadata & scripts
└── README.md        # Documentation
\`\`\`

---

## 🚀 Getting Started

**Install dependencies**
\`\`\`bash
npm install
\`\`\`

**Run development**
\`\`\`bash
npm run dev
\`\`\`

**Run tests**
\`\`\`bash
npm test
\`\`\`

**Check workspace status**
\`\`\`bash
npm run workspace:status
\`\`\`

---

## 🔗 Integration
- \`mari-core\` — Base symbolic-emotional engine  
- \`aether-frontend\` — UI / interaction layer  
- Fully compatible with workspace commands: \`clone-all\`, \`install-all\`, \`build-all\`, \`test-all\`, \`dev-runner\`

---

## 📜 License
MIT License — See [LICENSE](LICENSE)
`,
  'workspace-snippet.json': `{
  "path": "C:/Users/Admin/Downloads/aether-core",
  "url": "https://github.com/Dreamscape-Core/aether-core.git",
  "dependsOn": ["mari-core"],
  "build": "npm run build",
  "test": "npm test",
  "dev": "npm run dev"
}`
};
