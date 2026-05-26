// moodLogic.ts – Optimized mood evaluation with caching and O(n) max search

import { Mood } from "./moodTypes.js"
import { CircularBuffer } from "../utils/CircularBuffer.js"
import { Memoizer } from "../utils/Memoizer.js"

const DEFAULT_MOOD: Mood = "clarity"
const MAX_MOOD_HISTORY = 1000
const MOOD_MEMOIZER_TTL = 5000 // 5 second cache

interface MoodHistoryEntry {
  timestamp: number
  mood: Mood
  weights: Partial<Record<Mood, number>>
}

// Bounded history with circular buffer
const moodHistory = new CircularBuffer<MoodHistoryEntry>(MAX_MOOD_HISTORY)

// Memoizer for mood momentum calculations
const moodMemoizer = new Memoizer(MOOD_MEMOIZER_TTL)

/**
 * Find dominant mood using O(n) max search instead of O(n log n) sorting.
 * Much faster than sorting the entire array just to get the maximum.
 */
function findDominantMood(
  weights: Partial<Record<Mood, number>>
): Mood {
  const entries = Object.entries(weights) as [Mood, number][]
  if (entries.length === 0) return DEFAULT_MOOD

  // O(n) linear scan to find max (instead of O(n log n) sort)
  let max: [Mood, number] = entries[0]
  for (let i = 1; i < entries.length; i++) {
    if (entries[i][1] > max[1]) {
      max = entries[i]
    }
  }

  return max[0]
}

/**
 * Evaluates the dominant mood from weights with optional history logging.
 * Uses O(n) max search for efficiency.
 * @param weights - Partial mood score input.
 * @param logToMemory - Whether to store the evaluation in mood history.
 */
export function evaluateMood(
  weights: Partial<Record<Mood, number>>,
  logToMemory: boolean = true
): Mood {
  const dominantMood = findDominantMood(weights)

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
  const last = moodHistory.peek()
  return last ? last.mood : DEFAULT_MOOD
}

/**
 * Calculates mood momentum with memoization.
 * Whether the mood is intensifying, changing, or steady.
 * Caches result for 5 seconds to avoid recalculation.
 */
export function getMoodMomentum(): string {
  // Use memoization to cache expensive calculation
  return moodMemoizer.memoize(
    "getMoodMomentum",
    [], // No arguments for this calculation
    () => {
      const history = moodHistory.getLast(3)
      if (history.length < 2) return "insufficient data"

      const dominantMoods = history.map(entry => entry.mood)

      // Check if all moods are the same
      const allSame = dominantMoods.every(m => m === dominantMoods[0])
      if (allSame) return `steady (${dominantMoods[0]})`

      // Show the mood shift pattern
      const changed = [...new Set(dominantMoods)]
      return `shifting (${changed.join(" → ")})`
    }
  )
}

/**
 * Get mood history statistics.
 */
export function getMoodStats(): {
  totalRecorded: number
  maxCapacity: number
  currentMood: Mood
  recentMoods: Mood[]
} {
  const history = moodHistory.getAll()
  return {
    totalRecorded: history.length,
    maxCapacity: MAX_MOOD_HISTORY,
    currentMood: getLastMood(),
    recentMoods: history.slice(-10).map(h => h.mood)
  }
}

/**
 * Clears the stored mood memory (for reset or testing).
 */
export function clearMoodHistory(): void {
  moodHistory.clear()
  moodMemoizer.clear()
}
