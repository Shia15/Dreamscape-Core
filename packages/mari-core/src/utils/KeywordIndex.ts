/**
 * KeywordIndex.ts – Inverted index for fast keyword/tag searches
 * Provides O(1) lookup instead of O(n) linear filters
 */

export class KeywordIndex<T> {
  private index: Map<string, Set<T>> = new Map();
  private documentCache: Map<T, Set<string>> = new Map();

  /**
   * Add a document with associated keywords/tags.
   */
  add(document: T, keywords: string[]): void {
    const normalizedKeywords = keywords.map(k => k.toLowerCase());
    const existing = this.documentCache.get(document) || new Set();
    const newKeywords = new Set([...existing, ...normalizedKeywords]);

    // Update reverse index (keyword -> documents)
    for (const keyword of newKeywords) {
      const docs = this.index.get(keyword) || new Set();
      docs.add(document);
      this.index.set(keyword, docs);
    }

    this.documentCache.set(document, newKeywords);
  }

  /**
   * Search for documents by keyword.
   * Returns all documents tagged with the keyword.
   */
  search(keyword: string): T[] {
    const normalized = keyword.toLowerCase();
    const docs = this.index.get(normalized);
    return docs ? Array.from(docs) : [];
  }

  /**
   * Search for documents matching ANY of the given keywords (OR query).
   */
  searchOr(keywords: string[]): T[] {
    const results = new Set<T>();
    for (const keyword of keywords) {
      const normalized = keyword.toLowerCase();
      const docs = this.index.get(normalized);
      if (docs) {
        docs.forEach(doc => results.add(doc));
      }
    }
    return Array.from(results);
  }

  /**
   * Search for documents matching ALL of the given keywords (AND query).
   */
  searchAnd(keywords: string[]): T[] {
    if (keywords.length === 0) return [];

    const normalized = keywords.map(k => k.toLowerCase());
    const firstSet = this.index.get(normalized[0]);
    if (!firstSet) return [];

    const results = new Set(firstSet);
    for (let i = 1; i < normalized.length; i++) {
      const docSet = this.index.get(normalized[i]);
      if (!docSet) return [];

      for (const doc of results) {
        if (!docSet.has(doc)) {
          results.delete(doc);
        }
      }
    }
    return Array.from(results);
  }

  /**
   * Remove a document from the index.
   */
  remove(document: T): void {
    const keywords = this.documentCache.get(document);
    if (keywords) {
      for (const keyword of keywords) {
        const docs = this.index.get(keyword);
        if (docs) {
          docs.delete(document);
          if (docs.size === 0) {
            this.index.delete(keyword);
          }
        }
      }
    }
    this.documentCache.delete(document);
  }

  /**
   * Clear all indexed data.
   */
  clear(): void {
    this.index.clear();
    this.documentCache.clear();
  }
}
