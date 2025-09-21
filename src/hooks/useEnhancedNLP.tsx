// React Hook for Enhanced NLP Movie Recommendations
import { useState } from 'react';
import { enhancedGeminiNLP, EnhancedAIQuery, EnhancedRecommendationResult } from '@/lib/enhanced-gemini-nlp';

export interface UseEnhancedNLPOptions {
  conversationId?: string;
  enhancementLevel?: 'minimal' | 'standard' | 'maximum';
  processingPriority?: 'speed' | 'accuracy' | 'balanced';
}

export function useEnhancedNLP(options: UseEnhancedNLPOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EnhancedRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeQuery = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const enhancedQuery: EnhancedAIQuery = {
        raw_query: query,
        conversation_id: options.conversationId || 'default',
        enhancement_level: options.enhancementLevel || 'standard',
        processing_priority: options.processingPriority || 'balanced'
      };

      const response = await enhancedGeminiNLP.analyzeEnhancedQuery(enhancedQuery);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Enhanced NLP analysis failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeQuery,
    isLoading,
    result,
    error,
    clearError: () => setError(null),
    clearResult: () => setResult(null)
  };
}