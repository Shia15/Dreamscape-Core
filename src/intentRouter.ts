// intentRouter.ts – Routes based on dominant mood

import { evaluateMood } from "../emotion/moodLogic"
import { agentRegistry } from "../agents"
import { Mood } from "../emotion/moodTypes"

export function routeIntent(input: string, moodWeights: Partial<Record<Mood, number>>): string {
  const dominantMood = evaluateMood(moodWeights)
  const agent = agentRegistry[dominantMood]

  console.log("🧠 Dominant mood:", dominantMood)
  console.log("🎯 Routing to:", agent?.id || "none")

  if (!agent) {
    return `⚠️ No agent found for mood: ${dominantMood}`
  }

  return agent.execute(input)
}