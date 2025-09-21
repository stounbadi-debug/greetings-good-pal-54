// Advanced NLP Query Processor for CineDiscover
// Handles complex conversational queries with psychological and contextual analysis

import { Movie } from "./tmdb";

export interface NLPQuery {
  raw_query: string;
  user_id?: string;
  conversation_id?: string;
  context?: ConversationContext;
}

export interface ConversationContext {
  previous_queries: string[];
  user_preferences: UserPreferences;
  session_metadata: SessionMetadata;
}

export interface UserPreferences {
  favorite_genres?: string[];
  disliked_genres?: string[];
  preferred_era?: string;
  content_rating_preference?: string;
  language_preference?: string;
  viewing_habits?: ViewingHabits;
}

export interface ViewingHabits {
  typical_viewing_time?: 'weeknight' | 'weekend' | 'date_night' | 'family_time';
  attention_span?: 'short' | 'medium' | 'long';
  mood_patterns?: Record<string, string[]>;
}

export interface SessionMetadata {
  time_of_day?: string;
  day_of_week?: string;
  season?: string;
  estimated_mood?: string;
}

export interface ProcessedQuery {
  // Core Analysis
  complexity_score: number; // 1-100
  intent_classification: QueryIntent;
  emotional_state: EmotionalState;
  
  // Extracted Entities
  entities: ExtractedEntities;
  constraints: QueryConstraints;
  temporal_context: TemporalContext;
  
  // Processing Metadata
  processing_confidence: number;
  routing_recommendation: ProcessingRoute;
  fallback_strategies: string[];
  
  // Enhanced Prompting Data
  psychological_profile: PsychologicalProfile;
  context_enrichment: ContextEnrichment;
}

export interface QueryIntent {
  primary_intent: 'recommend' | 'search' | 'compare' | 'discover' | 'information' | 'mood_based';
  secondary_intents: string[];
  specificity_level: 'vague' | 'moderate' | 'specific' | 'highly_specific';
  urgency_level: 'low' | 'medium' | 'high';
}

export interface EmotionalState {
  primary_emotion: string;
  emotional_intensity: number; // 1-100
  emotional_context: string;
  mood_descriptors: string[];
  emotional_needs: string[];
}

export interface ExtractedEntities {
  genres: string[];
  actors: string[];
  directors: string[];
  themes: string[];
  plot_elements: string[];
  visual_styles: string[];
  narrative_structures: string[];
  cultural_references: string[];
}

export interface QueryConstraints {
  viewing_situation: ViewingSituation;
  content_restrictions: ContentRestrictions;
  time_constraints: TimeConstraints;
  technical_constraints: TechnicalConstraints;
}

export interface ViewingSituation {
  audience_type: 'solo' | 'couple' | 'family' | 'friends' | 'mixed';
  age_considerations: string[];
  social_context: string;
  viewing_environment: 'home' | 'theater' | 'mobile' | 'unknown';
}

export interface ContentRestrictions {
  age_rating: string[];
  content_warnings: string[];
  genre_exclusions: string[];
  cultural_sensitivities: string[];
}

export interface TimeConstraints {
  preferred_duration: string;
  available_time: string;
  viewing_window: string;
}

export interface TechnicalConstraints {
  platform_preferences: string[];
  quality_requirements: string[];
  accessibility_needs: string[];
}

export interface TemporalContext {
  time_period_preference: string;
  release_year_range: { from?: number; to?: number };
  cultural_era: string;
  seasonal_relevance: string;
}

export interface ProcessingRoute {
  recommended_ai_model: 'gemini_advanced' | 'gemini_standard' | 'fallback';
  processing_strategy: 'comprehensive' | 'fast' | 'balanced' | 'specialized';
  enhancement_level: 'minimal' | 'standard' | 'maximum';
}

export interface PsychologicalProfile {
  personality_indicators: string[];
  viewing_motivations: string[];
  emotional_triggers: string[];
  sophistication_level: 'mainstream' | 'indie' | 'arthouse' | 'mixed';
  risk_tolerance: 'safe' | 'moderate' | 'adventurous';
}

export interface ContextEnrichment {
  implicit_preferences: string[];
  inferred_constraints: string[];
  contextual_keywords: string[];
  cultural_context: string;
  social_dynamics: string[];
}

class NLPProcessor {
  private emotionKeywords = {
    happy: ['happy', 'joyful', 'cheerful', 'uplifting', 'positive', 'feel good', 'celebration'],
    sad: ['sad', 'melancholy', 'depressed', 'down', 'blue', 'heartbroken', 'emotional'],
    anxious: ['anxious', 'stressed', 'worried', 'tense', 'nervous', 'overwhelming'],
    angry: ['angry', 'frustrated', 'irritated', 'mad', 'furious', 'rage'],
    romantic: ['romantic', 'love', 'dating', 'valentine', 'anniversary', 'intimate'],
    adventurous: ['adventure', 'exciting', 'thrilling', 'exploration', 'journey'],
    contemplative: ['thoughtful', 'philosophical', 'deep', 'meaningful', 'reflective'],
    nostalgic: ['nostalgic', 'memories', 'childhood', 'past', 'remember', 'classic']
  };

  private intentKeywords = {
    recommend: ['recommend', 'suggest', 'what should i watch', 'need something', 'looking for'],
    search: ['find', 'search', 'locate', 'about', 'where can i find'],
    compare: ['compare', 'versus', 'vs', 'better', 'difference between', 'similar to'],
    discover: ['discover', 'explore', 'new', 'different', 'surprise me', 'random'],
    information: ['tell me about', 'what is', 'who is', 'explain', 'details about'],
    mood_based: ['mood for', 'feeling like', 'in the mood', 'vibe', 'atmosphere']
  };

  private complexityIndicators = {
    high: ['multi-layered', 'complex narrative', 'psychological', 'nuanced', 'sophisticated'],
    medium: ['but', 'however', 'except', 'although', 'with constraints'],
    low: ['simple', 'basic', 'straightforward', 'easy', 'light']
  };

  async processQuery(query: NLPQuery): Promise<ProcessedQuery> {
    console.log('🧠 Processing advanced NLP query:', query.raw_query);

    const analysis = await this.performComprehensiveAnalysis(query);
    const routing = this.determineProcessingRoute(analysis);
    const psychological = this.buildPsychologicalProfile(query, analysis);
    const contextEnrichment = this.enrichContext(query, analysis);

    return {
      complexity_score: analysis.complexity_score,
      intent_classification: analysis.intent,
      emotional_state: analysis.emotional_state,
      entities: analysis.entities,
      constraints: analysis.constraints,
      temporal_context: analysis.temporal_context,
      processing_confidence: analysis.processing_confidence,
      routing_recommendation: routing,
      fallback_strategies: this.generateFallbackStrategies(analysis),
      psychological_profile: psychological,
      context_enrichment: contextEnrichment
    };
  }

  private async performComprehensiveAnalysis(query: NLPQuery): Promise<any> {
    const rawQuery = query.raw_query.toLowerCase();
    
    // Complexity Analysis
    const complexity_score = this.calculateComplexityScore(rawQuery);
    
    // Intent Classification
    const intent = this.classifyIntent(rawQuery);
    
    // Emotional State Detection
    const emotional_state = this.detectEmotionalState(rawQuery);
    
    // Entity Extraction
    const entities = this.extractEntities(rawQuery);
    
    // Constraint Extraction
    const constraints = this.extractConstraints(rawQuery, query.context);
    
    // Temporal Context
    const temporal_context = this.extractTemporalContext(rawQuery);
    
    // Processing Confidence
    const processing_confidence = this.calculateProcessingConfidence(
      complexity_score, intent, emotional_state, entities
    );

    return {
      complexity_score,
      intent,
      emotional_state,
      entities,
      constraints,
      temporal_context,
      processing_confidence
    };
  }

  private calculateComplexityScore(query: string): number {
    let score = 30; // Base score

    // Length indicators
    const wordCount = query.split(' ').length;
    score += Math.min(wordCount * 2, 20); // Max 20 points for length

    // Conjunction complexity
    const conjunctions = ['but', 'however', 'although', 'except', 'while', 'whereas'];
    const conjunctionCount = conjunctions.filter(c => query.includes(c)).length;
    score += conjunctionCount * 15; // Complex conditional statements

    // Multi-criteria indicators
    const criteriaIndicators = ['and', 'or', 'also', 'plus', 'with', 'that has'];
    score += criteriaIndicators.filter(c => query.includes(c)).length * 8;

    // Emotional complexity
    const emotionCount = Object.keys(this.emotionKeywords).filter(emotion =>
      this.emotionKeywords[emotion as keyof typeof this.emotionKeywords].some(keyword => query.includes(keyword))
    ).length;
    score += emotionCount * 10;

    // Constraint complexity
    const constraintKeywords = ['family-friendly', 'not too', 'appropriate for', 'suitable for', 'under', 'over'];
    score += constraintKeywords.filter(c => query.includes(c)).length * 12;

    // Sophisticated language
    const sophisticatedWords = ['cinematography', 'narrative', 'character development', 'philosophical', 'nuanced'];
    score += sophisticatedWords.filter(w => query.includes(w)).length * 15;

    return Math.min(score, 100);
  }

  private classifyIntent(query: string): QueryIntent {
    const intentScores: Record<string, number> = {};

    // Calculate scores for each intent
    Object.entries(this.intentKeywords).forEach(([intent, keywords]) => {
      intentScores[intent] = keywords.filter(keyword => query.includes(keyword)).length;
    });

    // Find primary intent
    const primary_intent = Object.entries(intentScores)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'recommend';

    // Secondary intents
    const secondary_intents = Object.entries(intentScores)
      .filter(([intent, score]) => intent !== primary_intent && score > 0)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([intent]) => intent);

    // Determine specificity
    let specificity_level: 'vague' | 'moderate' | 'specific' | 'highly_specific' = 'vague';
    if (query.length > 100) specificity_level = 'highly_specific';
    else if (query.length > 50) specificity_level = 'specific';
    else if (query.length > 20) specificity_level = 'moderate';

    // Urgency level
    const urgencyKeywords = ['need', 'urgent', 'tonight', 'now', 'immediately', 'asap'];
    const urgency_level = urgencyKeywords.some(k => query.includes(k)) ? 'high' : 'medium';

    return {
      primary_intent: primary_intent as any,
      secondary_intents,
      specificity_level,
      urgency_level
    };
  }

  private detectEmotionalState(query: string): EmotionalState {
    const emotionScores: Record<string, number> = {};

    // Calculate emotion scores
    Object.entries(this.emotionKeywords).forEach(([emotion, keywords]) => {
      emotionScores[emotion] = keywords.filter(keyword => query.includes(keyword)).length;
    });

    // Find primary emotion
    const primary_emotion = Object.entries(emotionScores)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'neutral';

    // Emotional intensity indicators
    const intensityKeywords = ['really', 'very', 'extremely', 'super', 'incredibly'];
    const emotional_intensity = Math.min(
      50 + (intensityKeywords.filter(k => query.includes(k)).length * 15), 
      100
    );

    // Context-based emotion detection
    const contextEmotions = [];
    if (query.includes('bad day') || query.includes('rough day')) {
      contextEmotions.push('needs_comfort');
    }
    if (query.includes('celebrate') || query.includes('good news')) {
      contextEmotions.push('celebratory');
    }
    if (query.includes('date night') || query.includes('romantic evening')) {
      contextEmotions.push('romantic');
    }

    return {
      primary_emotion,
      emotional_intensity,
      emotional_context: contextEmotions.join(', ') || 'general',
      mood_descriptors: Object.keys(emotionScores).filter(e => emotionScores[e] > 0),
      emotional_needs: this.inferEmotionalNeeds(primary_emotion, contextEmotions)
    };
  }

  private inferEmotionalNeeds(primaryEmotion: string, contextEmotions: string[]): string[] {
    const needsMap: Record<string, string[]> = {
      sad: ['comfort', 'hope', 'emotional_catharsis', 'uplifting_messages'],
      anxious: ['calm', 'reassurance', 'distraction', 'light_content'],
      angry: ['catharsis', 'justice', 'validation', 'action_release'],
      happy: ['maintain_mood', 'celebration', 'shared_joy', 'positive_energy'],
      romantic: ['connection', 'intimacy', 'emotion', 'relationship_themes'],
      adventurous: ['excitement', 'exploration', 'adrenaline', 'new_experiences'],
      contemplative: ['depth', 'meaning', 'reflection', 'intellectual_stimulation']
    };

    return needsMap[primaryEmotion] || ['entertainment', 'engagement'];
  }

  private extractEntities(query: string): ExtractedEntities {
    // Genre extraction
    const genreKeywords = {
      'action': ['action', 'fight', 'battle', 'war', 'combat'],
      'comedy': ['comedy', 'funny', 'humor', 'laugh', 'hilarious'],
      'drama': ['drama', 'emotional', 'serious', 'character study'],
      'horror': ['horror', 'scary', 'frightening', 'terror', 'spooky'],
      'romance': ['romance', 'love', 'romantic', 'relationship'],
      'thriller': ['thriller', 'suspense', 'tension', 'edge of seat'],
      'sci-fi': ['sci-fi', 'science fiction', 'futuristic', 'space', 'alien'],
      'fantasy': ['fantasy', 'magic', 'magical', 'wizard', 'dragon'],
      'mystery': ['mystery', 'detective', 'investigation', 'whodunit'],
      'documentary': ['documentary', 'real', 'true story', 'factual']
    };

    const genres = Object.entries(genreKeywords)
      .filter(([, keywords]) => keywords.some(k => query.includes(k)))
      .map(([genre]) => genre);

    // Theme extraction
    const themes = this.extractThemes(query);
    
    // Visual style extraction
    const visual_styles = this.extractVisualStyles(query);

    return {
      genres,
      actors: this.extractActors(query),
      directors: this.extractDirectors(query),
      themes,
      plot_elements: this.extractPlotElements(query),
      visual_styles,
      narrative_structures: this.extractNarrativeStructures(query),
      cultural_references: this.extractCulturalReferences(query)
    };
  }

  private extractThemes(query: string): string[] {
    const themeKeywords = {
      'coming_of_age': ['growing up', 'coming of age', 'teenager', 'adolescent'],
      'redemption': ['redemption', 'second chance', 'forgiveness', 'making amends'],
      'family': ['family', 'parents', 'children', 'siblings', 'generational'],
      'friendship': ['friendship', 'friends', 'buddy', 'companions'],
      'justice': ['justice', 'right vs wrong', 'moral', 'ethics', 'fairness'],
      'survival': ['survival', 'struggle', 'perseverance', 'endurance'],
      'identity': ['identity', 'self-discovery', 'who am i', 'finding myself'],
      'power': ['power', 'corruption', 'politics', 'control', 'influence']
    };

    return Object.entries(themeKeywords)
      .filter(([, keywords]) => keywords.some(k => query.includes(k)))
      .map(([theme]) => theme);
  }

  private extractVisualStyles(query: string): string[] {
    const styleKeywords = [
      'black and white', 'noir', 'colorful', 'dark', 'bright', 'gritty',
      'beautiful cinematography', 'visual effects', 'animation', 'live action'
    ];

    return styleKeywords.filter(style => query.includes(style));
  }

  private extractPlotElements(query: string): string[] {
    const plotKeywords = [
      'time travel', 'parallel universe', 'alternate reality', 'memory loss',
      'secret identity', 'undercover', 'heist', 'revenge', 'betrayal',
      'love triangle', 'forbidden love', 'mentor', 'hero journey'
    ];

    return plotKeywords.filter(element => query.includes(element));
  }

  private extractNarrativeStructures(query: string): string[] {
    const structureKeywords = [
      'flashback', 'non-linear', 'multiple perspectives', 'twist ending',
      'unreliable narrator', 'frame story', 'anthology'
    ];

    return structureKeywords.filter(structure => query.includes(structure));
  }

  private extractCulturalReferences(query: string): string[] {
    const culturalKeywords = [
      'japanese', 'korean', 'french', 'italian', 'bollywood', 'hollywood',
      'indie', 'arthouse', 'blockbuster', 'b-movie', 'cult classic'
    ];

    return culturalKeywords.filter(ref => query.includes(ref));
  }

  private extractActors(query: string): string[] {
    // This would ideally use a more sophisticated NER model
    // For now, we'll use pattern matching for common actor name patterns
    const actorPatterns = [
      /with ([A-Z][a-z]+ [A-Z][a-z]+)/g,
      /starring ([A-Z][a-z]+ [A-Z][a-z]+)/g,
      /([A-Z][a-z]+ [A-Z][a-z]+) movie/g
    ];

    const actors: string[] = [];
    actorPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(query)) !== null) {
        actors.push(match[1]);
      }
    });

    return actors;
  }

  private extractDirectors(query: string): string[] {
    // Similar pattern matching for directors
    const directorPatterns = [
      /directed by ([A-Z][a-z]+ [A-Z][a-z]+)/g,
      /([A-Z][a-z]+ [A-Z][a-z]+) film/g
    ];

    const directors: string[] = [];
    directorPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(query)) !== null) {
        directors.push(match[1]);
      }
    });

    return directors;
  }

  private extractConstraints(query: string, context?: ConversationContext): QueryConstraints {
    return {
      viewing_situation: this.extractViewingSituation(query),
      content_restrictions: this.extractContentRestrictions(query),
      time_constraints: this.extractTimeConstraints(query),
      technical_constraints: this.extractTechnicalConstraints(query)
    };
  }

  private extractViewingSituation(query: string): ViewingSituation {
    let audience_type: 'solo' | 'couple' | 'family' | 'friends' | 'mixed' = 'solo';
    const age_considerations: string[] = [];

    if (query.includes('family') || query.includes('kids') || query.includes('children')) {
      audience_type = 'family';
      age_considerations.push('child-appropriate');
    }
    if (query.includes('date') || query.includes('romantic evening')) {
      audience_type = 'couple';
    }
    if (query.includes('friends') || query.includes('group')) {
      audience_type = 'friends';
    }
    if (query.includes('daughter') || query.includes('son')) {
      age_considerations.push('parent-child viewing');
    }

    return {
      audience_type,
      age_considerations,
      social_context: this.extractSocialContext(query),
      viewing_environment: 'unknown'
    };
  }

  private extractSocialContext(query: string): string {
    if (query.includes('date night')) return 'romantic';
    if (query.includes('family time')) return 'family_bonding';
    if (query.includes('friends')) return 'social';
    if (query.includes('alone') || query.includes('by myself')) return 'solo';
    return 'casual';
  }

  private extractContentRestrictions(query: string): ContentRestrictions {
    const age_rating: string[] = [];
    const content_warnings: string[] = [];
    const genre_exclusions: string[] = [];

    // Age ratings
    if (query.includes('pg') || query.includes('family-friendly')) {
      age_rating.push('PG', 'G');
    }
    if (query.includes('r-rated') || query.includes('mature')) {
      age_rating.push('R');
    }

    // Content warnings
    if (query.includes('no violence')) {
      content_warnings.push('violence');
      genre_exclusions.push('action', 'horror');
    }
    if (query.includes('no scary') || query.includes('nothing frightening')) {
      content_warnings.push('scary_content');
      genre_exclusions.push('horror', 'thriller');
    }

    return {
      age_rating,
      content_warnings,
      genre_exclusions,
      cultural_sensitivities: []
    };
  }

  private extractTimeConstraints(query: string): TimeConstraints {
    const durationPatterns = [
      /under (\d+) (hours?|minutes?)/g,
      /less than (\d+) (hours?|minutes?)/g,
      /around (\d+) (hours?|minutes?)/g
    ];

    let preferred_duration = 'any';
    durationPatterns.forEach(pattern => {
      const match = pattern.exec(query);
      if (match) {
        preferred_duration = `${match[1]} ${match[2]}`;
      }
    });

    return {
      preferred_duration,
      available_time: 'flexible',
      viewing_window: 'any'
    };
  }

  private extractTechnicalConstraints(query: string): TechnicalConstraints {
    const platforms = ['netflix', 'hulu', 'disney+', 'amazon prime', 'hbo', 'apple tv'];
    const platform_preferences = platforms.filter(p => query.includes(p));

    return {
      platform_preferences,
      quality_requirements: [],
      accessibility_needs: []
    };
  }

  private extractTemporalContext(query: string): TemporalContext {
    let time_period_preference = 'any';
    let release_year_range: { from?: number; to?: number } = {};
    let cultural_era = 'contemporary';

    // Decade detection
    const decadePattern = /(\d{4})s/g;
    const decadeMatch = decadePattern.exec(query);
    if (decadeMatch) {
      const decade = parseInt(decadeMatch[1]);
      release_year_range = { from: decade, to: decade + 9 };
      time_period_preference = `${decade}s`;
    }

    // Era keywords
    if (query.includes('classic') || query.includes('golden age')) {
      release_year_range = { to: 1979 };
      cultural_era = 'classic_hollywood';
    }
    if (query.includes('recent') || query.includes('new')) {
      const currentYear = new Date().getFullYear();
      release_year_range = { from: currentYear - 5 };
      cultural_era = 'contemporary';
    }
    if (query.includes('modern')) {
      release_year_range = { from: 2000 };
      cultural_era = 'modern';
    }

    return {
      time_period_preference,
      release_year_range,
      cultural_era,
      seasonal_relevance: this.detectSeasonalRelevance(query)
    };
  }

  private detectSeasonalRelevance(query: string): string {
    const seasonKeywords = {
      'winter': ['winter', 'christmas', 'holiday', 'snow'],
      'summer': ['summer', 'beach', 'vacation', 'hot'],
      'fall': ['fall', 'autumn', 'halloween', 'thanksgiving'],
      'spring': ['spring', 'easter', 'renewal']
    };

    for (const [season, keywords] of Object.entries(seasonKeywords)) {
      if (keywords.some(k => query.includes(k))) {
        return season;
      }
    }

    return 'any';
  }

  private calculateProcessingConfidence(
    complexity: number,
    intent: QueryIntent,
    emotional: EmotionalState,
    entities: ExtractedEntities
  ): number {
    let confidence = 70; // Base confidence

    // Higher complexity can mean better analysis or more uncertainty
    if (complexity > 70) confidence += 10; // Complex queries with good analysis
    if (complexity < 30) confidence += 15; // Simple queries are reliable

    // Intent clarity
    if (intent.specificity_level === 'highly_specific') confidence += 15;
    if (intent.specificity_level === 'specific') confidence += 10;

    // Entity richness
    const entityCount = Object.values(entities).flat().length;
    confidence += Math.min(entityCount * 2, 10);

    // Emotional clarity
    if (emotional.emotional_intensity > 70) confidence += 5;

    return Math.min(confidence, 95);
  }

  private determineProcessingRoute(analysis: any): ProcessingRoute {
    const { complexity_score, intent, processing_confidence } = analysis;

    let recommended_ai_model: 'gemini_advanced' | 'gemini_standard' | 'fallback' = 'gemini_standard';
    let processing_strategy: 'comprehensive' | 'fast' | 'balanced' | 'specialized' = 'balanced';
    let enhancement_level: 'minimal' | 'standard' | 'maximum' = 'standard';

    // Determine AI model
    if (complexity_score > 70 && processing_confidence > 80) {
      recommended_ai_model = 'gemini_advanced';
      enhancement_level = 'maximum';
    } else if (complexity_score < 40 || processing_confidence < 60) {
      recommended_ai_model = 'fallback';
      enhancement_level = 'minimal';
    }

    // Determine processing strategy
    if (intent.urgency_level === 'high') {
      processing_strategy = 'fast';
    } else if (complexity_score > 80) {
      processing_strategy = 'comprehensive';
    } else if (intent.primary_intent === 'discover') {
      processing_strategy = 'specialized';
    }

    return {
      recommended_ai_model,
      processing_strategy,
      enhancement_level
    };
  }

  private buildPsychologicalProfile(query: NLPQuery, analysis: any): PsychologicalProfile {
    const rawQuery = query.raw_query.toLowerCase();
    
    const personality_indicators = this.extractPersonalityIndicators(rawQuery);
    const viewing_motivations = this.extractViewingMotivations(rawQuery, analysis.emotional_state);
    const emotional_triggers = this.identifyEmotionalTriggers(rawQuery);
    const sophistication_level = this.assessSophisticationLevel(rawQuery, analysis.entities);
    const risk_tolerance = this.assessRiskTolerance(rawQuery);

    return {
      personality_indicators,
      viewing_motivations,
      emotional_triggers,
      sophistication_level,
      risk_tolerance
    };
  }

  private extractPersonalityIndicators(query: string): string[] {
    const indicators: string[] = [];

    if (query.includes('analytical') || query.includes('thought-provoking')) {
      indicators.push('analytical');
    }
    if (query.includes('emotional') || query.includes('feel')) {
      indicators.push('emotionally-driven');
    }
    if (query.includes('adventure') || query.includes('exciting')) {
      indicators.push('thrill-seeking');
    }
    if (query.includes('comfort') || query.includes('familiar')) {
      indicators.push('comfort-seeking');
    }

    return indicators;
  }

  private extractViewingMotivations(query: string, emotionalState: EmotionalState): string[] {
    const motivations: string[] = [];

    // Based on emotional state
    if (emotionalState.primary_emotion === 'sad') {
      motivations.push('emotional_healing', 'comfort_seeking');
    }
    if (emotionalState.primary_emotion === 'happy') {
      motivations.push('mood_maintenance', 'shared_joy');
    }

    // Based on query content
    if (query.includes('escape') || query.includes('forget')) {
      motivations.push('escapism');
    }
    if (query.includes('learn') || query.includes('educational')) {
      motivations.push('educational');
    }
    if (query.includes('challenge') || query.includes('think')) {
      motivations.push('intellectual_stimulation');
    }

    return motivations.length > 0 ? motivations : ['entertainment'];
  }

  private identifyEmotionalTriggers(query: string): string[] {
    const triggers: string[] = [];

    if (query.includes('violence') || query.includes('no scary')) {
      triggers.push('violence_sensitive');
    }
    if (query.includes('sad ending') || query.includes('no crying')) {
      triggers.push('sad_content_sensitive');
    }
    if (query.includes('anxiety') || query.includes('stressful')) {
      triggers.push('anxiety_sensitive');
    }

    return triggers;
  }

  private assessSophisticationLevel(query: string, entities: ExtractedEntities): 'mainstream' | 'indie' | 'arthouse' | 'mixed' {
    let score = 0;

    // Sophisticated language
    const artKeywords = ['cinematography', 'auteur', 'nuanced', 'philosophical', 'existential'];
    score += artKeywords.filter(k => query.includes(k)).length * 2;

    // Cultural references
    if (entities.cultural_references.some(ref => 
      ['arthouse', 'indie', 'criterion', 'film festival'].includes(ref)
    )) {
      score += 3;
    }

    // Director mentions (more sophisticated audiences know directors)
    if (entities.directors.length > 0) score += 2;

    if (score > 5) return 'arthouse';
    if (score > 2) return 'indie';
    if (score > 0) return 'mixed';
    return 'mainstream';
  }

  private assessRiskTolerance(query: string): 'safe' | 'moderate' | 'adventurous' {
    if (query.includes('safe') || query.includes('familiar') || query.includes('mainstream')) {
      return 'safe';
    }
    if (query.includes('different') || query.includes('new') || query.includes('experimental')) {
      return 'adventurous';
    }
    return 'moderate';
  }

  private enrichContext(query: NLPQuery, analysis: any): ContextEnrichment {
    const rawQuery = query.raw_query.toLowerCase();

    return {
      implicit_preferences: this.extractImplicitPreferences(rawQuery, analysis),
      inferred_constraints: this.inferAdditionalConstraints(rawQuery, analysis),
      contextual_keywords: this.generateContextualKeywords(rawQuery, analysis),
      cultural_context: this.determineCulturalContext(rawQuery, analysis),
      social_dynamics: this.analyzeSocialDynamics(rawQuery, analysis)
    };
  }

  private extractImplicitPreferences(query: string, analysis: any): string[] {
    const preferences: string[] = [];

    // Infer from emotional state
    if (analysis.emotional_state.primary_emotion === 'anxious') {
      preferences.push('low_stress_content', 'predictable_outcomes');
    }

    // Infer from viewing situation
    if (analysis.constraints.viewing_situation.audience_type === 'family') {
      preferences.push('universally_appealing', 'positive_messages');
    }

    return preferences;
  }

  private inferAdditionalConstraints(query: string, analysis: any): string[] {
    const constraints: string[] = [];

    // Time-based constraints
    const timeOfDay = new Date().getHours();
    if (timeOfDay > 21) {
      constraints.push('late_night_appropriate');
    }

    return constraints;
  }

  private generateContextualKeywords(query: string, analysis: any): string[] {
    const keywords: string[] = [];

    // Add synonyms for detected themes
    analysis.entities.themes.forEach((theme: string) => {
      if (theme === 'friendship') {
        keywords.push('bonds', 'loyalty', 'companionship');
      }
      if (theme === 'family') {
        keywords.push('relationships', 'generational', 'home');
      }
    });

    return keywords;
  }

  private determineCulturalContext(query: string, analysis: any): string {
    if (analysis.entities.cultural_references.length > 0) {
      return analysis.entities.cultural_references[0];
    }
    
    // Default to current cultural context
    const currentYear = new Date().getFullYear();
    if (analysis.temporal_context.release_year_range.from && 
        analysis.temporal_context.release_year_range.from > currentYear - 10) {
      return 'contemporary';
    }

    return 'universal';
  }

  private analyzeSocialDynamics(query: string, analysis: any): string[] {
    const dynamics: string[] = [];

    const audienceType = analysis.constraints.viewing_situation.audience_type;
    
    if (audienceType === 'couple') {
      dynamics.push('shared_experience', 'conversation_starter');
    }
    if (audienceType === 'family') {
      dynamics.push('intergenerational_appeal', 'shared_values');
    }
    if (audienceType === 'friends') {
      dynamics.push('group_entertainment', 'social_commentary');
    }

    return dynamics;
  }

  private generateFallbackStrategies(analysis: any): string[] {
    const strategies: string[] = ['genre_based_search'];

    if (analysis.entities.genres.length > 0) {
      strategies.push('multi_genre_search');
    }

    if (analysis.emotional_state.primary_emotion !== 'neutral') {
      strategies.push('mood_based_fallback');
    }

    if (analysis.temporal_context.time_period_preference !== 'any') {
      strategies.push('era_based_search');
    }

    strategies.push('popularity_based_fallback');

    return strategies;
  }
}

export const nlpProcessor = new NLPProcessor();