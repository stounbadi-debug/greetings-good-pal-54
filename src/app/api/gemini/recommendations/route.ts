import { NextRequest, NextResponse } from 'next/server'
import { geminiAI } from '@/lib/gemini-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, userPreferences = {} } = body

    if (!query?.description) {
      return NextResponse.json(
        { error: 'Query description is required' },
        { status: 400 }
      )
    }

    // Enhanced query with user preferences
    const enhancedQuery = {
      ...query,
      userPreferences,
      timestamp: Date.now()
    }

    console.log('🎬 Processing recommendation request:', enhancedQuery)
    
    const result = await geminiAI.analyzeQuery(enhancedQuery)
    
    return NextResponse.json({
      success: true,
      data: result,
      cached: false,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('Recommendations API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get recommendations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Gemini Recommendations API endpoint',
    status: 'operational',
    endpoints: {
      POST: 'Get AI-powered movie recommendations'
    }
  })
}