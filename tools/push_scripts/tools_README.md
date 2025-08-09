## 🧰 Developer Tools – MARI-Core

This folder contains developer-side tools and scripts that support symbolic commit rituals, efficient collaboration, and internal maintenance of the AETHER `mari-core` system.

---

## 🌐 Multi-Repository Workspace Tools

**Location:** `tools/workspace/`

Complete multi-repository management for the entire AETHER ecosystem. See [`tools/workspace/README.md`](../workspace/README.md) for detailed documentation.

**Quick Start:**
```bash
# Setup entire AETHER workspace
npm run aether:setup

# Check workspace health
npm run aether:health

# Build all projects
npm run aether:build
```

---

## 🌿 push_scripts/

**Location:** `tools/push_scripts/`

This folder contains helper scripts for clean Git workflows.

### `push_mari_core.bat`

A symbolic one-click Git commit and push script for Windows.

**What it does:**
- Prompts you to enter a symbolic commit message (supports emoji, poetic labels)
- Stages all changes (`git add .`)
- Commits with the entered message
- Pushes to the `main` branch

**Usage:**

1. Double-click from File Explorer *or* run in PowerShell:
   ```bash
   push_mari_core.bat
   ```

2. Example message:
   ```
   🌿 refine tone detection across mnēsis & inferaia
   ```

### `push_mari_core_enhanced.sh`

Enhanced cross-platform version with workspace awareness.

**Features:**
- Shows workspace status before committing
- Validates commit message
- Provides next-step suggestions
- Works on Linux/macOS

**Usage:**
```bash
./tools/push_scripts/push_mari_core_enhanced.sh
```

---

## 🧠 What to Enter When Prompted

When prompted with:

```
Enter symbolic commit message:
```

You can type any meaningful description of your update. Examples:

### ✨ Structural
```
🔧 add mood logic routing and moodLayerRef to src/
📦 restructure emotion agents into symbolic core
🌐 implement multi-repository workspace coordination
```

### ✨ Poetic
```
🌀 harmonize memory logs with mnesis rhythm
🌿 refine tone detection across mnēsis & inferaia
🌊 weave repositories into unified AETHER symphony
```

### ✨ Narrative
```
📜 merge upstream truth and resolve README echoes
🌙 aletheia wakes: unify glossary with core diagrams
🧠 birth the multi-repo consciousness layer
```

### ✨ Maintenance
```
🧼 cleanup: remove placeholder .keep files and temp comments
🛠️ update docs and symbolic diagrams for latest flow
⚙️ orchestrate workspace tools for seamless dev flow
```

Symbolic doesn’t mean vague — it means felt.  
You’re describing what your change does, **and** what it means in the system.

---

## 🧠 Purpose

This `/tools` folder is a place for **ritualized developer flows** — not just automation, but symbolic intention. Every script here helps maintain the emotional integrity, structural clarity, and cognitive design of the system.

The workspace tools enable **collective consciousness** across the AETHER repositories — where each component maintains its autonomy while participating in the greater cognitive symphony.

---

_This is a living folder. Contribute tools, macros, or symbolic helpers as the system evolves._