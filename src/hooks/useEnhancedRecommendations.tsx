// Enhanced Recommendations Hook with API Integration
import { useState, useCallback, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { apiClient, type EnhancedRecommendationRequest } from '@/lib/api-client'
import { cacheManager } from '@/lib/cache-manager'
import type { Movie } from '@/lib/tmdb'
import type { RecommendationResult } from '@/lib/gemini-ai'

export interface UseEnhancedRecommendationsOptions {
  cacheEnabled?: boolean
  retryOnError?: boolean
  performanceTracking?: boolean
}

export interface RecommendationState {
  movies: Movie[]
  loading: boolean
  error: string | null
  explanation: string
  confidence: number
  tags: string[]
  cached: boolean
  lastQuery: string
  performance?: {
    duration: number
    retryCount: number
  }
}

export function useEnhancedRecommendations(options: UseEnhancedRecommendationsOptions = {}) {
  const { cacheEnabled = true, retryOnError = true, performanceTracking = true } = options
  const { toast } = useToast()

  const [state, setState] = useState<RecommendationState>({
    movies: [],
    loading: false,
    error: null,
    explanation: '',
    confidence: 0,
    tags: [],
    cached: false,
    lastQuery: ''
  })

  const updateState = useCallback((updates: Partial<RecommendationState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const getRecommendations = useCallback(async (request: EnhancedRecommendationRequest) => {
    const queryKey = request.query.description
    const startTime = performance.now()
    let retryCount = 0

    // Check cache first
    if (cacheEnabled) {
      const cached = cacheManager.getCachedRecommendations(queryKey) as RecommendationResult | null
      if (cached) {
        console.log('📦 Using cached recommendations for:', queryKey)
        updateState({
          movies: cached.movies || [],
          explanation: cached.explanation || '',
          confidence: cached.confidence || 0,
          tags: cached.tags || [],
          cached: true,
          loading: false,
          error: null,
          lastQuery: queryKey
        })
        return cached
      }
    }

    updateState({ loading: true, error: null, cached: false, lastQuery: queryKey })

    const executeRequest = async (): Promise<RecommendationResult | null> => {
      try {
        const response = await apiClient.getRecommendations(request)
        
        if (response.success) {
          const result = response.data
          
          // Cache successful results
          if (cacheEnabled) {
            cacheManager.cacheMovieRecommendations(queryKey, result)
          }

          const duration = performance.now() - startTime
          
          updateState({
            movies: result.movies,
            explanation: result.explanation,
            confidence: result.confidence,
            tags: result.tags,
            loading: false,
            error: null,
            performance: performanceTracking ? { duration, retryCount } : undefined
          })

          if (result.confidence > 80) {
            toast({
              title: "Great recommendations found!",
              description: `Found ${result.movies.length} highly relevant movies.`,
              duration: 3000
            })
          }

          return result
        } else {
          throw new Error(response.error || 'Failed to get recommendations')
        }
      } catch (error) {
        retryCount++
        console.error(`Recommendations attempt ${retryCount} failed:`, error)
        
        if (retryOnError && retryCount < 3) {
          console.log(`Retrying recommendations... (${retryCount}/3)`)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
          return executeRequest()
        }
        
        throw error
      }
    }

    try {
      return await executeRequest()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Final recommendations error:', error)
      
      updateState({
        loading: false,
        error: errorMessage,
        performance: performanceTracking ? { duration: performance.now() - startTime, retryCount } : undefined
      })

      toast({
        title: "Recommendation Error",
        description: "Unable to get personalized recommendations. Please try again.",
        variant: "destructive",
        duration: 5000
      })

      return null
    }
  }, [cacheEnabled, retryOnError, performanceTracking, updateState, toast])

  const getMoodRecommendations = useCallback(async (mood: string, language = 'en') => {
    const startTime = performance.now()
    
    // Check cache
    if (cacheEnabled) {
      const cached = cacheManager.getCachedMoodRecommendations(mood, language)
      if (cached) {
        updateState({
          movies: cached,
          explanation: `Curated ${mood} movies for your current mood`,
          confidence: 85,
          tags: [mood, 'mood-based', language],
          cached: true,
          loading: false,
          error: null,
          lastQuery: `mood: ${mood}`
        })
        return cached
      }
    }

    updateState({ loading: true, error: null, lastQuery: `mood: ${mood}` })

    try {
      const response = await apiClient.getMoodRecommendations({ mood, language })
      
      if (response.success) {
        const movies = response.data.movies
        
        if (cacheEnabled) {
          cacheManager.cacheMoodRecommendations(mood, language, movies)
        }

        const duration = performance.now() - startTime
        
        updateState({
          movies,
          explanation: `Perfect ${mood} movies selected for your current mood`,
          confidence: 85,
          tags: [mood, 'mood-based', language],
          loading: false,
          error: null,
          performance: performanceTracking ? { duration, retryCount: 0 } : undefined
        })

        return movies
      } else {
        throw new Error(response.error || 'Failed to get mood recommendations')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Mood recommendations failed'
      
      updateState({
        loading: false,
        error: errorMessage
      })

      toast({
        title: "Mood Recommendations Error",
        description: "Unable to get mood-based recommendations.",
        variant: "destructive"
      })

      return []
    }
  }, [cacheEnabled, performanceTracking, updateState, toast])

  const getSimilarMovies = useCallback(async (movie: Movie) => {
    if (cacheEnabled) {
      const cached = cacheManager.getCachedSimilarMovies(movie.id)
      if (cached) {
        return cached
      }
    }

    try {
      const response = await apiClient.getSimilarMovies({ movie })
      
      if (response.success) {
        const similarMovies = response.data.similarMovies
        
        if (cacheEnabled) {
          cacheManager.cacheSimilarMovies(movie.id, similarMovies)
        }

        return similarMovies
      } else {
        throw new Error(response.error || 'Failed to get similar movies')
      }
    } catch (error) {
      console.error('Similar movies error:', error)
      toast({
        title: "Similar Movies Error",
        description: "Unable to find similar movies.",
        variant: "destructive"
      })
      return []
    }
  }, [cacheEnabled, toast])

  const clearCache = useCallback(() => {
    cacheManager.clear()
    toast({
      title: "Cache Cleared",
      description: "All cached recommendations have been cleared.",
      duration: 2000
    })
  }, [toast])

  const getCacheStats = useCallback(() => {
    return cacheManager.getStats()
  }, [])

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup any pending requests or timeouts
    }
  }, [])

  return {
    ...state,
    getRecommendations,
    getMoodRecommendations,
    getSimilarMovies,
    clearCache,
    getCacheStats,
    isLoading: state.loading,
    hasError: !!state.error,
    hasResults: state.movies.length > 0
  }
}