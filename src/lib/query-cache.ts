// Intelligent Query Caching System
// Caches processed NLP queries and AI responses for improved performance

export interface CacheEntry {
  key: string;
  value: any;
  timestamp: number;
  expiry: number;
  access_count: number;
  last_accessed: number;
  cache_metadata: CacheMetadata;
}

export interface CacheMetadata {
  query_complexity: number;
  processing_time: number;
  ai_model_used: string;
  cache_tier: 'hot' | 'warm' | 'cold';
  invalidation_triggers: string[];
}

export interface CacheStats {
  total_entries: number;
  hit_rate: number;
  miss_rate: number;
  average_access_time: number;
  cache_size_mb: number;
  eviction_count: number;
  most_accessed_queries: string[];
}

class QueryCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly MAX_CACHE_SIZE = 1000; // Maximum number of entries
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes
  private readonly HOT_CACHE_TTL = 60 * 60 * 1000; // 1 hour for frequently accessed
  private readonly COLD_CACHE_TTL = 10 * 60 * 1000; // 10 minutes for rarely accessed
  
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    total_access_time: 0,
    access_count: 0
  };

  constructor() {
    console.log('🗄️ Query Cache Manager initialized');
    this.startPeriodicCleanup();
  }

  async get(key: string): Promise<any | null> {
    const startTime = Date.now();
    
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.recordAccessTime(startTime);
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.stats.misses++;
      this.recordAccessTime(startTime);
      return null;
    }

    // Update access statistics
    entry.access_count++;
    entry.last_accessed = Date.now();
    
    // Promote frequently accessed items to hot cache
    if (entry.access_count > 5 && entry.cache_metadata.cache_tier !== 'hot') {
      entry.cache_metadata.cache_tier = 'hot';
      entry.expiry = Date.now() + this.HOT_CACHE_TTL;
    }

    this.stats.hits++;
    this.recordAccessTime(startTime);
    
    console.log('💾 Cache hit for key:', key.substring(0, 16) + '...');
    return entry.value;
  }

  async set(
    key: string, 
    value: any, 
    ttl: number = this.DEFAULT_TTL,
    metadata: Partial<CacheMetadata> = {}
  ): Promise<void> {
    // Evict entries if cache is full
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      await this.evictOldest();
    }

    const now = Date.now();
    const cacheTier = this.determineCacheTier(metadata);
    const actualTtl = this.adjustTtlByTier(ttl, cacheTier);

    const entry: CacheEntry = {
      key,
      value: this.deepClone(value), // Store a deep copy to prevent mutations
      timestamp: now,
      expiry: now + actualTtl,
      access_count: 0,
      last_accessed: now,
      cache_metadata: {
        query_complexity: metadata.query_complexity || 50,
        processing_time: metadata.processing_time || 0,
        ai_model_used: metadata.ai_model_used || 'unknown',
        cache_tier: cacheTier,
        invalidation_triggers: metadata.invalidation_triggers || []
      }
    };

    this.cache.set(key, entry);
    console.log(`💾 Cached entry with key: ${key.substring(0, 16)}... (TTL: ${actualTtl}ms)`);
  }

  async invalidate(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log('🗑️ Invalidated cache entry:', key.substring(0, 16) + '...');
    }
    return deleted;
  }

  async invalidateByPattern(pattern: string): Promise<number> {
    let deletedCount = 0;
    
    for (const [key, _] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`🗑️ Invalidated ${deletedCount} cache entries matching pattern: ${pattern}`);
    }

    return deletedCount;
  }

  async invalidateByTrigger(trigger: string): Promise<number> {
    let deletedCount = 0;
    
    for (const [key, entry] of this.cache) {
      if (entry.cache_metadata.invalidation_triggers.includes(trigger)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`🗑️ Invalidated ${deletedCount} cache entries with trigger: ${trigger}`);
    }

    return deletedCount;
  }

  async clear(): Promise<void> {
    const entryCount = this.cache.size;
    this.cache.clear();
    console.log(`🗑️ Cleared all ${entryCount} cache entries`);
  }

  async getStats(): Promise<CacheStats> {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hit_rate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;
    const miss_rate = 100 - hit_rate;
    
    // Calculate approximate cache size
    const estimatedSizeBytes = this.cache.size * 1024; // Rough estimate
    const cache_size_mb = estimatedSizeBytes / (1024 * 1024);

    // Get most accessed queries
    const sortedByAccess = Array.from(this.cache.values())
      .sort((a, b) => b.access_count - a.access_count)
      .slice(0, 5)
      .map(entry => entry.key.substring(0, 20) + '...');

    return {
      total_entries: this.cache.size,
      hit_rate: Math.round(hit_rate * 100) / 100,
      miss_rate: Math.round(miss_rate * 100) / 100,
      average_access_time: this.stats.access_count > 0 
        ? this.stats.total_access_time / this.stats.access_count 
        : 0,
      cache_size_mb: Math.round(cache_size_mb * 100) / 100,
      eviction_count: this.stats.evictions,
      most_accessed_queries: sortedByAccess
    };
  }

  async preload(queries: Array<{ key: string, value: any, metadata?: Partial<CacheMetadata> }>): Promise<void> {
    console.log(`🚀 Preloading ${queries.length} cache entries`);
    
    for (const query of queries) {
      await this.set(query.key, query.value, this.DEFAULT_TTL, query.metadata);
    }
  }

  async getEntriesByTier(tier: 'hot' | 'warm' | 'cold'): Promise<CacheEntry[]> {
    return Array.from(this.cache.values())
      .filter(entry => entry.cache_metadata.cache_tier === tier);
  }

  async promoteToHot(key: string): Promise<boolean> {
    const entry = this.cache.get(key);
    if (!entry) return false;

    entry.cache_metadata.cache_tier = 'hot';
    entry.expiry = Date.now() + this.HOT_CACHE_TTL;
    
    console.log(`🔥 Promoted cache entry to hot tier: ${key.substring(0, 16)}...`);
    return true;
  }

  async demoteToCold(key: string): Promise<boolean> {
    const entry = this.cache.get(key);
    if (!entry) return false;

    entry.cache_metadata.cache_tier = 'cold';
    entry.expiry = Math.min(entry.expiry, Date.now() + this.COLD_CACHE_TTL);
    
    console.log(`🧊 Demoted cache entry to cold tier: ${key.substring(0, 16)}...`);
    return true;
  }

  async warmup(popularQueries: string[]): Promise<void> {
    console.log(`🌡️ Warming up cache with ${popularQueries.length} popular queries`);
    
    // This would typically involve pre-computing and caching popular query results
    // For now, we'll mark these as high-priority for caching when they occur
    for (const query of popularQueries) {
      const key = this.generateCacheKey(query);
      // Mark these keys as high-priority (implementation would depend on your needs)
      console.log(`📝 Marked query for priority caching: ${query.substring(0, 30)}...`);
    }
  }

  private determineCacheTier(metadata: Partial<CacheMetadata>): 'hot' | 'warm' | 'cold' {
    const complexity = metadata.query_complexity || 50;
    const processingTime = metadata.processing_time || 0;
    
    // Complex queries that take longer to process should be cached longer
    if (complexity > 70 || processingTime > 2000) {
      return 'hot';
    } else if (complexity > 40 || processingTime > 1000) {
      return 'warm';
    } else {
      return 'cold';
    }
  }

  private adjustTtlByTier(baseTtl: number, tier: 'hot' | 'warm' | 'cold'): number {
    switch (tier) {
      case 'hot':
        return this.HOT_CACHE_TTL;
      case 'warm':
        return baseTtl;
      case 'cold':
        return this.COLD_CACHE_TTL;
      default:
        return baseTtl;
    }
  }

  private async evictOldest(): Promise<void> {
    if (this.cache.size === 0) return;

    // Find the oldest entry that's not in hot tier
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache) {
      if (entry.cache_metadata.cache_tier !== 'hot' && 
          entry.last_accessed < oldestTime) {
        oldestTime = entry.last_accessed;
        oldestKey = key;
      }
    }

    // If no non-hot entries, evict the oldest hot entry
    if (!oldestKey) {
      for (const [key, entry] of this.cache) {
        if (entry.last_accessed < oldestTime) {
          oldestTime = entry.last_accessed;
          oldestKey = key;
        }
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
      console.log('🗑️ Evicted oldest cache entry:', oldestKey.substring(0, 16) + '...');
    }
  }

  private recordAccessTime(startTime: number): void {
    const accessTime = Date.now() - startTime;
    this.stats.total_access_time += accessTime;
    this.stats.access_count++;
  }

  private deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    
    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  private generateCacheKey(query: string): string {
    // Simple cache key generation (you might want to make this more sophisticated)
    return Buffer.from(query).toString('base64').slice(0, 32);
  }

  private startPeriodicCleanup(): void {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 5 * 60 * 1000);

    // Optimize cache tiers every 15 minutes
    setInterval(() => {
      this.optimizeCacheTiers();
    }, 15 * 60 * 1000);
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let deletedCount = 0;

    for (const [key, entry] of this.cache) {
      if (now > entry.expiry) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`🧹 Cleaned up ${deletedCount} expired cache entries`);
    }
  }

  private optimizeCacheTiers(): void {
    const now = Date.now();
    let promotions = 0;
    let demotions = 0;

    for (const [key, entry] of this.cache) {
      const timeSinceAccess = now - entry.last_accessed;
      const accessFrequency = entry.access_count / Math.max(1, (now - entry.timestamp) / (60 * 60 * 1000)); // accesses per hour

      // Promote frequently accessed warm/cold entries to hot
      if (entry.cache_metadata.cache_tier !== 'hot' && 
          accessFrequency > 5 && 
          timeSinceAccess < 30 * 60 * 1000) { // Accessed in last 30 minutes
        entry.cache_metadata.cache_tier = 'hot';
        entry.expiry = now + this.HOT_CACHE_TTL;
        promotions++;
      }
      
      // Demote rarely accessed hot entries to warm
      else if (entry.cache_metadata.cache_tier === 'hot' && 
               accessFrequency < 1 && 
               timeSinceAccess > 60 * 60 * 1000) { // Not accessed in last hour
        entry.cache_metadata.cache_tier = 'warm';
        entry.expiry = Math.min(entry.expiry, now + this.DEFAULT_TTL);
        demotions++;
      }
      
      // Demote rarely accessed warm entries to cold
      else if (entry.cache_metadata.cache_tier === 'warm' && 
               accessFrequency < 0.5 && 
               timeSinceAccess > 2 * 60 * 60 * 1000) { // Not accessed in last 2 hours
        entry.cache_metadata.cache_tier = 'cold';
        entry.expiry = Math.min(entry.expiry, now + this.COLD_CACHE_TTL);
        demotions++;
      }
    }

    if (promotions > 0 || demotions > 0) {
      console.log(`🔄 Cache optimization: ${promotions} promotions, ${demotions} demotions`);
    }
  }

  // Method to export cache for backup/analysis
  async exportCache(): Promise<any> {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      value: entry.value,
      metadata: entry.cache_metadata,
      stats: {
        access_count: entry.access_count,
        last_accessed: entry.last_accessed,
        timestamp: entry.timestamp
      }
    }));

    return {
      entries,
      stats: await this.getStats(),
      export_timestamp: Date.now()
    };
  }

  // Method to import cache from backup
  async importCache(cacheData: any): Promise<number> {
    if (!cacheData.entries) return 0;

    let importedCount = 0;
    
    for (const entry of cacheData.entries) {
      await this.set(entry.key, entry.value, this.DEFAULT_TTL, entry.metadata);
      importedCount++;
    }

    console.log(`📥 Imported ${importedCount} cache entries`);
    return importedCount;
  }
}

export const queryCache = new QueryCacheManager();