# 📁 MARI-Core Repository Structure

```
mari-core/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── node.js.yml
│   └── pull_request_template.md

├── src/
│   ├── agents/
│   │   ├── Mnēsis.ts
│   │   ├── Inferaia.ts
│   │   ├── Aletheia.ts
│   │   ├── Reverie.ts
│   │   ├── AgentTypes.ts
│   │   └── index.ts
│   ├── controller/
│   │   ├── controller.ts
│   │   └── intentRouter.ts
│   ├── emotion/
│   │   ├── moodLogic.ts
│   │   ├── moodWeights.ts
│   │   ├── moodTypes.ts
│   │   └── emotionUtils.ts
│   ├── memory/
│   │   └── memoryStore.ts
│   └── stateEvaluator.js

├── docs/
│   ├── index.md
│   ├── Agent_Mapping.md
│   ├── Architecture_Reference.md
│   ├── Runtime_Architecture.md
│   ├── Flow_Glossary.md
│   ├── Emotion_Interaction_Flow.png
│   ├── AETHER_Input_to_Output_Flow.pdf
│   ├── MARI_ClassDiagram.png
│   ├── MARI_FlowDiagram.png
│   └── mari-core_exhibit_index.md

├── snippets/
│   ├── snippets_symbolic_log_template.md
│   ├── snippets_commit_examples.md
│   └── snippets_symbolic_badges.md

├── tools/
│   └── push_scripts/
│       ├── push_mari_core.bat
│       ├── sync_status_mari_core.bat
│       └── tools_README.md

├── interface/                          # Symbolic interface frames (Figma-mirrored)
│   ├── Pages 00–26/
│   └── Shared Styles/

├── package.json
├── package-lock.json
├── tsconfig.json
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── .gitignore
```
