// Enhanced Gemini AI Service with Advanced NLP Capabilities
// Building on existing gemini-ai.ts with psychological profiling and intelligent processing

import { Movie } from "./tmdb";
import { tmdbService } from "./tmdb";
import { nlpProcessor, NLPQuery, ProcessedQuery } from "./nlp-processor";
import { conversationMemory } from "./conversation-memory";
import { queryCache } from "./query-cache";

export interface EnhancedAIQuery extends NLPQuery {
  enhancement_level?: 'minimal' | 'standard' | 'maximum';
  processing_priority?: 'speed' | 'accuracy' | 'balanced';
}

export interface EnhancedRecommendationResult {
  movies: Movie[];
  explanation: string;
  confidence: number;
  tags: string[];
  
  // Enhanced NLP Features
  nlp_analysis: ProcessedQuery;
  psychological_insights: PsychologicalInsights;
  conversation_context: ConversationContext;
  reasoning_chain: ReasoningStep[];
  enhancement_metrics: EnhancementMetrics;
}

export interface PsychologicalInsights {
  user_personality_assessment: string;
  viewing_motivation_analysis: string;
  emotional_state_summary: string;
  recommendation_rationale: string;
  personalization_factors: string[];
}

export interface ConversationContext {
  is_followup: boolean;
  previous_recommendations: string[];
  user_feedback_patterns: string[];
  conversation_topic_evolution: string[];
  context_continuity_score: number;
}

export interface ReasoningStep {
  step_type: 'analysis' | 'inference' | 'matching' | 'filtering' | 'ranking';
  description: string;
  confidence: number;
  data_used: string[];
}

export interface EnhancementMetrics {
  nlp_processing_time: number;
  ai_model_used: string;
  enhancement_level_applied: string;
  fallback_strategies_used: string[];
  cache_hit_rate: number;
}

class EnhancedGeminiNLPService {
  private readonly MAX_CACHE_AGE = 30 * 60 * 1000; // 30 minutes
  private readonly COMPLEXITY_THRESHOLD = 70;

  constructor() {
    console.log('🧠 Enhanced Gemini NLP Service initialized with advanced capabilities');
  }

  async analyzeEnhancedQuery(query: EnhancedAIQuery): Promise<EnhancedRecommendationResult> {
    const startTime = Date.now();
    console.log('🚀 Processing enhanced query with NLP analysis:', query.raw_query);

    try {
      // Step 1: Check cache first
      const cacheKey = this.generateCacheKey(query);
      const cachedResult = await queryCache.get(cacheKey);
      if (cachedResult) {
        console.log('⚡ Cache hit - returning cached result');
        return this.addCacheMetrics(cachedResult, startTime, true);
      }

      // Step 2: Advanced NLP preprocessing
      const nlpAnalysis = await nlpProcessor.processQuery(query);
      console.log('🧠 NLP Analysis completed:', {
        complexity: nlpAnalysis.complexity_score,
        intent: nlpAnalysis.intent_classification.primary_intent,
        emotion: nlpAnalysis.emotional_state.primary_emotion
      });

      // Step 3: Conversation context analysis
      const conversationContext = await this.analyzeConversationContext(query);

      // Step 4: Determine processing route based on NLP analysis
      const processingRoute = nlpAnalysis.routing_recommendation;
      console.log('🎯 Processing route determined:', processingRoute);

      // Step 5: Execute enhanced AI processing
      const aiResult = await this.executeEnhancedProcessing(query, nlpAnalysis, processingRoute);

      // Step 6: Generate psychological insights
      const psychologicalInsights = this.generatePsychologicalInsights(nlpAnalysis, aiResult);

      // Step 7: Build reasoning chain
      const reasoningChain = this.buildReasoningChain(nlpAnalysis, aiResult);

      // Step 8: Prepare enhanced result
      const enhancedResult: EnhancedRecommendationResult = {
        movies: aiResult.movies,
        explanation: aiResult.explanation,
        confidence: aiResult.confidence,
        tags: aiResult.tags,
        nlp_analysis: nlpAnalysis,
        psychological_insights: psychologicalInsights,
        conversation_context: conversationContext,
        reasoning_chain: reasoningChain,
        enhancement_metrics: {
          nlp_processing_time: Date.now() - startTime,
          ai_model_used: processingRoute.recommended_ai_model,
          enhancement_level_applied: processingRoute.enhancement_level,
          fallback_strategies_used: [],
          cache_hit_rate: 0
        }
      };

      // Step 9: Update conversation memory
      await conversationMemory.updateConversation(
        query.conversation_id || 'default',
        query.raw_query,
        enhancedResult
      );

      // Step 10: Cache result
      await queryCache.set(cacheKey, enhancedResult, this.MAX_CACHE_AGE);

      console.log('✅ Enhanced query processing completed');
      return enhancedResult;

    } catch (error) {
      console.error('❌ Enhanced query processing failed:', error);
      return this.getEnhancedFallback(query, Date.now() - startTime);
    }
  }

  private async executeEnhancedProcessing(
    query: EnhancedAIQuery,
    nlpAnalysis: ProcessedQuery,
    route: any
  ): Promise<any> {
    
    if (route.recommended_ai_model === 'gemini_advanced') {
      return this.executeAdvancedGeminiProcessing(query, nlpAnalysis);
    } else if (route.recommended_ai_model === 'gemini_standard') {
      return this.executeStandardGeminiProcessing(query, nlpAnalysis);
    } else {
      return this.executeFallbackProcessing(query, nlpAnalysis);
    }
  }

  private async executeAdvancedGeminiProcessing(
    query: EnhancedAIQuery,
    nlpAnalysis: ProcessedQuery
  ): Promise<any> {
    console.log('🧠 Executing advanced Gemini processing with psychological profiling');

    const enhancedPrompt = this.buildAdvancedPrompt(query, nlpAnalysis);
    const geminiResponse = await this.callGeminiAPI(enhancedPrompt);
    
    let aiAnalysis;
    try {
      const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in advanced response');
      }
    } catch (parseError) {
      console.error('Failed to parse advanced Gemini response:', parseError);
      return this.executeStandardGeminiProcessing(query, nlpAnalysis);
    }

    // Enhanced movie search based on advanced analysis
    const movies = await this.performEnhancedMovieSearch(aiAnalysis, nlpAnalysis);
    
    // Advanced ranking with psychological factors
    const rankedMovies = await this.performPsychologicalRanking(movies, nlpAnalysis, aiAnalysis);

    return {
      movies: rankedMovies,
      explanation: aiAnalysis.enhanced_explanation || aiAnalysis.explanation,
      confidence: Math.min((aiAnalysis.confidence || 85) + 10, 98), // Boost for advanced processing
      tags: [
        ...(aiAnalysis.genres || []),
        ...(nlpAnalysis.emotional_state.mood_descriptors || []),
        `complexity_${nlpAnalysis.complexity_score > 70 ? 'high' : 'medium'}`,
        'ai_enhanced'
      ]
    };
  }

  private buildAdvancedPrompt(query: EnhancedAIQuery, nlpAnalysis: ProcessedQuery): string {
    const { entities, emotional_state, psychological_profile, constraints } = nlpAnalysis;

    return `
      You are an advanced movie recommendation AI with deep psychological understanding and cultural expertise.
      
      USER QUERY: "${query.raw_query}"
      
      ADVANCED CONTEXT ANALYSIS:
      
      🧠 PSYCHOLOGICAL PROFILE:
      - Personality Indicators: ${psychological_profile.personality_indicators.join(', ')}
      - Viewing Motivations: ${psychological_profile.viewing_motivations.join(', ')}
      - Sophistication Level: ${psychological_profile.sophistication_level}
      - Risk Tolerance: ${psychological_profile.risk_tolerance}
      - Emotional Triggers: ${psychological_profile.emotional_triggers.join(', ')}
      
      😊 EMOTIONAL STATE:
      - Primary Emotion: ${emotional_state.primary_emotion}
      - Intensity: ${emotional_state.emotional_intensity}/100
      - Emotional Context: ${emotional_state.emotional_context}
      - Emotional Needs: ${emotional_state.emotional_needs.join(', ')}
      
      🎭 VIEWING CONTEXT:
      - Audience: ${constraints.viewing_situation.audience_type}
      - Social Context: ${constraints.viewing_situation.social_context}
      - Age Considerations: ${constraints.viewing_situation.age_considerations.join(', ')}
      
      📚 EXTRACTED ENTITIES:
      - Themes: ${entities.themes.join(', ')}
      - Plot Elements: ${entities.plot_elements.join(', ')}
      - Visual Styles: ${entities.visual_styles.join(', ')}
      - Cultural References: ${entities.cultural_references.join(', ')}
      
      ADVANCED RECOMMENDATION STRATEGY:
      
      1. PSYCHOLOGICAL MATCHING:
         - Match content to user's emotional needs and psychological profile
         - Consider viewing motivations and personality indicators
         - Respect emotional triggers and risk tolerance
      
      2. CONTEXTUAL INTELLIGENCE:
         - Account for social dynamics and viewing situation
         - Consider cultural context and sophistication level
         - Integrate temporal preferences and constraints
      
      3. MULTI-DIMENSIONAL ANALYSIS:
         - Emotional resonance scoring (1-100)
         - Psychological compatibility assessment
         - Situational appropriateness evaluation
         - Cultural relevance analysis
      
      4. ENHANCED REASONING:
         - Provide detailed psychological rationale
         - Explain emotional impact predictions
         - Consider both explicit and implicit preferences
      
      Provide comprehensive JSON response:
      {
        "psychological_assessment": "Detailed analysis of user's psychological state and needs",
        "emotional_matching_strategy": "How recommendations address emotional needs",
        "contextual_considerations": "Social and situational factors influencing recommendations",
        "exact_titles": ["Specific movie titles if describing known plots"],
        "genres": ["Primary genres with psychological justification"],
        "primary_keywords": ["Core thematic elements addressing psychological needs"],
        "alternative_keywords": ["Related concepts, director names, psychological themes"],
        "psychological_themes": ["Themes that resonate with user's psychological profile"],
        "emotional_impact_prediction": "Predicted emotional response to recommendations",
        "viewing_experience_design": "How the viewing experience serves user's needs",
        "sophistication_matching": "Content complexity matching user's profile",
        "social_dynamics_consideration": "How recommendations work for the viewing context",
        "enhanced_explanation": "Detailed psychological and contextual reasoning",
        "confidence": "1-100 confidence in psychological matching",
        "emotional_resonance_score": "1-100 predicted emotional connection",
        "psychological_compatibility_score": "1-100 compatibility with user profile"
      }
      
      CRITICAL: Focus on psychological understanding and emotional intelligence.
      Consider the complete human context behind the request.
      Return ONLY valid JSON, no other text.
    `;
  }

  private async executeStandardGeminiProcessing(
    query: EnhancedAIQuery,
    nlpAnalysis: ProcessedQuery
  ): Promise<any> {
    console.log('🎬 Executing standard Gemini processing with NLP enhancement');

    const enhancedPrompt = this.buildStandardEnhancedPrompt(query, nlpAnalysis);
    const geminiResponse = await this.callGeminiAPI(enhancedPrompt);
    
    let aiAnalysis;
    try {
      const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in standard response');
      }
    } catch (parseError) {
      console.error('Failed to parse standard Gemini response:', parseError);
      return this.executeFallbackProcessing(query, nlpAnalysis);
    }

    // Standard movie search with NLP enhancement
    const movies = await this.performEnhancedMovieSearch(aiAnalysis, nlpAnalysis);
    const rankedMovies = await this.performStandardRanking(movies, nlpAnalysis, aiAnalysis);

    return {
      movies: rankedMovies,
      explanation: aiAnalysis.explanation,
      confidence: aiAnalysis.confidence || 85,
      tags: [
        ...(aiAnalysis.genres || []),
        nlpAnalysis.emotional_state.primary_emotion,
        nlpAnalysis.intent_classification.primary_intent
      ]
    };
  }

  private buildStandardEnhancedPrompt(query: EnhancedAIQuery, nlpAnalysis: ProcessedQuery): string {
    const { entities, emotional_state, intent_classification } = nlpAnalysis;

    return `
      You are an expert movie recommendation AI with enhanced understanding capabilities.
      
      USER REQUEST: "${query.raw_query}"
      
      ENHANCED CONTEXT:
      - Intent: ${intent_classification.primary_intent} (${intent_classification.specificity_level})
      - Emotional State: ${emotional_state.primary_emotion} (${emotional_state.emotional_intensity}% intensity)
      - Detected Themes: ${entities.themes.join(', ')}
      - Viewing Context: ${nlpAnalysis.constraints.viewing_situation.audience_type}
      
      SMART ANALYSIS REQUIRED:
      
      1. EMOTIONAL INTELLIGENCE:
         - Address the user's ${emotional_state.primary_emotion} emotional state
         - Consider emotional needs: ${emotional_state.emotional_needs.join(', ')}
         - Match content to emotional context: ${emotional_state.emotional_context}
      
      2. CONTEXTUAL AWARENESS:
         - Viewing situation: ${nlpAnalysis.constraints.viewing_situation.social_context}
         - Age considerations: ${nlpAnalysis.constraints.viewing_situation.age_considerations.join(', ')}
      
      3. INTELLIGENT MATCHING:
         - Use detected themes for deeper matching beyond surface genres
         - Consider plot elements: ${entities.plot_elements.join(', ')}
         - Account for visual style preferences: ${entities.visual_styles.join(', ')}
      
      Provide enhanced JSON response:
      {
        "emotional_analysis": "How recommendations address user's emotional state",
        "contextual_matching": "Appropriateness for viewing situation",
        "exact_titles": ["Specific movies if user describes known plots"],
        "genres": ["Primary genres with emotional justification"],
        "primary_keywords": ["Core search terms addressing emotional and thematic needs"],
        "alternative_keywords": ["Related concepts and themes"],
        "emotional_themes": ["Themes that match emotional needs"],
        "viewing_situation_notes": "Considerations for the social context",
        "explanation": "Comprehensive reasoning combining emotional and contextual factors",
        "confidence": "1-100 confidence in matching user needs"
      }
      
      Return ONLY valid JSON, no other text.
    `;
  }

  private async executeFallbackProcessing(
    query: EnhancedAIQuery,
    nlpAnalysis: ProcessedQuery
  ): Promise<any> {
    console.log('🔄 Executing fallback processing with NLP guidance');

    // Use NLP analysis to guide fallback strategy
    let movies: Movie[] = [];

    // Try genre-based search first
    if (nlpAnalysis.entities.genres.length > 0) {
      const genreMap = this.getGenreMap();
      const genreId = genreMap[nlpAnalysis.entities.genres[0].toLowerCase()];
      if (genreId) {
        const genreResults = await tmdbService.getMoviesByGenre(genreId);
        movies.push(...genreResults.results.slice(0, 8));
      }
    }

    // Fallback to mood-based search
    if (movies.length === 0) {
      const moodKeywords = this.getMoodKeywords(nlpAnalysis.emotional_state.primary_emotion);
      if (moodKeywords.length > 0) {
        const searchResults = await tmdbService.searchMovies(moodKeywords[0]);
        movies.push(...searchResults.results.slice(0, 8));
      }
    }

    // Final fallback to popular movies
    if (movies.length === 0) {
      const popularResults = await tmdbService.getPopularMovies();
      movies.push(...popularResults.results.slice(0, 8));
    }

    return {
      movies,
      explanation: `Based on your ${nlpAnalysis.emotional_state.primary_emotion} mood and ${nlpAnalysis.intent_classification.primary_intent} intent, here are curated recommendations.`,
      confidence: 70,
      tags: [
        nlpAnalysis.emotional_state.primary_emotion,
        nlpAnalysis.intent_classification.primary_intent,
        'fallback_processing'
      ]
    };
  }

  private async performEnhancedMovieSearch(aiAnalysis: any, nlpAnalysis: ProcessedQuery): Promise<Movie[]> {
    let movies: Movie[] = [];
    const maxResults = 20;

    // 1. Exact title matches first
    if (aiAnalysis.exact_titles && aiAnalysis.exact_titles.length > 0) {
      for (const title of aiAnalysis.exact_titles.slice(0, 2)) {
        const exactResults = await tmdbService.searchMovies(title);
        movies.push(...exactResults.results.slice(0, 3));
      }
    }

    // 2. Enhanced keyword search
    if (movies.length < maxResults) {
      const searchKeywords = [
        ...(aiAnalysis.primary_keywords || []),
        ...(aiAnalysis.psychological_themes || []),
        ...(nlpAnalysis.context_enrichment.contextual_keywords || [])
      ];

      for (const keyword of searchKeywords.slice(0, 3)) {
        if (movies.length >= maxResults) break;
        const searchResults = await tmdbService.searchMovies(keyword);
        movies.push(...searchResults.results.slice(0, 4));
      }
    }

    // 3. Genre-based search
    if (movies.length < maxResults && aiAnalysis.genres) {
      const genreMap = this.getGenreMap();
      for (const genre of aiAnalysis.genres.slice(0, 2)) {
        const genreId = genreMap[genre.toLowerCase()];
        if (genreId) {
          const genreResults = await tmdbService.getMoviesByGenre(genreId);
          movies.push(...genreResults.results.slice(0, 6));
        }
      }
    }

    // Remove duplicates and apply temporal filtering
    return this.filterAndDeduplicateMovies(movies, nlpAnalysis);
  }

  private filterAndDeduplicateMovies(movies: Movie[], nlpAnalysis: ProcessedQuery): Movie[] {
    // Remove duplicates
    let uniqueMovies = movies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    );

    // Apply temporal filtering
    const { release_year_range } = nlpAnalysis.temporal_context;
    if (release_year_range.from || release_year_range.to) {
      uniqueMovies = uniqueMovies.filter((movie) => {
        const year = parseInt((movie.release_date || '').slice(0, 4), 10);
        if (!year) return false;
        if (release_year_range.from && year < release_year_range.from) return false;
        if (release_year_range.to && year > release_year_range.to) return false;
        return true;
      });
    }

    // Apply content restrictions
    const restrictions = nlpAnalysis.constraints.content_restrictions;
    if (restrictions.genre_exclusions.length > 0) {
      const genreMap = this.getGenreMap();
      const excludedGenreIds = restrictions.genre_exclusions
        .map(g => genreMap[g.toLowerCase()])
        .filter(Boolean);
      
      uniqueMovies = uniqueMovies.filter(movie => 
        !movie.genre_ids?.some(id => excludedGenreIds.includes(id))
      );
    }

    return uniqueMovies.slice(0, 20);
  }

  private async performPsychologicalRanking(
    movies: Movie[],
    nlpAnalysis: ProcessedQuery,
    aiAnalysis: any
  ): Promise<Movie[]> {
    console.log('🧠 Performing psychological ranking of movies');

    return movies.map(movie => {
      let score = movie.vote_average || 5; // Base score

      // Psychological compatibility scoring
      if (aiAnalysis.psychological_compatibility_score) {
        score += (aiAnalysis.psychological_compatibility_score / 100) * 2;
      }

      // Emotional resonance scoring
      if (aiAnalysis.emotional_resonance_score) {
        score += (aiAnalysis.emotional_resonance_score / 100) * 2;
      }

      // Sophistication matching
      const userSophistication = nlpAnalysis.psychological_profile.sophistication_level;
      if (userSophistication === 'arthouse' && movie.vote_average && movie.vote_average > 7) {
        score += 1;
      }
      if (userSophistication === 'mainstream' && movie.popularity && movie.popularity > 50) {
        score += 1;
      }

      // Risk tolerance matching
      const riskTolerance = nlpAnalysis.psychological_profile.risk_tolerance;
      if (riskTolerance === 'safe' && movie.vote_average && movie.vote_average > 7) {
        score += 0.5;
      }
      if (riskTolerance === 'adventurous' && movie.vote_average && movie.vote_average < 6.5) {
        score += 0.5; // Reward riskier choices for adventurous users
      }

      return { ...movie, psychological_score: score };
    }).sort((a: any, b: any) => (b.psychological_score || 0) - (a.psychological_score || 0));
  }

  private async performStandardRanking(
    movies: Movie[],
    nlpAnalysis: ProcessedQuery,
    aiAnalysis: any
  ): Promise<Movie[]> {
    return movies.map(movie => {
      let score = movie.vote_average || 5;

      // Emotional state matching
      const emotion = nlpAnalysis.emotional_state.primary_emotion;
      if (emotion === 'happy' && movie.genre_ids?.includes(35)) score += 1; // Comedy boost
      if (emotion === 'sad' && movie.genre_ids?.includes(18)) score += 1; // Drama boost
      if (emotion === 'adventurous' && movie.genre_ids?.includes(12)) score += 1; // Adventure boost

      // Popularity boost for mainstream preferences
      if (movie.popularity && movie.popularity > 30) score += 0.5;

      return { ...movie, enhanced_score: score };
    }).sort((a: any, b: any) => (b.enhanced_score || 0) - (a.enhanced_score || 0));
  }

  private generatePsychologicalInsights(
    nlpAnalysis: ProcessedQuery,
    aiResult: any
  ): PsychologicalInsights {
    const { psychological_profile, emotional_state } = nlpAnalysis;

    return {
      user_personality_assessment: `Based on your query, you appear to be ${psychological_profile.personality_indicators.join(', ')} with a ${psychological_profile.sophistication_level} taste in entertainment.`,
      
      viewing_motivation_analysis: `Your primary viewing motivations seem to be ${psychological_profile.viewing_motivations.join(' and ')}. This suggests you're seeking ${emotional_state.emotional_needs.join(', ')}.`,
      
      emotional_state_summary: `You're currently experiencing ${emotional_state.primary_emotion} feelings with ${emotional_state.emotional_intensity}% intensity. Your emotional context suggests ${emotional_state.emotional_context}.`,
      
      recommendation_rationale: aiResult.enhanced_explanation || aiResult.explanation || 'Recommendations selected based on psychological and contextual analysis.',
      
      personalization_factors: [
        `Sophistication Level: ${psychological_profile.sophistication_level}`,
        `Risk Tolerance: ${psychological_profile.risk_tolerance}`,
        `Emotional Needs: ${emotional_state.emotional_needs.join(', ')}`,
        `Viewing Motivations: ${psychological_profile.viewing_motivations.join(', ')}`
      ]
    };
  }

  private buildReasoningChain(nlpAnalysis: ProcessedQuery, aiResult: any): ReasoningStep[] {
    const steps: ReasoningStep[] = [];

    steps.push({
      step_type: 'analysis',
      description: `Analyzed query complexity (${nlpAnalysis.complexity_score}/100) and identified ${nlpAnalysis.intent_classification.primary_intent} intent`,
      confidence: nlpAnalysis.processing_confidence,
      data_used: ['query_text', 'linguistic_patterns']
    });

    steps.push({
      step_type: 'inference',
      description: `Detected ${nlpAnalysis.emotional_state.primary_emotion} emotional state and ${nlpAnalysis.psychological_profile.sophistication_level} sophistication level`,
      confidence: 85,
      data_used: ['emotional_keywords', 'language_complexity', 'cultural_references']
    });

    if (nlpAnalysis.entities.themes.length > 0) {
      steps.push({
        step_type: 'matching',
        description: `Matched thematic preferences: ${nlpAnalysis.entities.themes.join(', ')}`,
        confidence: 80,
        data_used: ['theme_extraction', 'cultural_context']
      });
    }

    steps.push({
      step_type: 'filtering',
      description: 'Applied contextual constraints and content restrictions',
      confidence: 90,
      data_used: ['viewing_situation', 'content_restrictions', 'temporal_preferences']
    });

    steps.push({
      step_type: 'ranking',
      description: 'Ranked results using psychological compatibility and emotional resonance',
      confidence: aiResult.confidence || 85,
      data_used: ['psychological_profile', 'emotional_matching', 'user_preferences']
    });

    return steps;
  }

  private async analyzeConversationContext(query: EnhancedAIQuery): Promise<ConversationContext> {
    const conversationId = query.conversation_id || 'default';
    const history = await conversationMemory.getConversationHistory(conversationId, 5);

    return {
      is_followup: history.length > 0,
      previous_recommendations: history.map(h => h.query).slice(0, 3),
      user_feedback_patterns: [],
      conversation_topic_evolution: this.analyzeTopicEvolution(history),
      context_continuity_score: this.calculateContinuityScore(history, query)
    };
  }

  private analyzeTopicEvolution(history: any[]): string[] {
    if (history.length === 0) return ['initial_query'];
    
    const topics = history.map(h => {
      const query = h.query.toLowerCase();
      if (query.includes('similar')) return 'seeking_similar';
      if (query.includes('different')) return 'seeking_variety';
      if (query.includes('but')) return 'refining_criteria';
      return 'general_exploration';
    });

    return [...new Set(topics)];
  }

  private calculateContinuityScore(history: any[], currentQuery: EnhancedAIQuery): number {
    if (history.length === 0) return 100; // Perfect for first query

    const lastQuery = history[0]?.query.toLowerCase() || '';
    const currentQueryText = currentQuery.raw_query.toLowerCase();

    // Simple continuity scoring based on keyword overlap
    const lastWords = new Set(lastQuery.split(' ').filter(w => w.length > 3));
    const currentWords = new Set(currentQueryText.split(' ').filter(w => w.length > 3));
    
    const overlap = [...lastWords].filter((w: string) => currentWords.has(w)).length;
    const maxWords = Math.max(lastWords.size, currentWords.size);
    
    return maxWords > 0 ? (overlap / maxWords) * 100 : 50;
  }

  private generateCacheKey(query: EnhancedAIQuery): string {
    // Create a deterministic cache key based on query content and important parameters
    const keyContent = `${query.raw_query}_${query.enhancement_level || 'standard'}_${query.processing_priority || 'balanced'}`;
    return Buffer.from(keyContent).toString('base64').slice(0, 32);
  }

  private addCacheMetrics(
    cachedResult: EnhancedRecommendationResult,
    startTime: number,
    cacheHit: boolean
  ): EnhancedRecommendationResult {
    return {
      ...cachedResult,
      enhancement_metrics: {
        ...cachedResult.enhancement_metrics,
        nlp_processing_time: Date.now() - startTime,
        cache_hit_rate: cacheHit ? 100 : 0
      }
    };
  }

  private async getEnhancedFallback(
    query: EnhancedAIQuery,
    processingTime: number
  ): Promise<EnhancedRecommendationResult> {
    console.log('🔄 Executing enhanced fallback with basic NLP');

    // Basic NLP analysis for fallback
    const basicNlpAnalysis: Partial<ProcessedQuery> = {
      complexity_score: 30,
      intent_classification: {
        primary_intent: 'recommend',
        secondary_intents: [],
        specificity_level: 'moderate',
        urgency_level: 'medium'
      },
      emotional_state: {
        primary_emotion: 'neutral',
        emotional_intensity: 50,
        emotional_context: 'general',
        mood_descriptors: ['neutral'],
        emotional_needs: ['entertainment']
      },
      processing_confidence: 60
    };

    // Get some popular movies as fallback
    const popularResults = await tmdbService.getPopularMovies();
    const movies = popularResults.results.slice(0, 8);

    return {
      movies,
      explanation: 'Here are some popular recommendations. For more personalized results, try providing more specific preferences.',
      confidence: 60,
      tags: ['fallback', 'popular', 'general'],
      nlp_analysis: basicNlpAnalysis as ProcessedQuery,
      psychological_insights: {
        user_personality_assessment: 'Unable to determine specific preferences from the current query.',
        viewing_motivation_analysis: 'Seeking general entertainment recommendations.',
        emotional_state_summary: 'Neutral emotional state detected.',
        recommendation_rationale: 'Fallback to popular, well-rated content.',
        personalization_factors: ['General popularity', 'High ratings']
      },
      conversation_context: {
        is_followup: false,
        previous_recommendations: [],
        user_feedback_patterns: [],
        conversation_topic_evolution: ['fallback_query'],
        context_continuity_score: 0
      },
      reasoning_chain: [{
        step_type: 'analysis',
        description: 'Fallback analysis due to processing error',
        confidence: 60,
        data_used: ['popularity_metrics']
      }],
      enhancement_metrics: {
        nlp_processing_time: processingTime,
        ai_model_used: 'fallback',
        enhancement_level_applied: 'minimal',
        fallback_strategies_used: ['popularity_based'],
        cache_hit_rate: 0
      }
    };
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          systemInstruction: "You are an advanced movie recommendation AI with deep psychological understanding. Provide detailed, contextually aware recommendations."
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.content || '';
    } catch (error) {
      console.error('Enhanced Gemini API request failed:', error);
      throw error;
    }
  }

  private getGenreMap(): { [key: string]: number } {
    return {
      'action': 28,
      'adventure': 12,
      'animation': 16,
      'comedy': 35,
      'crime': 80,
      'documentary': 99,
      'drama': 18,
      'family': 10751,
      'fantasy': 14,
      'history': 36,
      'horror': 27,
      'music': 10402,
      'mystery': 9648,
      'romance': 10749,
      'science fiction': 878,
      'sci-fi': 878,
      'thriller': 53,
      'war': 10752,
      'western': 37
    };
  }

  private getMoodKeywords(emotion: string): string[] {
    const moodMap: { [key: string]: string[] } = {
      'happy': ['comedy', 'uplifting', 'feel good'],
      'sad': ['drama', 'emotional', 'heartwarming'],
      'anxious': ['calm', 'peaceful', 'light comedy'],
      'angry': ['action', 'thriller', 'justice'],
      'romantic': ['romance', 'love story'],
      'adventurous': ['adventure', 'action', 'exploration'],
      'contemplative': ['drama', 'philosophical', 'thought-provoking']
    };

    return moodMap[emotion] || ['popular', 'acclaimed'];
  }

  // Compatibility method to work with existing systems
  async analyzeQuery(query: { description: string }): Promise<any> {
    const enhancedQuery: EnhancedAIQuery = {
      raw_query: query.description,
      enhancement_level: 'standard'
    };

    const result = await this.analyzeEnhancedQuery(enhancedQuery);
    
    // Convert to legacy format
    return {
      movies: result.movies,
      explanation: result.explanation,
      confidence: result.confidence,
      tags: result.tags
    };
  }
}

export const enhancedGeminiNLP = new EnhancedGeminiNLPService();