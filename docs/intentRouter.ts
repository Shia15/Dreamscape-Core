
// intentRouter.ts – Routes input based on dominant mood signal 🧭

import { evaluateMood } from "./moodLogic"                // ✅ file in same folder
import { agentRegistry } from "./agents"                  // ✅ folder in same level
import { Mood } from "./emotion/moodTypes"                // ✅ nested file in ./emotion

/**
 * Routes symbolic input to the correct agent using mood logic.
 * 
 * @param input - The user's symbolic or natural language input string.
 * @param moodWeights - A partial mood weight profile (e.g. { calm: 0.3, frustrated: 0.7 }).
 *                      Used to determine the dominant emotional context.
 * 
 * @returns Output of the matched agent’s execution, or a fallback message if no agent matches.
 */
export function routeIntent(input: string, moodWeights: Partial<Record<Mood, number>>): string {
  // 🧠 Evaluate dominant mood from emotional weight profile
  const dominantMood = evaluateMood(moodWeights)

  // 🎯 Match mood to corresponding Egg Agent
  const agent = agentRegistry[dominantMood]

  // 🪞 Debug hooks – internal symbolic state logging
  console.log("🧠 Dominant mood:", dominantMood)
  console.log("🎯 Routing to agent:", agent?.id || "none")

  // 🚪 Return routed agent response or fallback message
  return agent ? agent.execute(input) : `No agent found for mood: ${dominantMood}`
}
