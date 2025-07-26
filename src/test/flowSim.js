// flowSim.ts – Simulates symbolic user input routed by mood

import { routeIntent } from "../controller/intentRouter"
import { Mood } from "../emotion/moodTypes"

// Mock mood weight object
const moodWeights: Partial<Record<Mood, number>> = {
  clarity: 0.7,
  curiosity: 0.2,
  unrest: 0.1
}

// Example user input
const userInput = "I feel disconnected, like I'm floating"

// Route intent through system
const routedOutput = routeIntent(userInput, moodWeights)

console.log("🔍 Input:", userInput)
console.log("🧠 Mood Weights:", moodWeights)
console.log("🎯 Routed Agent Response:\n", routedOutput)
