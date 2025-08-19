// flowSim.ts – Simulates symbolic user input routed by mood

import { evaluateMood } from "../emotion/moodLogic"
import { agentRegistry } from "../agents"
import { routeIntent } from "../controller/intentRouter"

// Mock mood weight object
const moodWeights = {
  REFLECTIVE: 0.7,
  INSIGHTFUL: 0.2,
  TRANSFORMATIVE: 0.1,
}

// Example user input
const userInput = "I feel disconnected, like I'm floating"

// Route intent through system
const routedOutput = routeIntent(userInput, moodWeights)

console.log("🔍 Input:", userInput)
console.log("🧠 Mood Weights:", moodWeights)
console.log("🎯 Routed Agent Response:\n", routedOutput)
