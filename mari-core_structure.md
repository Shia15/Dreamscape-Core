# 🧠 MARI-Core File Structure Overview

> *Symbolic architecture and logic structure for the AETHER cognitive interface system.*

[📎 Back to Docs Index](./index.md)  
![✅ System Aligned · Up-to-date · Trusted](https://img.shields.io/badge/%E2%9C%85%20System-Aligned%20·%20Up--to--date%20·%20Trusted-brightgreen?style=flat-square)

```
mari-core/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── node.js.yml
│   └── pull_request_template.md
│
├── src/
│   ├── agents/             # Agent scripts (Mnēsis, Aletheia, etc.)
│   ├── memory/             # Memory recall modules
│   ├── emotion/            # Mood state logic and weighting
│   ├── controller/         # System flow orchestration
│   └── test/               # Simulation and routing tests
│
├── docs/
│   ├── index.md
│   ├── Agent_Mapping.md
│   ├── Architecture_Reference.md
│   ├── Runtime_Architecture.md
│   ├── Flow_Glossary.md
│   ├── Emotion_Interaction_Flow.png
│   ├── AETHER_Input_to_Output_Flow.pdf
│   ├── MARI_ClassDiagram.png
│   ├── MARI_ClassDiagram_source.dot
│   ├── MARI_FlowDiagram.png
│   ├── graphviz.svg
│   ├── intentRouter.ts
│   ├── quick_links.md
│   ├── mari-core_exhibit_index.md
│   └── mari-core_structure.md
│
├── snippets/
│   ├── snippets_symbolic_log_template.md
│   ├── snippets_commit_examples.md
│   ├── snippets_symbolic_badges.md
│   └── snippets_embed_templates.md
│
├── tools/push_scripts/
│   ├── push_mari_core.bat
│   ├── sync_status_mari_core.bat
│   └── tools_README.md
│
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── Founders_Harmony_Log.md
```

---

### 📁 Root

| File                                 | Description                           |
| ------------------------------------ | ------------------------------------- |
| `README.md`                          | Project overview and symbolic purpose |
| `LICENSE`                            | License for public use                |
| `package.json` / `package-lock.json` | Node.js project configuration         |
| `tsconfig.json`                      | TypeScript compiler settings          |
| `CONTRIBUTING.md`                    | Contributor instructions              |
| `Flow_Glossary.md`                   | Core symbolic definitions             |
| `Founders_Harmony_Log.md`            | Alignment history with vision         |
| `.gitignore`                         | Git tracking exclusions               |

---

### 📁 `.github/`

| Path                               | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| `.github/workflows/node.js.yml`    | CI for install/build/test/link-check |
| `.github/ISSUE_TEMPLATE/*.md`      | Templates for bugs/features          |
| `.github/pull_request_template.md` | PR template with symbolic log format |

---

### 📁 `docs/`

| File                              | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `index.md`                        | Entry point to documentation system     |
| `Architecture_Reference.md`       | Layer-by-layer system breakdown         |
| `Runtime_Architecture.md`         | Active runtime interaction map          |
| `AETHER_Input_to_Output_Flow.pdf` | Diagram of symbolic flow                |
| `MARI_ClassDiagram_source.dot`    | Graphviz source file                    |
| `graphviz.svg`                    | Rendered diagram                        |
| `intentRouter.ts`                 | Sample routing logic (educational/demo) |
| `quick_links.md`                  | Centralized docs/index list             |
| `mari-core_exhibit_index.md`      | Exhibited features (link or WIP)        |
| `mari-core_structure.md`          | This file — full symbolic file map      |

---

### 📁 `src/`

#### 🧠 Core Entry

| File      | Description                            |
| --------- | -------------------------------------- |
| `main.ts` | Root entry point for runtime execution |

#### 🔮 Agents

| File                 | Role                                |
| -------------------- | ----------------------------------- |
| `agents/Mnēsis.ts`   | Symbolic memory agent               |
| `agents/Aletheia.ts` | Truth-seeking/validation agent      |
| `agents/Inferaia.ts` | Inferential logic agent             |
| `agents/Reverie.ts`  | Imaginative resonance agent         |
| `AgentTypes.ts`      | Types/interfaces for agent behavior |
| `index.ts`           | Agent registry or export hub        |

#### 🎯 Controller

| File                         | Role                                   |
| ---------------------------- | -------------------------------------- |
| `controller/intentRouter.ts` | Routes intent to proper agent          |
| `controller/controller.ts`   | Possibly orchestrates multi-agent flow |

#### 💗 Emotion

| File                      | Role                                   |
| ------------------------- | -------------------------------------- |
| `emotion/moodLogic.ts`    | Determines dominant mood               |
| `emotion/moodWeights.ts`  | Mood weight constants                  |
| `emotion/moodTypes.ts`    | Enum/type definitions                  |
| `emotion/emotionUtils.ts` | Utility functions for emotion modeling |

#### 🧳 Memory

| File                    | Purpose                       |
| ----------------------- | ----------------------------- |
| `memory/memoryStore.ts` | Symbolic memory storage (WIP) |

---

### 📁 `src/test/`

| File         | Purpose                                |
| ------------ | -------------------------------------- |
| `flowSim.ts` | Simulated input flow for routing tests |

---

### 📁 `snippets/`

| File                                | Contents                             |
| ----------------------------------- | ------------------------------------ |
| `snippets_symbolic_log_template.md` | Markdown commit log style guide      |
| `snippets_commit_examples.md`       | Real examples of symbolic commits    |
| `snippets_symbolic_badges.md`       | Badges with meaning (UI + CI)        |
| `snippets_embed_templates.md`       | Copy-paste templates for README/docs |

---

### 📁 `tools/push_scripts/`

| File                        | Purpose                    |
| --------------------------- | -------------------------- |
| `push_mari_core.bat`        | Batch push automation      |
| `sync_status_mari_core.bat` | Git sync and status helper |
| `tools_README.md`           | Dev tool usage guide       |
