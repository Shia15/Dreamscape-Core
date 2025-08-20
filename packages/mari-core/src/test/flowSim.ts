// flowSim.ts – Simulates symbolic user input routed by mood

import { evaluateMood } from "../emotion/moodLogic.js"
import { agentRegistry } from "../agents/index.js"
import { routeIntent } from "../controller/intentRouter.js"

// Mock mood weight object
const moodWeights = {
  clarity: 0.5,
  resonance: 0.3,
  curiosity: 0.2,
}

// Example user input
const userInput = "I feel disconnected, like I'm floating"

// Route intent through system
const routedOutput = routeIntent(userInput, moodWeights)

console.log("🔍 Input:", userInput)
console.log("🧠 Mood Weights:", moodWeights)
console.log("🎯 Routed Agent Response:\n", routedOutput)
