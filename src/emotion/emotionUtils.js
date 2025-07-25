// emotionUtils.ts — Utilities for processing symbolic emotion weights

export interface MoodWeights {
  [mood: string]: number
}

/**
 * Normalize mood weights so they sum to 1.0
 */
export function normalizeWeights(weights: MoodWeights): MoodWeights {
  const total = Object.values(weights).reduce((sum, val) => sum + val, 0)
  const normalized: MoodWeights = {}

  for (const mood in weights) {
    normalized[mood] = weights[mood] / total
  }

  return normalized
}

/**
 * Get the dominant mood based on the highest weighted value
 */
export function getDominantMood(weights: MoodWeights): string {
  let max = -Infinity
  let dominant = ""

  for (const mood in weights) {
    if (weights[mood] > max) {
      max = weights[mood]
      dominant = mood
    }
  }

  return dominant
}
