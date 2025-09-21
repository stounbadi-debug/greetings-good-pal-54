// Cache Manager for Enhanced Performance
export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  key: string
}

export class CacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private maxSize = 200
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    // Clean old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      this.cleanup()
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      key
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    
    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  cleanup(): void {
    const now = Date.now()
    const expiredKeys: string[] = []
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key)
      }
    }

    expiredKeys.forEach(key => this.cache.delete(key))

    // If still too many entries, remove oldest ones
    if (this.cache.size >= this.maxSize) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)
      
      const toRemove = sortedEntries.slice(0, this.maxSize / 4)
      toRemove.forEach(([key]) => this.cache.delete(key))
    }
  }

  getStats(): {
    size: number
    maxSize: number
    entries: { key: string, age: number, ttl: number }[]
  } {
    const now = Date.now()
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: now - entry.timestamp,
        ttl: entry.ttl
      }))
    }
  }

  // Specialized cache methods for movie data
  cacheMovieRecommendations(query: string, result: any, ttl?: number): void {
    const key = `recommendations:${this.hashQuery(query)}`
    this.set(key, result, ttl)
  }

  getCachedRecommendations(query: string): any | null {
    const key = `recommendations:${this.hashQuery(query)}`
    return this.get(key)
  }

  cacheMoodRecommendations(mood: string, language: string, movies: any[]): void {
    const key = `mood:${mood}:${language}`
    this.set(key, movies, this.defaultTTL * 2) // Longer TTL for mood
  }

  getCachedMoodRecommendations(mood: string, language: string): any[] | null {
    const key = `mood:${mood}:${language}`
    return this.get(key)
  }

  cacheSimilarMovies(movieId: number, movies: any[]): void {
    const key = `similar:${movieId}`
    this.set(key, movies, this.defaultTTL * 3) // Longer TTL for similar movies
  }

  getCachedSimilarMovies(movieId: number): any[] | null {
    const key = `similar:${movieId}`
    return this.get(key)
  }

  private hashQuery(query: string): string {
    // Simple hash function for cache keys
    let hash = 0
    for (let i = 0; i < query.length; i++) {
      const char = query.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }
}

export const cacheManager = new CacheManager()