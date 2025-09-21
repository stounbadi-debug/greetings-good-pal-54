// Enhanced API Client for CineDiscover Next.js
import type { Movie } from './tmdb'
import type { AIQuery, RecommendationResult } from './gemini-ai'

export interface APIResponse<T> {
  success: boolean
  data: T
  cached?: boolean
  timestamp?: number
  error?: string
}

export interface EnhancedRecommendationRequest {
  query: AIQuery
  userPreferences?: {
    preferredGenres?: string[]
    dislikedGenres?: string[]
    preferredRatings?: string[]
    culturalContext?: string
    previousLikes?: string[]
    language?: string
  }
}

export interface MoodRequest {
  mood: string
  preferences?: any
  language?: string
}

export interface SimilarMoviesRequest {
  movie: Movie
  preferences?: any
  maxResults?: number
}

export interface TMDBSearchRequest {
  q?: string
  type?: 'movie' | 'tv'
  page?: number
  genre?: string
}

class APIClient {
  private baseURL = '/api'
  
  // Rate limiting and retry logic
  private requestQueue: Map<string, Promise<any>> = new Map()
  private retryAttempts = 3
  private retryDelay = 1000

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const requestKey = `${endpoint}-${JSON.stringify(options)}`
    
    // Prevent duplicate requests
    if (this.requestQueue.has(requestKey)) {
      return this.requestQueue.get(requestKey)
    }

    const requestPromise = this.executeRequest<T>(endpoint, options)
    this.requestQueue.set(requestKey, requestPromise)
    
    try {
      const result = await requestPromise
      return result
    } finally {
      // Clean up after a delay
      setTimeout(() => this.requestQueue.delete(requestKey), 5000)
    }
  }

  private async executeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        })

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data as APIResponse<T>

      } catch (error) {
        console.warn(`API request attempt ${attempt} failed:`, error)
        
        if (attempt === this.retryAttempts) {
          throw new Error(`API request failed after ${this.retryAttempts} attempts: ${error}`)
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt))
      }
    }

    throw new Error('Unexpected error in API request')
  }

  // AI Recommendations API
  async getRecommendations(request: EnhancedRecommendationRequest): Promise<APIResponse<RecommendationResult>> {
    console.log('🎬 Requesting AI recommendations:', request.query.description)
    
    return this.makeRequest<RecommendationResult>('/gemini/recommendations', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  // Mood-based Recommendations API
  async getMoodRecommendations(request: MoodRequest): Promise<APIResponse<{ movies: Movie[], mood: string, language: string, generatedAt: number }>> {
    console.log('🎭 Requesting mood-based recommendations:', request.mood)
    
    return this.makeRequest('/gemini/mood', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  // Similar Movies API
  async getSimilarMovies(request: SimilarMoviesRequest): Promise<APIResponse<{ originalMovie: { id: number, title: string }, similarMovies: Movie[], count: number, generatedAt: number }>> {
    console.log('🔍 Requesting similar movies for:', request.movie.title)
    
    return this.makeRequest('/gemini/similar', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  // Enhanced TMDB Search API
  async searchMovies(request: TMDBSearchRequest): Promise<APIResponse<any>> {
    const params = new URLSearchParams()
    if (request.q) params.append('q', request.q)
    if (request.type) params.append('type', request.type)
    if (request.page) params.append('page', request.page.toString())
    if (request.genre) params.append('genre', request.genre)

    console.log('🔍 TMDB search:', request)
    
    return this.makeRequest(`/tmdb/search?${params.toString()}`, {
      method: 'GET'
    })
  }

  // Batch TMDB Search API
  async batchSearchMovies(queries: TMDBSearchRequest[]): Promise<APIResponse<{ batchResults: any[], timestamp: number }>> {
    console.log('📦 Batch TMDB search:', queries.length, 'queries')
    
    return this.makeRequest('/tmdb/search', {
      method: 'POST',
      body: JSON.stringify({ queries })
    })
  }

  // Health check endpoints
  async checkGeminiHealth(): Promise<APIResponse<{ message: string, status: string }>> {
    return this.makeRequest('/gemini', { method: 'GET' })
  }

  async checkRecommendationsHealth(): Promise<APIResponse<{ message: string, status: string, endpoints: any }>> {
    return this.makeRequest('/gemini/recommendations', { method: 'GET' })
  }

  // Utility methods for common operations
  async getPopularMoviesByMood(mood: string, language?: string): Promise<Movie[]> {
    try {
      const response = await this.getMoodRecommendations({ mood, language })
      return response.success ? response.data.movies : []
    } catch (error) {
      console.error('Failed to get popular movies by mood:', error)
      return []
    }
  }

  async searchWithFallback(query: string, type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> {
    try {
      // Try AI-enhanced search first
      const aiResponse = await this.getRecommendations({
        query: { description: query }
      })
      
      if (aiResponse.success && aiResponse.data.movies.length > 0) {
        return aiResponse.data.movies
      }

      // Fallback to TMDB search
      const tmdbResponse = await this.searchMovies({ q: query, type })
      return tmdbResponse.success ? tmdbResponse.data.results : []

    } catch (error) {
      console.error('Search with fallback failed:', error)
      return []
    }
  }

  // Advanced search with multiple strategies
  async advancedSearch(options: {
    query?: string
    mood?: string
    genres?: string[]
    language?: string
    era?: string
    userPreferences?: any
  }): Promise<Movie[]> {
    try {
      if (options.mood) {
        // Mood-based search
        const movies = await this.getPopularMoviesByMood(options.mood, options.language)
        if (movies.length > 0) return movies
      }

      if (options.query) {
        // AI-enhanced search
        const aiQuery: AIQuery = {
          description: options.query,
          mood: options.mood,
          era: options.era
        }

        const response = await this.getRecommendations({
          query: aiQuery,
          userPreferences: options.userPreferences
        })

        if (response.success) {
          return response.data.movies
        }
      }

      // Fallback to genre search
      if (options.genres && options.genres.length > 0) {
        const response = await this.searchMovies({ genre: options.genres[0] })
        return response.success ? response.data.results : []
      }

      return []

    } catch (error) {
      console.error('Advanced search failed:', error)
      return []
    }
  }

  // Performance monitoring
  async measurePerformance<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    const startTime = performance.now()
    
    try {
      const result = await operation()
      const endTime = performance.now()
      console.log(`⚡ ${operationName} completed in ${(endTime - startTime).toFixed(2)}ms`)
      return result
    } catch (error) {
      const endTime = performance.now()
      console.error(`❌ ${operationName} failed after ${(endTime - startTime).toFixed(2)}ms:`, error)
      throw error
    }
  }
}

export const apiClient = new APIClient()

// Convenience exports for common operations
export const recommendationsAPI = {
  get: (request: EnhancedRecommendationRequest) => apiClient.getRecommendations(request),
  mood: (request: MoodRequest) => apiClient.getMoodRecommendations(request),
  similar: (request: SimilarMoviesRequest) => apiClient.getSimilarMovies(request),
}

export const searchAPI = {
  movies: (request: TMDBSearchRequest) => apiClient.searchMovies(request),
  batch: (queries: TMDBSearchRequest[]) => apiClient.batchSearchMovies(queries),
  advanced: (options: any) => apiClient.advancedSearch(options),
  withFallback: (query: string, type?: 'movie' | 'tv') => apiClient.searchWithFallback(query, type)
}