// Theme Analysis API Route
// Provides advanced theme recognition and movie recommendations

import { NextRequest, NextResponse } from 'next/server'
import { advancedThemeAnalysis } from '@/lib/advanced-theme-analysis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      query, 
      emotionalContext, 
      lifeStage, 
      specificNeeds, 
      culturalBackground 
    } = body

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    console.log('🎭 Processing theme analysis request:', {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      emotionalContext,
      lifeStage,
      specificNeeds: specificNeeds?.length || 0,
      culturalBackground
    })
    
    const result = await advancedThemeAnalysis.analyzeAndRecommend({
      rawQuery: query,
      emotionalContext,
      lifeStage,
      specificNeeds,
      culturalBackground
    })
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('Theme analysis API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze themes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Advanced Theme Analysis API',
    status: 'operational',
    description: 'Provides sophisticated theme recognition and psychological analysis for movie recommendations',
    features: [
      'Universal archetypal pattern recognition',
      'Psychological need identification',
      'Life stage alignment analysis',
      'Cultural context assessment',
      'Therapeutic recommendation matching',
      'Thematic journey mapping'
    ]
  })
}