import { NextRequest, NextResponse } from 'next/server'
import { geminiAI } from '@/lib/gemini-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood, preferences = {}, language = 'en' } = body

    if (!mood) {
      return NextResponse.json(
        { error: 'Mood parameter is required' },
        { status: 400 }
      )
    }

    console.log('🎭 Processing mood-based request:', { mood, language })
    
    const movies = await geminiAI.getMoodBasedRecommendations(mood, {
      language,
      preferences
    })
    
    return NextResponse.json({
      success: true,
      data: {
        movies,
        mood,
        language,
        generatedAt: Date.now()
      }
    })

  } catch (error) {
    console.error('Mood API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get mood-based recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Mood-based Recommendations API',
    status: 'operational',
    supportedMoods: [
      'happy', 'sad', 'excited', 'relaxed', 'nostalgic',
      'adventurous', 'romantic', 'thoughtful', 'energetic'
    ]
  })
}