// moodLogic.ts – Advanced mood evaluation with memory and momentum tracking

import { Mood } from "./moodTypes"

const DEFAULT_MOOD: Mood = "neutral"

interface MoodHistoryEntry {
  timestamp: number
  mood: Mood
  weights: Partial<Record<Mood, number>>
}

let moodHistory: MoodHistoryEntry[] = []

/**
 * Evaluates the dominant mood from weights, and optionally logs memory.
 * @param weights - Partial mood score input.
 * @param logToMemory - Whether to store the evaluation in mood history.
 */
export function evaluateMood(
  weights: Partial<Record<Mood, number>>,
  logToMemory: boolean = true
): Mood {
  const entries = Object.entries(weights) as [Mood, number][]
  if (entries.length === 0) return DEFAULT_MOOD

  entries.sort((a, b) => b[1] - a[1])
  const dominantMood = entries[0][0]

  if (logToMemory) {
    moodHistory.push({
      timestamp: Date.now(),
      mood: dominantMood,
      weights
    })
  }

  return dominantMood
}

/**
 * Retrieves the last dominant mood in memory.
 */
export function getLastMood(): Mood {
  if (moodHistory.length === 0) return DEFAULT_MOOD
  return moodHistory[moodHistory.length - 1].mood
}

/**
 * Calculates mood momentum — whether the mood is intensifying, changing, or steady.
 * Looks at the last 3 entries.
 */
export function getMoodMomentum(): string {
  if (moodHistory.length < 2) return "insufficient data"

  const recent = moodHistory.slice(-3)
  const dominantMoods = recent.map(entry => entry.mood)

  const allSame = dominantMoods.every(m => m === dominantMoods[0])
  if (allSame) return `steady (${dominantMoods[0]})`

  const changed = [...new Set(dominantMoods)]
  return `shifting (${changed.join(" → ")})`
}

/**
 * Clears the stored mood memory (for reset or testing).
 */
export function clearMoodHistory(): void {
  moodHistory = []
}
