// memoryStore.ts – Symbolic recall engine for Mnēsis and memory agents

/**
 * A symbolic memory system.
 * Stores fragments of input and allows Mnēsis or other agents to retrieve them contextually.
 */

type MemoryEntry = {
  id: string
  content: string
  timestamp: Date
  tags?: string[]
}

const memoryLog: MemoryEntry[] = []

/**
 * Store a memory fragment into the log.
 * @param content - The symbolic content to remember.
 * @param tags - Optional contextual tags.
 */
export function remember(content: string, tags?: string[]) {
  const entry: MemoryEntry = {
    id: `mem_${memoryLog.length + 1}`,
    content,
    timestamp: new Date(),
    tags
  }
  memoryLog.push(entry)
}

/**
 * Retrieve the most recent memory fragment.
 */
export function recallLast(): string {
  const last = memoryLog[memoryLog.length - 1]
  return last ? `🧠 Mnēsis recalls: "${last.content}"` : "⚠️ No memories available to recall."
}

/**
 * Search memories by tag or keyword.
 * @param query - A word or tag to search the memory log.
 */
export function searchMemory(query: string): string[] {
  const lower = query.toLowerCase()
  return memoryLog
    .filter(entry =>
      entry.content.toLowerCase().includes(lower) ||
      (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(lower)))
    )
    .map(entry => `${entry.timestamp.toLocaleString()} → ${entry.content}`)
}
