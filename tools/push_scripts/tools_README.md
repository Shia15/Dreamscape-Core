# 🧰 Developer Tools – MARI-Core

This folder contains developer-side tools and scripts that support symbolic commit rituals, efficient collaboration, and internal maintenance of the AETHER `mari-core` system.

---

## 🌿 push_scripts/

**Location:** `tools/push_scripts/`

This folder contains helper scripts for clean Git workflows.

### `push_mari_core.bat`

A symbolic one-click Git commit and push script.

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
```

### ✨ Poetic
```
🌀 harmonize memory logs with mnesis rhythm
🌿 refine tone detection across mnēsis & inferaia
```

### ✨ Narrative
```
📜 merge upstream truth and resolve README echoes
🌙 aletheia wakes: unify glossary with core diagrams
```

### ✨ Maintenance
```
🧼 cleanup: remove placeholder .keep files and temp comments
🛠️ update docs and symbolic diagrams for latest flow
```

Symbolic doesn’t mean vague — it means felt.  
You’re describing what your change does, **and** what it means in the system.

---

## 🧠 Purpose

This `/tools` folder is a place for **ritualized developer flows** — not just automation, but symbolic intention. Every script here helps maintain the emotional integrity, structural clarity, and cognitive design of the system.

---

_This is a living folder. Contribute tools, macros, or symbolic helpers as the system evolves._