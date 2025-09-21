// Multi-Source Intelligence Hub API Route
// Enterprise-grade endpoint for comprehensive content discovery

import { NextRequest, NextResponse } from 'next/server';
import { multiSourceHub } from '@/lib/multi-source-intelligence-hub';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, filters, userContext, strategy } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    console.log('🎯 Multi-Source Intelligence Search:', {
      query,
      strategy: strategy || 'auto',
      userLocation: userContext?.location
    });

    const searchRequest = {
      query,
      filters: filters || {},
      userContext: userContext || {},
      strategy: strategy || 'fast'
    };

    const result = await multiSourceHub.intelligentSearch(searchRequest);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Intelligence Hub API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process intelligence search',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    switch (endpoint) {
      case 'health':
        const health = await multiSourceHub.getSystemHealth();
        return NextResponse.json({ success: true, data: health });

      case 'analytics':
        const analytics = multiSourceHub.getAnalyticsDashboard();
        return NextResponse.json({ success: true, data: analytics });

      case 'sources':
        const analytics2 = multiSourceHub.getAnalyticsDashboard();
        return NextResponse.json({ 
          success: true, 
          data: { sources: analytics2.sources } 
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'Multi-Source Intelligence Hub API',
          version: '1.0.0',
          endpoints: {
            'POST /': 'Intelligent content search',
            'GET /?endpoint=health': 'System health status',
            'GET /?endpoint=analytics': 'Performance analytics',
            'GET /?endpoint=sources': 'Source status information'
          },
          capabilities: [
            'Global content aggregation',
            'Intelligent source orchestration',
            'Advanced data fusion',
            'Real-time health monitoring',
            'Cost optimization',
            'Geographic content filtering',
            'Enterprise analytics'
          ]
        });
    }

  } catch (error) {
    console.error('Intelligence Hub GET error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}