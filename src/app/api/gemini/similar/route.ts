import { NextRequest, NextResponse } from 'next/server'
import { geminiAI } from '@/lib/gemini-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { movie, preferences = {}, maxResults = 6 } = body

    if (!movie?.id || !movie?.title) {
      return NextResponse.json(
        { error: 'Movie object with id and title is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Finding similar movies for:', movie.title)
    
    const similarMovies = await geminiAI.getSimilarMovies(movie, {
      preferences,
      maxResults
    })
    
    return NextResponse.json({
      success: true,
      data: {
        originalMovie: {
          id: movie.id,
          title: movie.title
        },
        similarMovies,
        count: similarMovies.length,
        generatedAt: Date.now()
      }
    })

  } catch (error) {
    console.error('Similar movies API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to find similar movies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Similar Movies API',
    status: 'operational',
    description: 'Find movies similar to a given movie using AI analysis'
  })
}