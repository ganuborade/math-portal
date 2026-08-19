/**
 * Ultra-Fast In-Memory Caching Engine for Math Portal API
 * Response Time Target: < 1ms for cached GET requests
 */

class MemoryCache {
  constructor() {
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Retrieve cached value if valid
   * @param {string} key 
   * @returns {any|null}
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      this.misses++;
      return null;
    }

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    return item.value;
  }

  /**
   * Set cached value with TTL in seconds
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlSeconds Default: 300 seconds (5 minutes)
   */
  set(key, value, ttlSeconds = 300) {
    const expiresAt = Date.now() + (ttlSeconds * 1000);
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Invalidate specific key or keys matching prefix/pattern
   * @param {string} pattern String or prefix
   */
  invalidate(pattern) {
    if (!pattern) return;
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Flush all cached items
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Return cache metrics
   */
  getStats() {
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRatio: this.hits + this.misses > 0 ? (this.hits / (this.hits + this.misses)).toFixed(2) : 0
    };
  }
}

export const apiCache = new MemoryCache();
