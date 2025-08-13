![Vercel](https://img.shields.io/badge/Deployed%20to-Vercel-black?style=flat&logo=vercel)
![Status](https://img.shields.io/badge/Build-Stable-28a745)
![License](https://img.shields.io/github/license/Dreamscape-Core/aether-frontend)
![Version](https://img.shields.io/badge/Version-v1.0.0-blue)

# 🌌 AETHER Frontend Interface

**AETHER** is a symbolic, emotionally intelligent interface designed to visualize the cognitive architecture of agents, moods, and intent-routing through transformational stages.

This frontend is built using **React**, **Vite**, **TailwindCSS**, and custom symbolic components including `Egg`, `ResonanceCore`, and `EnergyMeter`.

---

## 🚀 Project Status

🧠 **v1.0.0** – Interface rebirth  
✨ Restored from original Dreamscape architecture  
🔗 Symbolically aligned with [`mari-core`](https://github.com/Dreamscape-Core/mari-core)

---

## 🔧 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + PostCSS
- **Linting**: ESLint + `eslint.config.js`
- **Token Sync**: `sync-tokens.js` for symbolic styles
- **State Foundation**: Component-level control with room for mood/intent hooks

---

## 📁 Folder Structure

```bash
aether-frontend/
├── public/               # Static assets
├── scripts/              # Token sync and design hooks
├── src/
│   ├── assets/           # SVG, icons, images
│   ├── components/
│   │   ├── core/         # Symbolic engine components
│   │   │   ├── Egg.jsx
│   │   │   ├── EnergyMeter.jsx
│   │   │   └── ResonanceCore.jsx
│   │   ├── panels/       # Interface panel modules
│   │   └── scripts/      # Sync + transformation logic
│   ├── App.jsx           # Root interface
│   ├── main.jsx          # App mount point
│   └── index.css         # Tailwind base styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.cjs
├── .gitignore
└── README.md
```

---

## 🧪 Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/Dreamscape-Core/aether-frontend.git
cd aether-frontend

# 2. Install dependencies
npm install

# 3. Run the local dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔮 Vision & Symbolism

AETHER is not just an interface — it is a dynamic narrative space where agents route intent, moods guide flow, and transformation is made tangible.

The interface is built to express:

- **Symbolic states** of agents (Eggs, Energy, Resonance)
- **Emotion-informed routing** (mood mapping, intent fusion)
- **Visual metaphors** that reflect inner structure

---

## 📄 License

This project is licensed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

## 🧬 Coming Soon

- Agent state hooks
- Mood ↔ UI bindings
- Visual mood-map layers
- Vercel deployment
- MARI-Core runtime integration

---

## 🌠 Created by Dreamscape Core

> “Form follows feeling. Interface follows intent.”

---

---

## 📦 Vite + React Template (Archived Notes)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.