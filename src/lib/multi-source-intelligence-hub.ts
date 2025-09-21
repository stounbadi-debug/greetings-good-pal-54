// Multi-Source Intelligence Hub - Core Orchestration System
// Positions Lunim as the leader in global entertainment discovery

import { Movie } from './tmdb';
import { tmdbService } from './tmdb';
import { webSearchService } from './web-search-service';
import { geminiAI } from './gemini-ai';

export interface ContentSource {
  id: string;
  name: string;
  type: 'api' | 'scraper' | 'hybrid';
  endpoint?: string;
  healthStatus: 'active' | 'degraded' | 'inactive';
  lastHealthCheck: number;
  responseTime: number;
  reliability: number; // 0-100
  costPerRequest: number;
  dailyLimit: number;
  dailyUsage: number;
  priority: number; // 1-10, higher = more priority
  capabilities: string[];
  regions: string[];
}

export interface EnhancedMovie extends Movie {
  sources: string[];
  confidence: number;
  culturalRelevance: number;
  trendingScore: number;
  criticalConsensus?: {
    rottenTomatoes?: number;
    imdb?: number;
    letterboxd?: number;
    metacritic?: number;
  };
  streamingAvailability?: {
    [region: string]: {
      providers: string[];
      lastUpdated: number;
    };
  };
  theaterShowtimes?: {
    [region: string]: {
      theaters: Array<{
        name: string;
        showtimes: string[];
      }>;
    };
  };
  socialMetrics?: {
    letterboxdWatched: number;
    letterboxdLiked: number;
    twitterMentions: number;
    trendingRank?: number;
  };
}

export interface SearchRequest {
  query: string;
  filters?: {
    genres?: string[];
    yearRange?: [number, number];
    rating?: [number, number];
    region?: string;
    language?: string;
    contentType?: 'movie' | 'tv' | 'both';
  };
  userContext?: {
    location?: string;
    preferences?: any;
    previousSearches?: string[];
  };
  strategy?: 'comprehensive' | 'fast' | 'premium' | 'cost_optimized';
}

export interface SearchResult {
  movies: EnhancedMovie[];
  metadata: {
    totalResults: number;
    sourcesUsed: string[];
    searchTime: number;
    confidence: number;
    strategy: string;
    costIncurred: number;
  };
  analytics: {
    sourcePerformance: { [sourceId: string]: number };
    cacheHitRate: number;
    failoverEvents: number;
  };
}

class MultiSourceIntelligenceHub {
  private sources: Map<string, ContentSource> = new Map();
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private analytics: {
    totalRequests: number;
    sourceUsage: { [sourceId: string]: number };
    averageResponseTime: number;
    cacheHitRate: number;
    failoverEvents: number;
  } = {
    totalRequests: 0,
    sourceUsage: {},
    averageResponseTime: 0,
    cacheHitRate: 0,
    failoverEvents: 0
  };

  constructor() {
    this.initializeSources();
    this.startHealthMonitoring();
  }

  private initializeSources(): void {
    // Primary Sources - High Priority, High Reliability
    this.sources.set('tmdb', {
      id: 'tmdb',
      name: 'The Movie Database',
      type: 'api',
      endpoint: 'https://api.themoviedb.org/3',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 150,
      reliability: 98,
      costPerRequest: 0,
      dailyLimit: 40000,
      dailyUsage: 0,
      priority: 10,
      capabilities: ['search', 'details', 'trending', 'popular', 'discover'],
      regions: ['global']
    });

    this.sources.set('imdb_scraper', {
      id: 'imdb_scraper',
      name: 'IMDb Web Scraper',
      type: 'scraper',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 800,
      reliability: 85,
      costPerRequest: 0.001,
      dailyLimit: 1000,
      dailyUsage: 0,
      priority: 8,
      capabilities: ['rare_content', 'detailed_cast', 'ratings'],
      regions: ['global']
    });

    this.sources.set('letterboxd_api', {
      id: 'letterboxd_api',
      name: 'Letterboxd Community Data',
      type: 'api',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 400,
      reliability: 90,
      costPerRequest: 0.002,
      dailyLimit: 5000,
      dailyUsage: 0,
      priority: 7,
      capabilities: ['social_metrics', 'cinephile_ratings', 'lists'],
      regions: ['global']
    });

    this.sources.set('justwatch_api', {
      id: 'justwatch_api',
      name: 'JustWatch Streaming Data',
      type: 'api',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 300,
      reliability: 92,
      costPerRequest: 0.005,
      dailyLimit: 2000,
      dailyUsage: 0,
      priority: 9,
      capabilities: ['streaming_availability', 'pricing', 'regional_content'],
      regions: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'jp']
    });

    this.sources.set('rotten_tomatoes', {
      id: 'rotten_tomatoes',
      name: 'Rotten Tomatoes Scraper',
      type: 'scraper',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 600,
      reliability: 80,
      costPerRequest: 0.003,
      dailyLimit: 500,
      dailyUsage: 0,
      priority: 6,
      capabilities: ['critic_scores', 'audience_scores', 'consensus'],
      regions: ['us', 'uk', 'ca']
    });

    this.sources.set('fandango_api', {
      id: 'fandango_api',
      name: 'Fandango Theater Data',
      type: 'api',
      healthStatus: 'active',
      lastHealthCheck: Date.now(),
      responseTime: 250,
      reliability: 88,
      costPerRequest: 0.01,
      dailyLimit: 1000,
      dailyUsage: 0,
      priority: 5,
      capabilities: ['showtimes', 'theater_locations', 'ticket_pricing'],
      regions: ['us']
    });
  }

  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, 60000); // Check every minute
  }

  private async performHealthChecks(): Promise<void> {
    const healthPromises = Array.from(this.sources.keys()).map(async (sourceId) => {
      const source = this.sources.get(sourceId)!;
      const startTime = Date.now();
      
      try {
        const isHealthy = await this.checkSourceHealth(sourceId);
        const responseTime = Date.now() - startTime;
        
        source.healthStatus = isHealthy ? 'active' : 'degraded';
        source.responseTime = responseTime;
        source.lastHealthCheck = Date.now();
        
        // Update reliability based on recent performance
        if (isHealthy) {
          source.reliability = Math.min(100, source.reliability + 1);
        } else {
          source.reliability = Math.max(0, source.reliability - 5);
        }
        
        this.sources.set(sourceId, source);
      } catch (error) {
        source.healthStatus = 'inactive';
        source.reliability = Math.max(0, source.reliability - 10);
        source.lastHealthCheck = Date.now();
        this.sources.set(sourceId, source);
      }
    });
    
    await Promise.allSettled(healthPromises);
  }

  private async checkSourceHealth(sourceId: string): Promise<boolean> {
    switch (sourceId) {
      case 'tmdb':
        try {
          const result = await tmdbService.getPopularMovies(1);
          return result.results.length > 0;
        } catch {
          return false;
        }
      
      case 'imdb_scraper':
        try {
          const result = await webSearchService.searchMovies('test', 'health_check');
          return result.length >= 0; // Even empty results indicate service is responding
        } catch {
          return false;
        }
      
      default:
        // For other sources, simulate health check
        return Math.random() > 0.1; // 90% uptime simulation
    }
  }

  async intelligentSearch(request: SearchRequest): Promise<SearchResult> {
    const startTime = Date.now();
    this.analytics.totalRequests++;
    
    // Determine optimal search strategy
    const strategy = this.determineSearchStrategy(request);
    
    // Get prioritized sources based on strategy and health
    const availableSources = this.getPrioritizedSources(strategy, request.userContext?.location);
    
    // Execute parallel searches with intelligent orchestration
    const searchResults = await this.executeParallelSearch(request, availableSources, strategy);
    
    // Apply advanced data fusion algorithm
    const fusedResults = await this.advancedDataFusion(searchResults, request);
    
    // Calculate metadata and analytics
    const searchTime = Date.now() - startTime;
    const sourcesUsed = Object.keys(searchResults).filter(sourceId => searchResults[sourceId].length > 0);
    
    // Update analytics
    sourcesUsed.forEach(sourceId => {
      this.analytics.sourceUsage[sourceId] = (this.analytics.sourceUsage[sourceId] || 0) + 1;
    });
    
    return {
      movies: fusedResults,
      metadata: {
        totalResults: fusedResults.length,
        sourcesUsed,
        searchTime,
        confidence: this.calculateOverallConfidence(fusedResults),
        strategy: strategy,
        costIncurred: this.calculateCostIncurred(sourcesUsed)
      },
      analytics: {
        sourcePerformance: this.getSourcePerformanceMetrics(),
        cacheHitRate: this.analytics.cacheHitRate,
        failoverEvents: this.analytics.failoverEvents
      }
    };
  }

  private determineSearchStrategy(request: SearchRequest): string {
    if (request.strategy) return request.strategy;
    
    // Intelligent strategy determination based on context
    if (request.userContext?.location && request.filters?.contentType === 'movie') {
      return 'comprehensive'; // Need theater and streaming data
    }
    
    if (request.query.length > 50 || request.filters?.genres?.length) {
      return 'premium'; // Complex query needs AI analysis
    }
    
    return 'fast'; // Simple queries can use cached or primary sources
  }

  private getPrioritizedSources(strategy: string, userLocation?: string): ContentSource[] {
    const activeSources = Array.from(this.sources.values())
      .filter(source => source.healthStatus !== 'inactive')
      .filter(source => source.dailyUsage < source.dailyLimit);
    
    // Filter by regional capability if needed
    if (userLocation) {
      return activeSources.filter(source => 
        source.regions.includes('global') || source.regions.includes(userLocation)
      ).sort((a, b) => {
        // Sort by priority * reliability * inverse response time
        const scoreA = (a.priority * a.reliability) / (a.responseTime + 1);
        const scoreB = (b.priority * b.reliability) / (b.responseTime + 1);
        return scoreB - scoreA;
      });
    }
    
    return activeSources.sort((a, b) => b.priority - a.priority);
  }

  private async executeParallelSearch(
    request: SearchRequest,
    sources: ContentSource[],
    strategy: string
  ): Promise<{ [sourceId: string]: EnhancedMovie[] }> {
    const searchPromises: { [sourceId: string]: Promise<EnhancedMovie[]> } = {};
    const results: { [sourceId: string]: EnhancedMovie[] } = {};
    
    // Primary search with TMDB (always included)
    if (sources.find(s => s.id === 'tmdb')) {
      searchPromises.tmdb = this.searchTMDB(request);
    }
    
    // Secondary searches based on strategy
    if (strategy === 'comprehensive' || strategy === 'premium') {
      if (sources.find(s => s.id === 'imdb_scraper')) {
        searchPromises.imdb_scraper = this.searchIMDB(request);
      }
      
      if (sources.find(s => s.id === 'letterboxd_api')) {
        searchPromises.letterboxd_api = this.searchLetterboxd(request);
      }
    }
    
    // Streaming data for location-based searches
    if (request.userContext?.location && sources.find(s => s.id === 'justwatch_api')) {
      searchPromises.justwatch_api = this.searchJustWatch(request);
    }
    
    // Execute all searches with timeout and error handling
    const searchResults = await Promise.allSettled(
      Object.entries(searchPromises).map(async ([sourceId, promise]) => {
        try {
          const result = await Promise.race([
            promise,
            new Promise<EnhancedMovie[]>((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 5000)
            )
          ]);
          
          // Update usage
          const source = this.sources.get(sourceId);
          if (source) {
            source.dailyUsage++;
            this.sources.set(sourceId, source);
          }
          
          return { sourceId, result };
        } catch (error) {
          console.warn(`Search failed for ${sourceId}:`, error);
          this.analytics.failoverEvents++;
          return { sourceId, result: [] };
        }
      })
    );
    
    // Collect results
    searchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        results[result.value.sourceId] = result.value.result;
      }
    });
    
    return results;
  }

  private async advancedDataFusion(
    searchResults: { [sourceId: string]: EnhancedMovie[] },
    request: SearchRequest
  ): Promise<EnhancedMovie[]> {
    const allMovies: EnhancedMovie[] = [];
    const movieMap = new Map<number, EnhancedMovie>();
    
    // Collect all unique movies with source tracking
    Object.entries(searchResults).forEach(([sourceId, movies]) => {
      movies.forEach(movie => {
        const enhancedMovie: EnhancedMovie = {
          ...movie,
          sources: [sourceId],
          confidence: this.calculateSourceConfidence(sourceId, movie),
          culturalRelevance: this.calculateCulturalRelevance(movie, request.userContext?.location),
          trendingScore: this.calculateTrendingScore(movie)
        };
        
        if (movieMap.has(movie.id)) {
          // Merge data from multiple sources
          const existing = movieMap.get(movie.id)!;
          existing.sources.push(sourceId);
          existing.confidence = Math.max(existing.confidence, enhancedMovie.confidence);
          existing.culturalRelevance = Math.max(existing.culturalRelevance, enhancedMovie.culturalRelevance);
          movieMap.set(movie.id, existing);
        } else {
          movieMap.set(movie.id, enhancedMovie);
        }
      });
    });
    
    // Apply multi-dimensional ranking
    const rankedMovies = Array.from(movieMap.values()).sort((a, b) => {
      const scoreA = this.calculateFusionScore(a, request);
      const scoreB = this.calculateFusionScore(b, request);
      return scoreB - scoreA;
    });
    
    return rankedMovies.slice(0, 20); // Return top 20 results
  }

  private calculateFusionScore(movie: EnhancedMovie, request: SearchRequest): number {
    // Multi-dimensional scoring algorithm
    const popularity = (movie.popularity || 0) * 0.3;
    const rating = (movie.vote_average || 0) * 0.25;
    const confidence = movie.confidence * 0.2;
    const cultural = movie.culturalRelevance * 0.15;
    const trending = movie.trendingScore * 0.1;
    
    // Bonus for multiple sources (data reliability)
    const sourceBonus = Math.min(movie.sources.length * 5, 20);
    
    // Temporal weighting (favor recent releases slightly)
    const currentYear = new Date().getFullYear();
    const releaseYear = parseInt(movie.release_date?.slice(0, 4) || '0');
    const recencyBonus = Math.max(0, 5 - (currentYear - releaseYear) * 0.5);
    
    return popularity + rating + confidence + cultural + trending + sourceBonus + recencyBonus;
  }

  private calculateSourceConfidence(sourceId: string, movie: Movie): number {
    const source = this.sources.get(sourceId);
    if (!source) return 50;
    
    return Math.min(100, source.reliability * 0.8 + (movie.vote_count > 100 ? 20 : 10));
  }

  private calculateCulturalRelevance(movie: Movie, userLocation?: string): number {
    // Base relevance on language and popularity
    let relevance = 50;
    
    if (movie.original_language === 'en') relevance += 20;
    if (movie.vote_count > 1000) relevance += 15;
    if (movie.popularity > 50) relevance += 15;
    
    // Regional adjustments would go here
    if (userLocation) {
      // Simulate regional preference adjustments
      relevance += Math.random() * 10;
    }
    
    return Math.min(100, relevance);
  }

  private calculateTrendingScore(movie: Movie): number {
    // Simulate trending calculation based on popularity and recency
    const currentYear = new Date().getFullYear();
    const releaseYear = parseInt(movie.release_date?.slice(0, 4) || '0');
    
    if (currentYear - releaseYear <= 1) return 90; // Very recent
    if (currentYear - releaseYear <= 3) return 70; // Recent
    if (movie.popularity > 80) return 60; // Popular classics
    
    return 30; // Standard
  }

  private async searchTMDB(request: SearchRequest): Promise<EnhancedMovie[]> {
    try {
      const result = await tmdbService.searchMovies(request.query);
      return result.results.map(movie => ({
        ...movie,
        sources: ['tmdb'],
        confidence: 85,
        culturalRelevance: 75,
        trendingScore: 50
      }));
    } catch (error) {
      console.error('TMDB search failed:', error);
      return [];
    }
  }

  private async searchIMDB(request: SearchRequest): Promise<EnhancedMovie[]> {
    try {
      const results = await webSearchService.searchMovies(request.query);
      return results.map(result => ({
        id: Math.floor(Math.random() * 1000000), // Temporary ID
        title: result.title,
        overview: result.plot || '',
        poster_path: null,
        backdrop_path: null,
        release_date: result.year ? `${result.year}-01-01` : '',
        vote_average: result.rating || 0,
        vote_count: 100,
        genre_ids: [],
        adult: false,
        original_language: 'en',
        popularity: result.confidence * 100,
        sources: ['imdb_scraper'],
        confidence: result.confidence * 100,
        culturalRelevance: 70,
        trendingScore: 40
      }));
    } catch (error) {
      console.error('IMDb search failed:', error);
      return [];
    }
  }

  private async searchLetterboxd(request: SearchRequest): Promise<EnhancedMovie[]> {
    // Simulate Letterboxd API integration
    return [];
  }

  private async searchJustWatch(request: SearchRequest): Promise<EnhancedMovie[]> {
    // Simulate JustWatch API integration
    return [];
  }

  private calculateOverallConfidence(movies: EnhancedMovie[]): number {
    if (movies.length === 0) return 0;
    
    const avgConfidence = movies.reduce((sum, movie) => sum + movie.confidence, 0) / movies.length;
    const sourceVariety = new Set(movies.flatMap(m => m.sources)).size;
    
    return Math.min(100, avgConfidence + sourceVariety * 5);
  }

  private calculateCostIncurred(sourcesUsed: string[]): number {
    return sourcesUsed.reduce((total, sourceId) => {
      const source = this.sources.get(sourceId);
      return total + (source ? source.costPerRequest : 0);
    }, 0);
  }

  private getSourcePerformanceMetrics(): { [sourceId: string]: number } {
    const metrics: { [sourceId: string]: number } = {};
    
    this.sources.forEach((source, sourceId) => {
      // Performance score based on reliability, response time, and health
      const healthScore = source.healthStatus === 'active' ? 100 : 
                         source.healthStatus === 'degraded' ? 50 : 0;
      const speedScore = Math.max(0, 100 - (source.responseTime / 10));
      
      metrics[sourceId] = (source.reliability + healthScore + speedScore) / 3;
    });
    
    return metrics;
  }

  // Enterprise Analytics Methods
  getAnalyticsDashboard() {
    return {
      overview: {
        totalRequests: this.analytics.totalRequests,
        averageResponseTime: this.analytics.averageResponseTime,
        cacheHitRate: this.analytics.cacheHitRate,
        failoverEvents: this.analytics.failoverEvents
      },
      sources: Array.from(this.sources.values()).map(source => ({
        id: source.id,
        name: source.name,
        healthStatus: source.healthStatus,
        reliability: source.reliability,
        responseTime: source.responseTime,
        dailyUsage: source.dailyUsage,
        dailyLimit: source.dailyLimit,
        usagePercentage: (source.dailyUsage / source.dailyLimit) * 100
      })),
      performance: this.getSourcePerformanceMetrics()
    };
  }

  // Real-time monitoring endpoint
  async getSystemHealth() {
    const activeSourcesCount = Array.from(this.sources.values())
      .filter(s => s.healthStatus === 'active').length;
    
    const totalSources = this.sources.size;
    const systemHealth = (activeSourcesCount / totalSources) * 100;
    
    return {
      status: systemHealth > 80 ? 'healthy' : systemHealth > 50 ? 'degraded' : 'critical',
      healthPercentage: systemHealth,
      activeSources: activeSourcesCount,
      totalSources: totalSources,
      lastUpdated: Date.now()
    };
  }

  destroy(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }
}

export const multiSourceHub = new MultiSourceIntelligenceHub();