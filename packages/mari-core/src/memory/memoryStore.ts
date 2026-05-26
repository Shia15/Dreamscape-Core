// memoryStore.ts – Optimized symbolic recall engine with bounded cache

import { CircularBuffer } from "../utils/CircularBuffer.js"
import { KeywordIndex } from "../utils/KeywordIndex.js"

/**
 * MemoryEntry represents a single stored memory with metadata.
 */
type MemoryEntry = {
  id: string
  content: string
  contentLower: string // Pre-computed lowercase for search efficiency
  timestamp: Date
  timestampIso: string // Pre-computed ISO string to avoid repeated toLocaleString()
  tags?: string[]
  tagsLower?: string[] // Pre-computed lowercase tags
}

// Constants
const MAX_MEMORY_ENTRIES = 5000
const MEMORY_CLEANUP_INTERVAL = 300000 // 5 minutes

// Bounded memory with circular buffer (prevents unbounded growth)
const memoryBuffer = new CircularBuffer<MemoryEntry>(MAX_MEMORY_ENTRIES)

// Inverted index for fast tag/keyword lookups
const memoryIndex = new KeywordIndex<MemoryEntry>()

let entryCounter = 0
let lastCleanupTime = Date.now()

/**
 * Store a memory fragment into the bounded log.
 * Automatically evicts oldest entry if buffer is full.
 * @param content - The symbolic content to remember.
 * @param tags - Optional contextual tags for indexing.
 */
export function remember(content: string, tags?: string[]): string {
  // Cleanup expired entries periodically
  if (Date.now() - lastCleanupTime > MEMORY_CLEANUP_INTERVAL) {
    cleanup()
    lastCleanupTime = Date.now()
  }

  const now = new Date()
  const entry: MemoryEntry = {
    id: `mem_${++entryCounter}`,
    content,
    contentLower: content.toLowerCase(), // Pre-compute lowercase
    timestamp: now,
    timestampIso: now.toISOString(), // Use ISO string (faster than toLocaleString)
    tags,
    tagsLower: tags ? tags.map(t => t.toLowerCase()) : undefined
  }

  memoryBuffer.push(entry)
  if (tags && tags.length > 0) {
    memoryIndex.add(entry, tags)
  }

  return entry.id
}

/**
 * Retrieve the most recent memory fragment.
 */
export function recallLast(): string {
  const last = memoryBuffer.peek()
  return last
    ? `🧠 Mnēsis recalls: "${last.content}" [${last.timestampIso}]`
    : "⚠️ No memories available to recall."
}

/**
 * Search memories by keyword with O(1) tag lookup.
 * Much faster than O(n) linear filter.
 * @param query - A word or tag to search the memory log.
 */
export function searchMemory(query: string): string[] {
  if (!query || query.length === 0) return []

  const lower = query.toLowerCase()
  const results: string[] = []
  const seen = new Set<string>()

  // First, try index-based lookup by tag (O(1))
  const indexResults = memoryIndex.search(query)
  for (const entry of indexResults) {
    const key = entry.id
    if (!seen.has(key)) {
      results.push(`${entry.timestampIso} → ${entry.content}`)
      seen.add(key)
    }
  }

  // If no tag matches, do a targeted content search on recent entries only
  if (results.length === 0) {
    const recentEntries = memoryBuffer.getLast(100) // Only search last 100
    for (const entry of recentEntries) {
      if (entry.contentLower.includes(lower)) {
        const key = entry.id
        if (!seen.has(key)) {
          results.push(`${entry.timestampIso} → ${entry.content}`)
          seen.add(key)
        }
      }
    }
  }

  return results
}

/**
 * Search by multiple keywords (AND query).
 * All tags must match.
 */
export function searchMemoryAnd(keywords: string[]): string[] {
  const results = memoryIndex.searchAnd(keywords)
  return results.map(
    entry => `${entry.timestampIso} → ${entry.content}`
  )
}

/**
 * Search by multiple keywords (OR query).
 * Any tag can match.
 */
export function searchMemoryOr(keywords: string[]): string[] {
  const results = memoryIndex.searchOr(keywords)
  return results.map(
    entry => `${entry.timestampIso} → ${entry.content}`
  )
}

/**
 * Get all memories (returns recent entries for safety).
 */
export function getAllMemories(): MemoryEntry[] {
  return memoryBuffer.getAll()
}

/**
 * Get the most recent N memories.
 */
export function getRecentMemories(count: number): MemoryEntry[] {
  return memoryBuffer.getLast(count)
}

/**
 * Get memory statistics.
 */
export function getMemoryStats(): {
  totalStored: number
  maxCapacity: number
  percentUsed: number
} {
  const size = memoryBuffer.size()
  return {
    totalStored: size,
    maxCapacity: MAX_MEMORY_ENTRIES,
    percentUsed: (size / MAX_MEMORY_ENTRIES) * 100
  }
}

/**
 * Clear all memories (for testing or reset).
 */
export function clearMemory(): void {
  memoryBuffer.clear()
  memoryIndex.clear()
  entryCounter = 0
}

/**
 * Internal cleanup function.
 */
function cleanup(): void {
  // The CircularBuffer automatically handles eviction,
  // but this is a hook for future TTL-based cleanup if needed.
  // For now, just log statistics in debug mode.
  if (process.env.DEBUG) {
    const stats = getMemoryStats()
    console.debug(`🧠 Memory stats: ${stats.totalStored}/${stats.maxCapacity} entries`)
  }
}
