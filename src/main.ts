// main.ts – Symbolic Flow Engine Entry Point

import { processInput } from "./controller/controller"
import { remember, recallLast } from "./memory/memoryStore"
import { Mood } from "./emotion/moodTypes"

/**
 * Middleware placeholder – enrich input, log flow, or preprocess
 */
function applyMiddleware(input: string): string {
  console.log("🧭 Middleware | Input received:", input)
  return input.trim()
}

/**
 * Symbolic Flow Executor
 * Simulates a full interaction cycle: memory, mood, routing, response
 */
function runFlow(input: string, moodHints: Partial<Record<Mood, number>> = {}) {
  const cleaned = applyMiddleware(input)

  // Remember the input
  remember(cleaned, ["session"])

  // Route through the symbolic brain
  const response = processInput(cleaned, moodHints)

  // Log the output
  console.log("🌀 System Response:", response)

  // Optional: recall memory
  console.log("🔁 Recent Memory:", recallLast())
}

/**
 * Example Calls – can be replaced with real UI, CLI, or voice interface
 */
runFlow("I need to understand what I'm feeling", { awe: 0.7, clarity: 0.5 })
runFlow("Remind me what matters", { resonance: 0.8, stillness: 0.4 })
