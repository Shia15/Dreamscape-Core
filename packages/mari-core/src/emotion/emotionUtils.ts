
import { Mood } from "./moodTypes"
import { moodWeights } from "./moodWeights"

export function normalizeWeights(weights: Record<Mood, number>): Record<Mood, number> {
  const total = Object.values(weights).reduce((sum, val) => sum + val, 0)
  const normalized: Record<Mood, number> = {} as any
  for (const mood in weights) {
    normalized[mood as Mood] = weights[mood as Mood] / total
  }
  return normalized
}

export function getDominantMood(weights: Record<Mood, number>): Mood {
  let max: number = -Infinity
  let dominant: Mood = "clarity"
  for (const mood in weights) {
    if (weights[mood as Mood] > max) {
      max = weights[mood as Mood]
      dominant = mood as Mood
    }
  }
  return dominant

}
