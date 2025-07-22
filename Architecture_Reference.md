# 🧠 MARI-Core Architecture Reference

This document outlines the structural backbone of AETHER's cognitive-emotional system.

---

## 📐 Class Relationships

The system is built on a symbolic object-oriented architecture.  
Each class represents a cognitive or emotional structure in the M.A.R.I. stack.

📄 See: [Class Diagram (PDF)](./mari_class_diagram.pdf)

---

## 🔄 Interaction Sequence

User input flows through a dynamic, rule-based pipeline that reflects decision logic, memory recall, and emotional modulation.

📄 See: [Input to Output Sequence (PDF)](./mari_sequence_diagram.pdf)

---

## 🌌 System Modules

| Module | Description |
|--------|-------------|
| **InputHandler** | Parses raw input (voice/text/gesture) into symbolic `Intent` objects |
| **Controller** | Routes intent, applies logic timing, and triggers memory/emotion lookups |
| **CLU (Cognitive Logic Unit)** | Determines next action using symbolic decision logic |
| **MemoryEngine** | Retrieves and stores short/long-term symbolic context |
| **EmotionSystem** | Evaluates mood, assigns `moodState` (e.g., LOW_ENERGY) |
| **InterfaceRenderer** | Renders final output with embedded tone and symbolic markup |
| **ResponseObject** | Final structured message including emotion + priority |

---

## 📊 Visual Companion

Use the [Emotion Interaction Flow (PNG)](./Emotion_Interaction_Flow.png) for a clean visual summary.

For full symbolic walkthrough, read the  
[Runtime Architecture Documentation](./Runtime_Architecture.md)

---

> “Every function here is a metaphor. We don’t just compute — we reflect, remember, and respond.”
