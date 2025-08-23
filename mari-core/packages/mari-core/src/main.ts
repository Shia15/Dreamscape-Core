// main.ts – Symbolic Flow Engine Entry Point

import { processInput } from "./controller/controller"
import { remember, recallLast } from "./memory/memoryStore"
import { Mood } from "./emotion/moodTypes"
import readline from "readline"

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
  console.log("🔁 Recent Memory:", recallLast())
  console.log("🕰️ Timestamp:", new Date().toLocaleString())
}

/**
 * Command Line Interface (CLI)
 * Allows live symbolic input via terminal
 */
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question("✨ Ask AETHER: ", (userInput) => {
  runFlow(userInput, { curiosity: 0.6, openness: 0.4 }) // Adjust mood hints as desired
  rl.close()
})
// Export for testing or further integration next