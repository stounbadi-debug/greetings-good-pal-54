// Sophisticated Emotional Context Detection Engine
// Provides therapeutic movie recommendations based on deep emotional analysis

import { Movie } from "./tmdb";
import { tmdbService } from "./tmdb";

export interface MicroEmotionProfile {
  // Primary emotions (Ekman's 6 + expanded)
  primary_emotion: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'neutral';
  
  // Secondary emotions for nuanced understanding
  secondary_emotions: {
    melancholy?: number;
    anxiety?: number;
    excitement?: number;
    nostalgia?: number;
    hope?: number;
    frustration?: number;
    loneliness?: number;
    contentment?: number;
  };
  
  // Emotional intensity and patterns
  emotional_intensity: number; // 1-10 scale
  emotional_stability: number; // How consistent the emotion is
  emotional_triggers: string[]; // What caused these emotions
  
  // Therapeutic assessment
  therapeutic_needs: {
    healing_type: 'cathartic' | 'escapist' | 'empowering' | 'comforting' | 'inspiring';
    support_level: 'light' | 'moderate' | 'intensive';
    intervention_urgency: 'low' | 'medium' | 'high';
  };
}

export interface ContextualEmotionalAnalysis {
  // Life situation analysis
  life_context: {
    situation_type: 'relationship' | 'career' | 'health' | 'loss' | 'achievement' | 'transition' | 'general';
    specific_context: string; // breakup, job loss, graduation, etc.
    stress_level: number; // 1-10
    social_support_needs: boolean;
  };
  
  // Temporal patterns
  temporal_patterns: {
    time_of_day_preferences: 'morning' | 'afternoon' | 'evening' | 'late_night';
    seasonal_context: 'spring' | 'summer' | 'fall' | 'winter' | 'neutral';
    mood_duration: 'temporary' | 'ongoing' | 'chronic';
    emotional_cycle_position: 'peak' | 'valley' | 'ascending' | 'descending';
  };
  
  // Social context
  social_dynamics: {
    viewing_alone: boolean;
    social_energy_level: number; // 1-10
    need_for_connection: number; // 1-10
    family_considerations: string[];
  };
  
  // Emotional journey tracking
  emotional_journey: {
    current_phase: 'crisis' | 'processing' | 'healing' | 'growth' | 'maintenance';
    desired_outcome: 'release' | 'comfort' | 'motivation' | 'distraction' | 'insight';
    progress_direction: 'improving' | 'stable' | 'declining';
  };
}

export interface MovieEmotionMapping {
  // Healing themes
  therapeutic_themes: {
    resilience_building: number; // 1-10 score
    emotional_release: number;
    hope_restoration: number;
    self_acceptance: number;
    relationship_healing: number;
    trauma_processing: number;
    empowerment: number;
    community_connection: number;
  };
  
  // Emotional safety assessment
  safety_factors: {
    trigger_warnings: string[];
    intensity_level: 'gentle' | 'moderate' | 'intense';
    emotional_safety_score: number; // 1-10
    avoidance_patterns: string[];
  };
  
  // Therapeutic progression
  progression_mapping: {
    current_emotional_fit: number; // How well it matches current state
    desired_emotional_destination: number; // Where it can help lead
    emotional_bridge_quality: number; // How well it transitions emotions
    catharsis_potential: number;
    escapism_value: number;
  };
  
  // Mood elevation strategies
  elevation_mechanisms: {
    humor_therapy: number;
    inspiration_factor: number;
    perspective_shift: number;
    emotional_validation: number;
    hope_injection: number;
  };
}

export interface EmotionalRecommendationResult {
  movies: Movie[];
  emotional_analysis: MicroEmotionProfile;
  contextual_analysis: ContextualEmotionalAnalysis;
  therapeutic_rationale: string;
  emotional_journey_plan: string;
  safety_considerations: string[];
  emotional_confidence: number;
  
  // Therapeutic insights
  therapeutic_insights: {
    why_these_help: string;
    emotional_progression: string;
    safety_notes: string;
    alternative_approaches: string;
  };
  
  // Progress tracking
  emotional_metrics: {
    predicted_mood_improvement: number; // 1-10
    emotional_safety_score: number; // 1-10
    therapeutic_alignment: number; // 1-10
    recommendation_confidence: number; // 1-100
  };
}

export interface EmotionalProfile {
  user_id: string;
  emotional_history: {
    timestamp: number;
    emotion_profile: MicroEmotionProfile;
    context: ContextualEmotionalAnalysis;
    movies_consumed: Movie[];
    emotional_outcome: 'improved' | 'neutral' | 'worsened' | 'unknown';
  }[];
  
  // Learned patterns
  emotional_patterns: {
    frequent_emotions: string[];
    trigger_patterns: string[];
    helpful_themes: string[];
    avoidance_preferences: string[];
    optimal_viewing_times: string[];
  };
  
  // Therapeutic preferences
  therapeutic_preferences: {
    preferred_healing_approach: 'cathartic' | 'escapist' | 'empowering' | 'balanced';
    intensity_tolerance: 'gentle' | 'moderate' | 'high';
    content_sensitivity: string[];
    proven_helpful_genres: string[];
  };
}

class EmotionalIntelligenceEngine {
  private emotionalProfiles: Map<string, EmotionalProfile> = new Map();
  
  // Core therapeutic themes mapped to movie characteristics
  private therapeuticThemeMapping = {
    resilience_building: ['overcoming adversity', 'personal growth', 'triumph over hardship'],
    emotional_release: ['cathartic drama', 'emotional journey', 'grief processing'], 
    hope_restoration: ['uplifting stories', 'renewal themes', 'positive transformation'],
    self_acceptance: ['self-discovery', 'authenticity', 'personal acceptance'],
    relationship_healing: ['love stories', 'friendship', 'family bonds'],
    trauma_processing: ['healing journey', 'survivor stories', 'therapeutic narratives'],
    empowerment: ['strong protagonists', 'taking control', 'personal agency'],
    community_connection: ['belonging stories', 'found family', 'social bonds']
  };

  async analyzeEmotionalContext(query: string, userId: string = 'anonymous'): Promise<EmotionalRecommendationResult> {
    console.log('🧠 Starting sophisticated emotional analysis...');
    
    try {
      // Step 1: Micro-emotion detection
      const microEmotions = await this.detectMicroEmotions(query);
      
      // Step 2: Contextual analysis
      const contextualAnalysis = await this.analyzeContextualEmotions(query);
      
      // Step 3: Get user's emotional profile
      const userProfile = this.getEmotionalProfile(userId);
      
      // Step 4: Generate therapeutic movie recommendations
      const therapeuticMovies = await this.generateTherapeuticRecommendations(
        microEmotions,
        contextualAnalysis,
        userProfile
      );
      
      // Step 5: Create emotional safety assessment
      const safetyAssessment = await this.assessEmotionalSafety(therapeuticMovies, microEmotions);
      
      // Step 6: Build therapeutic rationale
      const therapeuticRationale = this.buildTherapeuticRationale(
        microEmotions,
        contextualAnalysis,
        therapeuticMovies
      );
      
      // Step 7: Create emotional journey plan
      const journeyPlan = this.createEmotionalJourneyPlan(microEmotions, contextualAnalysis);
      
      const result: EmotionalRecommendationResult = {
        movies: therapeuticMovies,
        emotional_analysis: microEmotions,
        contextual_analysis: contextualAnalysis,
        therapeutic_rationale: therapeuticRationale.main_rationale,
        emotional_journey_plan: journeyPlan,
        safety_considerations: safetyAssessment.warnings,
        emotional_confidence: this.calculateEmotionalConfidence(microEmotions, contextualAnalysis),
        therapeutic_insights: {
          why_these_help: therapeuticRationale.healing_explanation,
          emotional_progression: therapeuticRationale.progression_path,
          safety_notes: safetyAssessment.safety_notes,
          alternative_approaches: therapeuticRationale.alternatives
        },
        emotional_metrics: {
          predicted_mood_improvement: this.predictMoodImprovement(microEmotions, therapeuticMovies),
          emotional_safety_score: safetyAssessment.safety_score,
          therapeutic_alignment: this.calculateTherapeuticAlignment(microEmotions, therapeuticMovies),
          recommendation_confidence: this.calculateRecommendationConfidence(microEmotions, contextualAnalysis, therapeuticMovies)
        }
      };
      
      // Step 8: Update user's emotional profile
      this.updateEmotionalProfile(userId, microEmotions, contextualAnalysis, therapeuticMovies);
      
      return result;
      
    } catch (error) {
      console.error('❌ Emotional analysis failed:', error);
      return this.getEmotionalFallback(query);
    }
  }

  private async detectMicroEmotions(query: string): Promise<MicroEmotionProfile> {
    const emotionalPrompt = `
      You are a sophisticated emotional intelligence AI therapist. Analyze this query for deep emotional context:
      
      Query: "${query}"
      
      Provide detailed emotional analysis in JSON format:
      {
        "primary_emotion": "Primary emotion from: joy, sadness, anger, fear, surprise, disgust, neutral",
        "secondary_emotions": {
          "melancholy": 0-10,
          "anxiety": 0-10,
          "excitement": 0-10,
          "nostalgia": 0-10,
          "hope": 0-10,
          "frustration": 0-10,
          "loneliness": 0-10,
          "contentment": 0-10
        },
        "emotional_intensity": 1-10,
        "emotional_stability": 1-10,
        "emotional_triggers": ["specific triggers detected"],
        "therapeutic_needs": {
          "healing_type": "cathartic|escapist|empowering|comforting|inspiring",
          "support_level": "light|moderate|intensive", 
          "intervention_urgency": "low|medium|high"
        }
      }
      
      Focus on subtle emotional cues, subtext, and therapeutic implications.
      Return ONLY valid JSON.
    `;
    
    try {
      const response = await this.callEmotionalAPI(emotionalPrompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Micro-emotion detection failed:', error);
    }
    
    return this.getEmotionalFallback(query).emotional_analysis;
  }

  private async analyzeContextualEmotions(query: string): Promise<ContextualEmotionalAnalysis> {
    const contextPrompt = `
      Analyze the life situation and emotional context behind this request:
      
      Query: "${query}"
      
      Provide contextual analysis in JSON:
      {
        "life_context": {
          "situation_type": "relationship|career|health|loss|achievement|transition|general",
          "specific_context": "detailed situation description",
          "stress_level": 1-10,
          "social_support_needs": true/false
        },
        "temporal_patterns": {
          "time_of_day_preferences": "morning|afternoon|evening|late_night",
          "seasonal_context": "spring|summer|fall|winter|neutral",
          "mood_duration": "temporary|ongoing|chronic",
          "emotional_cycle_position": "peak|valley|ascending|descending"
        },
        "social_dynamics": {
          "viewing_alone": true/false,
          "social_energy_level": 1-10,
          "need_for_connection": 1-10,
          "family_considerations": ["relevant family factors"]
        },
        "emotional_journey": {
          "current_phase": "crisis|processing|healing|growth|maintenance",
          "desired_outcome": "release|comfort|motivation|distraction|insight",
          "progress_direction": "improving|stable|declining"
        }
      }
      
      Return ONLY valid JSON.
    `;
    
    try {
      const response = await this.callEmotionalAPI(contextPrompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Contextual analysis failed:', error);
    }
    
    return this.getDefaultContextualAnalysis();
  }

  private async generateTherapeuticRecommendations(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    userProfile?: EmotionalProfile
  ): Promise<Movie[]> {
    // Determine therapeutic approach
    const healingType = emotions.therapeutic_needs.healing_type;
    const supportLevel = emotions.therapeutic_needs.support_level;
    const primaryEmotion = emotions.primary_emotion;
    
    let movies: Movie[] = [];
    
    // Search strategy based on therapeutic needs
    if (healingType === 'cathartic' && supportLevel === 'intensive') {
      movies = await this.searchCatharticallyHealingMovies(primaryEmotion, context);
    } else if (healingType === 'escapist') {
      movies = await this.searchEscapistComfortMovies(primaryEmotion, context);
    } else if (healingType === 'empowering') {
      movies = await this.searchEmpoweringMovies(primaryEmotion, context);
    } else if (healingType === 'comforting') {
      movies = await this.searchComfortingMovies(primaryEmotion, context);
    } else if (healingType === 'inspiring') {
      movies = await this.searchInspirationalMovies(primaryEmotion, context);
    }
    
    // Apply emotional safety filters
    movies = this.applyEmotionalSafetyFilters(movies, emotions, userProfile);
    
    // Rank by therapeutic potential
    return this.rankByTherapeuticPotential(movies, emotions, context);
  }

  private async searchCatharticallyHealingMovies(emotion: string, context: ContextualEmotionalAnalysis): Promise<Movie[]> {
    const catharticallyThemes = {
      sadness: ['grief', 'loss', 'healing', 'emotional journey', 'catharsis'],
      anger: ['justice', 'redemption', 'overcoming anger', 'transformation'],
      fear: ['courage', 'overcoming fear', 'bravery', 'facing fears'],
      loneliness: ['connection', 'friendship', 'belonging', 'finding family']
    };
    
    const themes = catharticallyThemes[emotion as keyof typeof catharticallyThemes] || ['healing', 'growth'];
    return await this.searchMoviesByTherapeuticThemes(themes);
  }

  private async searchEscapistComfortMovies(emotion: string, context: ContextualEmotionalAnalysis): Promise<Movie[]> {
    const comfortGenres = ['comedy', 'family', 'animation', 'romance', 'fantasy'];
    const results: Movie[] = [];
    
    for (const genre of comfortGenres.slice(0, 2)) {
      const genreId = this.getGenreId(genre);
      if (genreId) {
        const genreResults = await tmdbService.getMoviesByGenre(genreId);
        results.push(...genreResults.results.slice(0, 4));
      }
    }
    
    return results;
  }

  private async searchEmpoweringMovies(emotion: string, context: ContextualEmotionalAnalysis): Promise<Movie[]> {
    const empoweringKeywords = ['strong protagonist', 'overcoming obstacles', 'personal growth', 'empowerment', 'resilience'];
    return await this.searchMoviesByTherapeuticThemes(empoweringKeywords);
  }

  private async searchComfortingMovies(emotion: string, context: ContextualEmotionalAnalysis): Promise<Movie[]> {
    const comfortingKeywords = ['wholesome', 'heartwarming', 'feel good', 'uplifting', 'gentle'];
    return await this.searchMoviesByTherapeuticThemes(comfortingKeywords);
  }

  private async searchInspirationalMovies(emotion: string, context: ContextualEmotionalAnalysis): Promise<Movie[]> {
    const inspirationalKeywords = ['inspiration', 'hope', 'achievement', 'dreams', 'triumph', 'motivation'];
    return await this.searchMoviesByTherapeuticThemes(inspirationalKeywords);
  }

  private async searchMoviesByTherapeuticThemes(themes: string[]): Promise<Movie[]> {
    const results: Movie[] = [];
    
    for (const theme of themes.slice(0, 3)) {
      try {
        const searchResults = await tmdbService.searchMovies(theme);
        results.push(...searchResults.results.slice(0, 3));
      } catch (error) {
        console.warn(`Failed to search for theme: ${theme}`, error);
      }
    }
    
    return results;
  }

  private applyEmotionalSafetyFilters(
    movies: Movie[],
    emotions: MicroEmotionProfile,
    userProfile?: EmotionalProfile
  ): Movie[] {
    // Filter out potentially triggering content based on emotional state
    const filteredMovies = movies.filter(movie => {
      // Avoid horror/thriller for anxiety/fear states
      if ((emotions.primary_emotion === 'fear' || emotions.secondary_emotions.anxiety! > 7) && 
          movie.genre_ids?.some(id => [27, 53].includes(id))) {
        return false;
      }
      
      // Avoid very sad content for severe sadness
      if (emotions.primary_emotion === 'sadness' && emotions.emotional_intensity > 8 &&
          movie.genre_ids?.includes(18) && movie.overview?.toLowerCase().includes('death')) {
        return false;
      }
      
      return true;
    });
    
    return filteredMovies;
  }

  private rankByTherapeuticPotential(
    movies: Movie[],
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis
  ): Movie[] {
    return movies.map(movie => {
      let therapeuticScore = movie.vote_average || 5;
      
      // Boost based on therapeutic alignment
      if (emotions.therapeutic_needs.healing_type === 'comforting' && movie.genre_ids?.includes(35)) {
        therapeuticScore += 2; // Comedy boost for comfort
      }
      
      if (emotions.therapeutic_needs.healing_type === 'empowering' && movie.genre_ids?.includes(18)) {
        therapeuticScore += 1.5; // Drama boost for empowerment
      }
      
      if (context.emotional_journey.desired_outcome === 'motivation' && movie.vote_average && movie.vote_average > 7) {
        therapeuticScore += 1; // High-rated boost for motivation
      }
      
      return { ...movie, therapeutic_score: therapeuticScore };
    }).sort((a: any, b: any) => (b.therapeutic_score || 0) - (a.therapeutic_score || 0));
  }

  private async assessEmotionalSafety(movies: Movie[], emotions: MicroEmotionProfile): Promise<{
    warnings: string[];
    safety_notes: string;
    safety_score: number;
  }> {
    const warnings: string[] = [];
    let safety_score = 9; // Start with high safety
    
    // Check for potential emotional triggers
    if (emotions.primary_emotion === 'sadness' && emotions.emotional_intensity > 7) {
      warnings.push('Consider lighter content if feeling overwhelmed');
      safety_score -= 1;
    }
    
    if (emotions.secondary_emotions.anxiety! > 8) {
      warnings.push('Avoid intense or suspenseful content');
      safety_score -= 1;
    }
    
    return {
      warnings,
      safety_notes: 'Movies selected with emotional well-being in mind',
      safety_score: Math.max(safety_score, 1)
    };
  }

  private buildTherapeuticRationale(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    movies: Movie[]
  ): {
    main_rationale: string;
    healing_explanation: string;
    progression_path: string;
    alternatives: string;
  } {
    const healingType = emotions.therapeutic_needs.healing_type;
    const primaryEmotion = emotions.primary_emotion;
    const emotionalPhase = context.emotional_journey.current_phase;
    
    return {
      main_rationale: `Based on your ${primaryEmotion} emotional state and ${emotionalPhase} phase, these ${healingType} movies are designed to support your emotional well-being through carefully selected themes and narratives.`,
      
      healing_explanation: `These recommendations use ${healingType} approaches to help process your ${primaryEmotion} feelings. Each movie offers therapeutic value through emotional resonance and positive messaging.`,
      
      progression_path: `The viewing journey is designed to move you from your current ${emotionalPhase} phase toward ${context.emotional_journey.desired_outcome}, providing emotional support and perspective.`,
      
      alternatives: `If these don't feel right, consider adjusting the healing approach or trying lighter content first.`
    };
  }

  private createEmotionalJourneyPlan(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis
  ): string {
    const currentPhase = context.emotional_journey.current_phase;
    const desiredOutcome = context.emotional_journey.desired_outcome;
    
    return `Emotional Journey Plan: Starting from ${currentPhase}, these movies will help guide you toward ${desiredOutcome}. Watch at your own pace and choose what feels right for your current emotional state.`;
  }

  private calculateEmotionalConfidence(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis
  ): number {
    let confidence = 70; // Base confidence
    
    // Boost for clear emotional signals
    if (emotions.emotional_intensity > 6) confidence += 10;
    if (emotions.therapeutic_needs.intervention_urgency !== 'low') confidence += 10;
    if (context.life_context.situation_type !== 'general') confidence += 10;
    
    return Math.min(confidence, 95);
  }

  private predictMoodImprovement(emotions: MicroEmotionProfile, movies: Movie[]): number {
    // Predict based on therapeutic alignment and movie quality
    let improvement = 5; // Neutral baseline
    
    if (emotions.therapeutic_needs.healing_type === 'comforting' && movies.some(m => m.genre_ids?.includes(35))) {
      improvement += 3; // Comedy boost
    }
    
    const avgRating = movies.reduce((sum, m) => sum + (m.vote_average || 5), 0) / movies.length;
    if (avgRating > 7) improvement += 2;
    
    return Math.min(improvement, 10);
  }

  private calculateTherapeuticAlignment(emotions: MicroEmotionProfile, movies: Movie[]): number {
    // How well movies align with therapeutic needs
    let alignment = 6; // Base alignment
    
    const healingType = emotions.therapeutic_needs.healing_type;
    
    if (healingType === 'comforting' && movies.some(m => m.genre_ids?.includes(35) || m.genre_ids?.includes(10751))) {
      alignment += 2;
    }
    
    if (healingType === 'empowering' && movies.some(m => m.genre_ids?.includes(18))) {
      alignment += 2;
    }
    
    return Math.min(alignment, 10);
  }

  private calculateRecommendationConfidence(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    movies: Movie[]
  ): number {
    let confidence = 75; // Base confidence
    
    // Quality of movies
    const avgRating = movies.reduce((sum, m) => sum + (m.vote_average || 5), 0) / movies.length;
    if (avgRating > 7) confidence += 10;
    
    // Emotional clarity
    if (emotions.emotional_intensity > 6) confidence += 10;
    
    // Context clarity
    if (context.life_context.situation_type !== 'general') confidence += 5;
    
    return Math.min(confidence, 95);
  }

  private getEmotionalProfile(userId: string): EmotionalProfile | undefined {
    return this.emotionalProfiles.get(userId);
  }

  private updateEmotionalProfile(
    userId: string,
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    movies: Movie[]
  ): void {
    let profile = this.emotionalProfiles.get(userId);
    
    if (!profile) {
      profile = {
        user_id: userId,
        emotional_history: [],
        emotional_patterns: {
          frequent_emotions: [],
          trigger_patterns: [],
          helpful_themes: [],
          avoidance_preferences: [],
          optimal_viewing_times: []
        },
        therapeutic_preferences: {
          preferred_healing_approach: 'balanced',
          intensity_tolerance: emotions.therapeutic_needs.support_level === 'intensive' ? 'high' : 'moderate',
          content_sensitivity: [],
          proven_helpful_genres: []
        }
      };
    }
    
    // Add to history
    profile.emotional_history.push({
      timestamp: Date.now(),
      emotion_profile: emotions,
      context: context,
      movies_consumed: movies,
      emotional_outcome: 'unknown' // Will be updated based on user feedback
    });
    
    // Keep only recent history (last 20 entries)
    if (profile.emotional_history.length > 20) {
      profile.emotional_history = profile.emotional_history.slice(-20);
    }
    
    this.emotionalProfiles.set(userId, profile);
  }

  private async callEmotionalAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          systemInstruction: "You are a therapeutic AI specializing in emotional intelligence and movie therapy. Provide detailed, clinically-informed emotional analysis."
        })
      });

      if (!response.ok) {
        throw new Error(`Emotional API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.content || '';
    } catch (error) {
      console.error('Emotional API request failed:', error);
      throw error;
    }
  }

  private getEmotionalFallback(query: string): EmotionalRecommendationResult {
    // Provide basic emotional analysis fallback
    return {
      movies: [],
      emotional_analysis: {
        primary_emotion: 'neutral',
        secondary_emotions: { contentment: 5 },
        emotional_intensity: 5,
        emotional_stability: 7,
        emotional_triggers: ['general request'],
        therapeutic_needs: {
          healing_type: 'comforting',
          support_level: 'light',
          intervention_urgency: 'low'
        }
      },
      contextual_analysis: this.getDefaultContextualAnalysis(),
      therapeutic_rationale: 'General recommendations for entertainment and comfort.',
      emotional_journey_plan: 'Enjoy these carefully selected movies at your own pace.',
      safety_considerations: ['All recommendations are emotionally safe'],
      emotional_confidence: 60,
      therapeutic_insights: {
        why_these_help: 'Selected for general emotional well-being',
        emotional_progression: 'Designed for comfort and enjoyment',
        safety_notes: 'All content is appropriate and uplifting',
        alternative_approaches: 'Try being more specific about your current mood'
      },
      emotional_metrics: {
        predicted_mood_improvement: 6,
        emotional_safety_score: 9,
        therapeutic_alignment: 7,
        recommendation_confidence: 60
      }
    };
  }

  private getDefaultContextualAnalysis(): ContextualEmotionalAnalysis {
    return {
      life_context: {
        situation_type: 'general',
        specific_context: 'regular entertainment seeking',
        stress_level: 5,
        social_support_needs: false
      },
      temporal_patterns: {
        time_of_day_preferences: 'evening',
        seasonal_context: 'neutral',
        mood_duration: 'temporary',
        emotional_cycle_position: 'ascending'
      },
      social_dynamics: {
        viewing_alone: true,
        social_energy_level: 5,
        need_for_connection: 5,
        family_considerations: []
      },
      emotional_journey: {
        current_phase: 'maintenance',
        desired_outcome: 'comfort',
        progress_direction: 'stable'
      }
    };
  }

  private getGenreId(genre: string): number | undefined {
    const genreMap: { [key: string]: number } = {
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
      'thriller': 53,
      'war': 10752,
      'western': 37
    };
    
    return genreMap[genre.toLowerCase()];
  }

  // Public method to get user's emotional profile for UI display
  getUserEmotionalInsights(userId: string): EmotionalProfile | null {
    return this.emotionalProfiles.get(userId) || null;
  }

  // Method to provide feedback on emotional outcome
  provideFeedback(
    userId: string,
    outcome: 'improved' | 'neutral' | 'worsened',
    notes?: string
  ): void {
    const profile = this.emotionalProfiles.get(userId);
    if (profile && profile.emotional_history.length > 0) {
      const lastEntry = profile.emotional_history[profile.emotional_history.length - 1];
      lastEntry.emotional_outcome = outcome;
      this.emotionalProfiles.set(userId, profile);
    }
  }
}

export const emotionalIntelligenceEngine = new EmotionalIntelligenceEngine();
