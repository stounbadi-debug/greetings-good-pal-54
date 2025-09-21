// React Hook for Advanced Theme Analysis
// Provides sophisticated theme recognition and recommendations

import { useState, useCallback } from 'react';
import { AdvancedThemeRecommendationResult } from '@/lib/advanced-theme-analysis';

export interface ThemeAnalysisQuery {
  query: string;
  emotionalContext?: string;
  lifeStage?: string;
  specificNeeds?: string[];
  culturalBackground?: string;
}

export interface UseThemeAnalysisResult {
  analyzeThemes: (query: ThemeAnalysisQuery) => Promise<AdvancedThemeRecommendationResult | null>;
  isAnalyzing: boolean;
  result: AdvancedThemeRecommendationResult | null;
  error: string | null;
  clearResults: () => void;
  clearError: () => void;
}

export function useThemeAnalysis(): UseThemeAnalysisResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AdvancedThemeRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeThemes = useCallback(async (query: ThemeAnalysisQuery) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('🎭 Starting theme analysis:', query.query.substring(0, 50) + '...');
      
      const response = await fetch('/api/theme-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Theme analysis failed');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Analysis was not successful');
      }

      console.log('✨ Theme analysis completed:', {
        themes: data.data.themeAnalysis.primaryThemes.length,
        confidence: Math.round(data.data.themeAnalysis.confidenceScore * 100) + '%',
        movies: data.data.recommendedMovies.length
      });

      setResult(data.data);
      return data.data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Theme analysis failed';
      console.error('❌ Theme analysis error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    analyzeThemes,
    isAnalyzing,
    result,
    error,
    clearResults,
    clearError
  };
}