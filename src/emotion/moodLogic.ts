// moodLogic.ts – Determines mood based on weighted cues

import { Mood } from "./moodTypes"
import { moodWeights } from "./moodWeights"
import { normalizeWeights, getDominantMood } from "./emotionUtils"

export function evaluateMood(inputWeights: Partial<Record<Mood, number>>): Mood {
  const filled = { ...moodWeights, ...inputWeights } as Record<Mood, number>
  const normalized = normalizeWeights(filled)
  return getDominantMood(normalized)
}
