/**
 * Memoizer.ts – Simple memoization decorator for expensive computations
 * Caches function results with TTL (time-to-live) support
 */

export class Memoizer {
  private cache: Map<string, { value: any; timestamp: number }> = new Map();
  private readonly ttl: number; // milliseconds

  constructor(ttlMs: number = 60000) {
    this.ttl = ttlMs;
  }

  /**
   * Generate cache key from function name and arguments.
   */
  private getKey(funcName: string, args: any[]): string {
    return `${funcName}:${JSON.stringify(args)}`;
  }

  /**
   * Check if cache entry is still valid (not expired).
   */
  private isValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.ttl;
  }

  /**
   * Memoize a function call. Returns cached result if valid.
   */
  memoize<T>(
    funcName: string,
    args: any[],
    compute: () => T
  ): T {
    const key = this.getKey(funcName, args);
    const cached = this.cache.get(key);

    if (cached && this.isValid(cached.timestamp)) {
      return cached.value as T;
    }

    const result = compute();
    this.cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  }

  /**
   * Invalidate a specific cache entry.
   */
  invalidate(funcName: string, args: any[]): void {
    const key = this.getKey(funcName, args);
    this.cache.delete(key);
  }

  /**
   * Clear all cached entries.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Cleanup expired entries (garbage collection).
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
