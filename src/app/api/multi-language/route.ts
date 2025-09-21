// Multi-Language Intelligence API Route
// Handles culturally-aware content discovery requests

import { NextRequest, NextResponse } from 'next/server';
import { multiLanguagePrompts } from '@/lib/multi-language-ai-prompts';
import { culturalIntelligence } from '@/lib/cultural-intelligence-engine';
import { localizedContentDiscovery } from '@/lib/localized-content-discovery';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      query, 
      language = 'en', 
      intentType = 'recommendation',
      targetLanguages = [],
      userLocation,
      sensitivityLevel = 'medium'
    } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log('🌍 Multi-language request:', {
      query: query.substring(0, 50) + '...',
      language,
      intentType,
      targetLanguages: targetLanguages.length
    });

    // Generate culturally-aware prompt
    const culturalPrompt = multiLanguagePrompts.generateCulturalPrompt({
      userQuery: query,
      language,
      intentType,
      sensitivityLevel
    });

    // Analyze cultural context
    const culturalInsights = culturalIntelligence.analyzeCulturalContext(query, language);

    // Get localized content
    const localizedContent = await localizedContentDiscovery.discoverLocalContent(
      query,
      language,
      userLocation
    );

    // Get streaming availability
    const streamingPlatforms = localizedContentDiscovery.getRegionalPlatforms(language);

    let crossCulturalRecommendations = null;
    if (targetLanguages.length > 0) {
      crossCulturalRecommendations = await culturalIntelligence.generateCrossCulturalRecommendations(
        query,
        language,
        targetLanguages
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        culturalPrompt,
        culturalInsights,
        localizedContent,
        streamingPlatforms,
        crossCulturalRecommendations,
        language,
        marketInsights: await localizedContentDiscovery.getMarketInsights(language)
      },
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Multi-language API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process multi-language request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Multi-Language Entertainment Discovery API',
    supportedLanguages: ['en', 'es', 'fr', 'zh', 'ar', 'hi', 'ja', 'ko'],
    capabilities: [
      'Cultural intelligence analysis',
      'Cross-cultural recommendations',
      'Localized content discovery',
      'Regional streaming integration',
      'Cultural sensitivity awareness',
      'Market insights'
    ]
  });
}