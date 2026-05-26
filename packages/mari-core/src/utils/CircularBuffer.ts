/**
 * CircularBuffer.ts – Fixed-size ring buffer for bounded memory
 * Prevents unbounded array growth while maintaining FIFO access patterns
 */

export class CircularBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private count: number = 0;
  private readonly capacity: number;

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error("Capacity must be positive");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  /**
   * Add an item to the buffer. If full, overwrites oldest item.
   */
  push(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;

    if (this.count < this.capacity) {
      this.count++;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
  }

  /**
   * Get the most recent item without removing it.
   */
  peek(): T | undefined {
    if (this.count === 0) return undefined;
    const lastIndex = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[lastIndex];
  }

  /**
   * Get all items in insertion order.
   */
  getAll(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      const item = this.buffer[index];
      if (item !== undefined) {
        result.push(item);
      }
    }
    return result;
  }

  /**
   * Get the last N items (most recent).
   */
  getLast(n: number): T[] {
    const limit = Math.min(n, this.count);
    const result: T[] = [];
    for (let i = 0; i < limit; i++) {
      const index = (this.tail - 1 - i + this.capacity * 2) % this.capacity;
      const item = this.buffer[index];
      if (item !== undefined) {
        result.unshift(item);
      }
    }
    return result;
  }

  /**
   * Get the number of items currently in the buffer.
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear the buffer.
   */
  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Check if buffer is empty.
   */
  isEmpty(): boolean {
    return this.count === 0;
  }
}
