import { NextRequest, NextResponse } from 'next/server'
import { tmdbService } from '@/lib/tmdb'

// Simple in-memory cache for TMDB requests
const cache = new Map<string, { data: any, timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'movie'
    const page = parseInt(searchParams.get('page') || '1')
    const genre = searchParams.get('genre')

    if (!query && !genre) {
      return NextResponse.json(
        { error: 'Query parameter "q" or "genre" is required' },
        { status: 400 }
      )
    }

    // Create cache key
    const cacheKey = `${type}-${query}-${genre}-${page}`
    
    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log('📦 Returning cached TMDB result for:', cacheKey)
      return NextResponse.json({
        success: true,
        data: cached.data,
        cached: true,
        timestamp: cached.timestamp
      })
    }

    console.log('🔍 TMDB search:', { query, type, page, genre })
    
    let result
    if (genre) {
      const genreId = parseInt(genre)
      result = await tmdbService.getMoviesByGenre(genreId, page)
    } else if (type === 'tv') {
      result = await tmdbService.searchTVShows(query!, page)
    } else {
      result = await tmdbService.searchMovies(query!, page)
    }
    
    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    // Clean old cache entries (simple cleanup)
    if (cache.size > 100) {
      const oldestKey = cache.keys().next().value
      cache.delete(oldestKey)
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      cached: false,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('TMDB search API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to search movies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { queries } = body

    if (!Array.isArray(queries)) {
      return NextResponse.json(
        { error: 'Queries must be an array' },
        { status: 400 }
      )
    }

    const batchResults = await Promise.allSettled(
      queries.map(async (query: any) => {
        if (query.type === 'genre') {
          return await tmdbService.getMoviesByGenre(query.genreId, query.page || 1)
        } else {
          return await tmdbService.searchMovies(query.query, query.page || 1)
        }
      })
    )

    const results = batchResults.map((result, index) => ({
      index,
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason?.message : null
    }))

    return NextResponse.json({
      success: true,
      batchResults: results,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('TMDB batch search error:', error)
    return NextResponse.json(
      { error: 'Failed to process batch search' },
      { status: 500 }
    )
  }
}