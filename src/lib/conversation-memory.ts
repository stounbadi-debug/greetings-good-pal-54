// Multi-turn Conversation Memory System
// Tracks user interactions and context for enhanced recommendations

export interface ConversationEntry {
  id: string;
  conversation_id: string;
  timestamp: number;
  query: string;
  result_summary: string;
  user_feedback?: UserFeedback;
  context_tags: string[];
  emotional_state: string;
  recommendation_ids: number[];
}

export interface UserFeedback {
  rating?: number; // 1-5 stars
  liked_recommendations: number[]; // Movie IDs
  disliked_recommendations: number[]; // Movie IDs
  feedback_text?: string;
  interaction_type: 'viewed' | 'dismissed' | 'rated' | 'saved';
}

export interface ConversationSummary {
  conversation_id: string;
  total_queries: number;
  common_themes: string[];
  emotional_patterns: string[];
  preferred_genres: string[];
  feedback_patterns: FeedbackPattern[];
  user_evolution: UserEvolution;
}

export interface FeedbackPattern {
  pattern_type: 'genre_preference' | 'era_preference' | 'mood_correlation' | 'social_context';
  pattern_description: string;
  confidence: number;
  supporting_evidence: string[];
}

export interface UserEvolution {
  sophistication_growth: number; // -100 to 100
  genre_diversification: number; // -100 to 100
  emotional_stability: number; // 0 to 100
  preference_consistency: number; // 0 to 100
}

class ConversationMemoryManager {
  private conversations: Map<string, ConversationEntry[]> = new Map();
  private readonly MAX_CONVERSATION_LENGTH = 50;
  private readonly MEMORY_RETENTION_HOURS = 24 * 7; // 1 week

  constructor() {
    console.log('💭 Conversation Memory Manager initialized');
    this.cleanupOldConversations();
  }

  async updateConversation(
    conversationId: string,
    query: string,
    result: any,
    feedback?: UserFeedback
  ): Promise<void> {
    console.log('💭 Updating conversation memory:', conversationId);

    const entry: ConversationEntry = {
      id: this.generateEntryId(),
      conversation_id: conversationId,
      timestamp: Date.now(),
      query: query,
      result_summary: this.summarizeResult(result),
      user_feedback: feedback,
      context_tags: this.extractContextTags(query, result),
      emotional_state: result.nlp_analysis?.emotional_state?.primary_emotion || 'neutral',
      recommendation_ids: result.movies?.map((m: any) => m.id) || []
    };

    // Get or create conversation history
    const conversation = this.conversations.get(conversationId) || [];
    
    // Add new entry at the beginning
    conversation.unshift(entry);
    
    // Limit conversation length
    if (conversation.length > this.MAX_CONVERSATION_LENGTH) {
      conversation.splice(this.MAX_CONVERSATION_LENGTH);
    }
    
    // Store updated conversation
    this.conversations.set(conversationId, conversation);

    console.log(`💭 Conversation updated: ${conversation.length} entries`);
  }

  async addUserFeedback(
    conversationId: string,
    entryId: string,
    feedback: UserFeedback
  ): Promise<void> {
    console.log('👍 Adding user feedback:', entryId);

    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;

    const entry = conversation.find(e => e.id === entryId);
    if (entry) {
      entry.user_feedback = feedback;
      console.log('✅ Feedback added successfully');
    }
  }

  async getConversationHistory(
    conversationId: string,
    limit: number = 10
  ): Promise<ConversationEntry[]> {
    const conversation = this.conversations.get(conversationId) || [];
    return conversation.slice(0, limit);
  }

  async getConversationSummary(conversationId: string): Promise<ConversationSummary | null> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation || conversation.length === 0) return null;

    console.log('📊 Generating conversation summary for:', conversationId);

    return {
      conversation_id: conversationId,
      total_queries: conversation.length,
      common_themes: this.extractCommonThemes(conversation),
      emotional_patterns: this.analyzeEmotionalPatterns(conversation),
      preferred_genres: this.extractPreferredGenres(conversation),
      feedback_patterns: this.analyzeFeedbackPatterns(conversation),
      user_evolution: this.analyzeUserEvolution(conversation)
    };
  }

  async getUserPreferenceProfile(conversationId: string): Promise<any> {
    const summary = await this.getConversationSummary(conversationId);
    if (!summary) return null;

    const conversation = this.conversations.get(conversationId) || [];
    
    return {
      preferred_genres: summary.preferred_genres,
      emotional_preferences: this.calculateEmotionalPreferences(conversation),
      sophistication_level: this.calculateSophisticationLevel(conversation),
      viewing_patterns: this.analyzeViewingPatterns(conversation),
      feedback_reliability: this.calculateFeedbackReliability(conversation),
      preference_evolution: summary.user_evolution
    };
  }

  async findSimilarUsers(conversationId: string): Promise<string[]> {
    const currentProfile = await this.getUserPreferenceProfile(conversationId);
    if (!currentProfile) return [];

    const similarUsers: string[] = [];
    
    for (const [otherId, _] of this.conversations) {
      if (otherId === conversationId) continue;
      
      const otherProfile = await this.getUserPreferenceProfile(otherId);
      if (otherProfile && this.calculateProfileSimilarity(currentProfile, otherProfile) > 0.7) {
        similarUsers.push(otherId);
      }
    }

    return similarUsers.slice(0, 5); // Top 5 similar users
  }

  async getContextualInsights(
    conversationId: string,
    currentQuery: string
  ): Promise<any> {
    const conversation = this.conversations.get(conversationId) || [];
    const recentEntries = conversation.slice(0, 5);

    return {
      query_evolution: this.analyzeQueryEvolution(recentEntries, currentQuery),
      emotional_trajectory: this.analyzeEmotionalTrajectory(recentEntries),
      preference_shifts: this.detectPreferenceShifts(recentEntries),
      context_continuity: this.assessContextContinuity(recentEntries, currentQuery),
      personalization_opportunities: this.identifyPersonalizationOpportunities(recentEntries)
    };
  }

  private generateEntryId(): string {
    return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private summarizeResult(result: any): string {
    const movieTitles = result.movies?.slice(0, 3).map((m: any) => m.title).join(', ') || 'No movies';
    const confidence = result.confidence || 0;
    return `${movieTitles} (${confidence}% confidence)`;
  }

  private extractContextTags(query: string, result: any): string[] {
    const tags: string[] = [];
    
    // Extract from query
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('family')) tags.push('family_context');
    if (lowerQuery.includes('date')) tags.push('romantic_context');
    if (lowerQuery.includes('friends')) tags.push('social_context');
    if (lowerQuery.includes('alone')) tags.push('solo_context');
    
    // Extract from result
    if (result.nlp_analysis) {
      const intent = result.nlp_analysis.intent_classification?.primary_intent;
      if (intent) tags.push(`intent_${intent}`);
      
      const complexity = result.nlp_analysis.complexity_score;
      if (complexity > 70) tags.push('complex_query');
      else if (complexity < 40) tags.push('simple_query');
      else tags.push('moderate_query');
    }
    
    // Extract from emotional state
    const emotion = result.nlp_analysis?.emotional_state?.primary_emotion;
    if (emotion) tags.push(`emotion_${emotion}`);
    
    return tags;
  }

  private extractCommonThemes(conversation: ConversationEntry[]): string[] {
    const themeCount: { [key: string]: number } = {};
    
    conversation.forEach(entry => {
      entry.context_tags.forEach(tag => {
        themeCount[tag] = (themeCount[tag] || 0) + 1;
      });
    });
    
    return Object.entries(themeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([theme]) => theme);
  }

  private analyzeEmotionalPatterns(conversation: ConversationEntry[]): string[] {
    const emotions = conversation.map(e => e.emotional_state);
    const emotionCount: { [key: string]: number } = {};
    
    emotions.forEach(emotion => {
      emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
    });
    
    return Object.entries(emotionCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([emotion]) => emotion);
  }

  private extractPreferredGenres(conversation: ConversationEntry[]): string[] {
    const genreCount: { [key: string]: number } = {};
    
    // This would need to be enhanced with actual genre extraction from results
    // For now, we'll use a simple approach based on context tags
    conversation.forEach(entry => {
      entry.context_tags.forEach(tag => {
        if (tag.startsWith('genre_')) {
          const genre = tag.replace('genre_', '');
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        }
      });
    });
    
    return Object.entries(genreCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([genre]) => genre);
  }

  private analyzeFeedbackPatterns(conversation: ConversationEntry[]): FeedbackPattern[] {
    const patterns: FeedbackPattern[] = [];
    
    const feedbackEntries = conversation.filter(e => e.user_feedback);
    if (feedbackEntries.length < 3) return patterns; // Need minimum data
    
    // Analyze genre preferences from feedback
    const genrePreferences = this.analyzeGenreFeedbackPatterns(feedbackEntries);
    if (genrePreferences.confidence > 60) {
      patterns.push(genrePreferences);
    }
    
    // Analyze mood correlation patterns
    const moodPatterns = this.analyzeMoodFeedbackPatterns(feedbackEntries);
    if (moodPatterns.confidence > 60) {
      patterns.push(moodPatterns);
    }
    
    return patterns;
  }

  private analyzeGenreFeedbackPatterns(entries: ConversationEntry[]): FeedbackPattern {
    // Simplified genre preference analysis
    const likedGenres: string[] = [];
    const dislikedGenres: string[] = [];
    
    entries.forEach(entry => {
      const feedback = entry.user_feedback;
      if (feedback?.rating && feedback.rating >= 4) {
        // Extract genres from liked recommendations (would need movie data)
        likedGenres.push('action'); // Placeholder
      } else if (feedback?.rating && feedback.rating <= 2) {
        dislikedGenres.push('horror'); // Placeholder
      }
    });
    
    return {
      pattern_type: 'genre_preference',
      pattern_description: `User shows preference for ${likedGenres.join(', ')} and avoids ${dislikedGenres.join(', ')}`,
      confidence: Math.min(entries.length * 20, 90),
      supporting_evidence: [`${entries.length} feedback instances analyzed`]
    };
  }

  private analyzeMoodFeedbackPatterns(entries: ConversationEntry[]): FeedbackPattern {
    const moodRatings: { [key: string]: number[] } = {};
    
    entries.forEach(entry => {
      const mood = entry.emotional_state;
      const rating = entry.user_feedback?.rating || 3;
      
      if (!moodRatings[mood]) moodRatings[mood] = [];
      moodRatings[mood].push(rating);
    });
    
    // Find best mood correlation
    let bestMood = '';
    let bestAverage = 0;
    
    Object.entries(moodRatings).forEach(([mood, ratings]) => {
      const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      if (average > bestAverage) {
        bestMood = mood;
        bestAverage = average;
      }
    });
    
    return {
      pattern_type: 'mood_correlation',
      pattern_description: `Recommendations perform best when user is in ${bestMood} mood (avg rating: ${bestAverage.toFixed(1)})`,
      confidence: Math.min(entries.length * 15, 85),
      supporting_evidence: [`Mood correlation analysis across ${entries.length} instances`]
    };
  }

  private analyzeUserEvolution(conversation: ConversationEntry[]): UserEvolution {
    if (conversation.length < 5) {
      return {
        sophistication_growth: 0,
        genre_diversification: 0,
        emotional_stability: 50,
        preference_consistency: 50
      };
    }
    
    // Analyze sophistication growth (simplified)
    const earlyQueries = conversation.slice(-5);
    const recentQueries = conversation.slice(0, 5);
    
    const earlyComplexity = this.calculateAverageComplexity(earlyQueries);
    const recentComplexity = this.calculateAverageComplexity(recentQueries);
    
    const sophistication_growth = ((recentComplexity - earlyComplexity) / 100) * 100;
    
    // Analyze genre diversification
    const earlyGenres = new Set(this.extractGenresFromEntries(earlyQueries));
    const recentGenres = new Set(this.extractGenresFromEntries(recentQueries));
    
    const genre_diversification = ((recentGenres.size - earlyGenres.size) / Math.max(earlyGenres.size, 1)) * 100;
    
    // Analyze emotional stability
    const emotions = conversation.map(e => e.emotional_state);
    const uniqueEmotions = new Set(emotions).size;
    const emotional_stability = Math.max(0, 100 - (uniqueEmotions * 10));
    
    // Analyze preference consistency
    const preference_consistency = this.calculatePreferenceConsistency(conversation);
    
    return {
      sophistication_growth: Math.max(-100, Math.min(100, sophistication_growth)),
      genre_diversification: Math.max(-100, Math.min(100, genre_diversification)),
      emotional_stability,
      preference_consistency
    };
  }

  private calculateAverageComplexity(entries: ConversationEntry[]): number {
    // Simplified complexity calculation based on query length and context tags
    const complexityScores = entries.map(entry => {
      let score = entry.query.split(' ').length * 2; // Base on word count
      if (entry.context_tags.includes('complex_query')) score += 30;
      if (entry.context_tags.includes('simple_query')) score -= 10;
      return Math.min(score, 100);
    });
    
    return complexityScores.reduce((a, b) => a + b, 0) / complexityScores.length;
  }

  private extractGenresFromEntries(entries: ConversationEntry[]): string[] {
    const genres: string[] = [];
    entries.forEach(entry => {
      entry.context_tags.forEach(tag => {
        if (tag.startsWith('genre_')) {
          genres.push(tag.replace('genre_', ''));
        }
      });
    });
    return genres;
  }

  private calculatePreferenceConsistency(conversation: ConversationEntry[]): number {
    // Simplified consistency calculation
    const themes = this.extractCommonThemes(conversation);
    const totalEntries = conversation.length;
    
    if (totalEntries < 3) return 50;
    
    // Calculate how often the top themes appear
    const themeConsistency = themes.slice(0, 3).reduce((acc, theme) => {
      const appearances = conversation.filter(e => e.context_tags.includes(theme)).length;
      return acc + (appearances / totalEntries);
    }, 0);
    
    return Math.min(100, (themeConsistency / 3) * 100);
  }

  private calculateEmotionalPreferences(conversation: ConversationEntry[]): any {
    const emotionRatings: { [key: string]: number[] } = {};
    
    conversation.forEach(entry => {
      if (entry.user_feedback?.rating) {
        const emotion = entry.emotional_state;
        if (!emotionRatings[emotion]) emotionRatings[emotion] = [];
        emotionRatings[emotion].push(entry.user_feedback.rating);
      }
    });
    
    const preferences: { [key: string]: number } = {};
    Object.entries(emotionRatings).forEach(([emotion, ratings]) => {
      preferences[emotion] = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    });
    
    return preferences;
  }

  private calculateSophisticationLevel(conversation: ConversationEntry[]): string {
    const avgComplexity = this.calculateAverageComplexity(conversation);
    
    if (avgComplexity > 70) return 'arthouse';
    if (avgComplexity > 50) return 'indie';
    if (avgComplexity > 30) return 'mixed';
    return 'mainstream';
  }

  private analyzeViewingPatterns(conversation: ConversationEntry[]): any {
    const patterns = {
      social_contexts: new Set<string>(),
      timing_patterns: [] as string[],
      query_frequency: 0
    };
    
    conversation.forEach(entry => {
      entry.context_tags.forEach(tag => {
        if (tag.includes('_context')) {
          patterns.social_contexts.add(tag);
        }
      });
    });
    
    patterns.query_frequency = conversation.length;
    
    return {
      preferred_social_contexts: Array.from(patterns.social_contexts),
      query_frequency_pattern: patterns.query_frequency > 10 ? 'high' : patterns.query_frequency > 3 ? 'medium' : 'low'
    };
  }

  private calculateFeedbackReliability(conversation: ConversationEntry[]): number {
    const feedbackEntries = conversation.filter(e => e.user_feedback);
    if (feedbackEntries.length === 0) return 0;
    
    // Simple reliability based on feedback frequency and consistency
    const feedbackRate = (feedbackEntries.length / conversation.length) * 100;
    
    return Math.min(feedbackRate, 100);
  }

  private calculateProfileSimilarity(profile1: any, profile2: any): number {
    let similarity = 0;
    let factors = 0;
    
    // Compare preferred genres
    if (profile1.preferred_genres && profile2.preferred_genres) {
      const overlap = profile1.preferred_genres.filter((g: string) => profile2.preferred_genres.includes(g)).length;
      const maxGenres = Math.max(profile1.preferred_genres.length, profile2.preferred_genres.length);
      similarity += maxGenres > 0 ? (overlap / maxGenres) : 0;
      factors++;
    }
    
    // Compare sophistication levels
    if (profile1.sophistication_level && profile2.sophistication_level) {
      similarity += profile1.sophistication_level === profile2.sophistication_level ? 1 : 0;
      factors++;
    }
    
    return factors > 0 ? similarity / factors : 0;
  }

  private analyzeQueryEvolution(entries: ConversationEntry[], currentQuery: string): any {
    return {
      complexity_trend: this.calculateComplexityTrend(entries),
      topic_shift: this.detectTopicShift(entries, currentQuery),
      refinement_pattern: this.detectRefinementPattern(entries)
    };
  }

  private calculateComplexityTrend(entries: ConversationEntry[]): string {
    if (entries.length < 2) return 'insufficient_data';
    
    const complexities = entries.map(e => e.query.split(' ').length);
    const trend = complexities[0] - complexities[complexities.length - 1];
    
    if (trend > 5) return 'increasing_complexity';
    if (trend < -5) return 'decreasing_complexity';
    return 'stable_complexity';
  }

  private detectTopicShift(entries: ConversationEntry[], currentQuery: string): string {
    if (entries.length === 0) return 'initial_query';
    
    const lastEntry = entries[0];
    const lastWords = new Set(lastEntry.query.toLowerCase().split(' '));
    const currentWords = new Set(currentQuery.toLowerCase().split(' '));
    
    const overlap = [...lastWords].filter(w => currentWords.has(w)).length;
    const maxWords = Math.max(lastWords.size, currentWords.size);
    
    const similarity = maxWords > 0 ? overlap / maxWords : 0;
    
    if (similarity > 0.7) return 'topic_continuation';
    if (similarity > 0.3) return 'topic_evolution';
    return 'topic_shift';
  }

  private detectRefinementPattern(entries: ConversationEntry[]): string {
    if (entries.length < 2) return 'insufficient_data';
    
    const hasRefinementWords = entries.some(e => 
      e.query.toLowerCase().includes('but') || 
      e.query.toLowerCase().includes('except') ||
      e.query.toLowerCase().includes('different')
    );
    
    return hasRefinementWords ? 'active_refinement' : 'exploration_mode';
  }

  private analyzeEmotionalTrajectory(entries: ConversationEntry[]): any {
    const emotions = entries.map(e => e.emotional_state);
    
    return {
      emotional_stability: this.calculateEmotionalStability(emotions),
      dominant_emotion: this.findDominantEmotion(emotions),
      emotional_shifts: this.detectEmotionalShifts(emotions)
    };
  }

  private calculateEmotionalStability(emotions: string[]): number {
    const uniqueEmotions = new Set(emotions).size;
    return Math.max(0, 100 - (uniqueEmotions * 15));
  }

  private findDominantEmotion(emotions: string[]): string {
    const emotionCount: { [key: string]: number } = {};
    emotions.forEach(emotion => {
      emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
    });
    
    return Object.entries(emotionCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'neutral';
  }

  private detectEmotionalShifts(emotions: string[]): string[] {
    const shifts: string[] = [];
    
    for (let i = 1; i < emotions.length; i++) {
      if (emotions[i] !== emotions[i - 1]) {
        shifts.push(`${emotions[i - 1]}_to_${emotions[i]}`);
      }
    }
    
    return shifts;
  }

  private detectPreferenceShifts(entries: ConversationEntry[]): any {
    return {
      genre_shifts: this.detectGenreShifts(entries),
      context_shifts: this.detectContextShifts(entries),
      complexity_shifts: this.detectComplexityShifts(entries)
    };
  }

  private detectGenreShifts(entries: ConversationEntry[]): string[] {
    // Simplified genre shift detection
    const shifts: string[] = [];
    
    for (let i = 1; i < entries.length; i++) {
      const currentGenres = this.extractGenresFromEntries([entries[i]]);
      const previousGenres = this.extractGenresFromEntries([entries[i - 1]]);
      
      if (currentGenres.length > 0 && previousGenres.length > 0 && 
          !currentGenres.some(g => previousGenres.includes(g))) {
        shifts.push(`${previousGenres[0]}_to_${currentGenres[0]}`);
      }
    }
    
    return shifts;
  }

  private detectContextShifts(entries: ConversationEntry[]): string[] {
    const shifts: string[] = [];
    
    for (let i = 1; i < entries.length; i++) {
      const currentContexts = entries[i].context_tags.filter(t => t.includes('_context'));
      const previousContexts = entries[i - 1].context_tags.filter(t => t.includes('_context'));
      
      if (currentContexts.length > 0 && previousContexts.length > 0 &&
          currentContexts[0] !== previousContexts[0]) {
        shifts.push(`${previousContexts[0]}_to_${currentContexts[0]}`);
      }
    }
    
    return shifts;
  }

  private detectComplexityShifts(entries: ConversationEntry[]): string {
    if (entries.length < 2) return 'insufficient_data';
    
    const complexities = entries.map(e => {
      if (e.context_tags.includes('complex_query')) return 'high';
      if (e.context_tags.includes('simple_query')) return 'low';
      return 'medium';
    });
    
    const shifts = [];
    for (let i = 1; i < complexities.length; i++) {
      if (complexities[i] !== complexities[i - 1]) {
        shifts.push(`${complexities[i - 1]}_to_${complexities[i]}`);
      }
    }
    
    return shifts.length > 0 ? shifts.join(', ') : 'stable';
  }

  private assessContextContinuity(entries: ConversationEntry[], currentQuery: string): number {
    if (entries.length === 0) return 100;
    
    const lastEntry = entries[0];
    const lastWords = new Set(lastEntry.query.toLowerCase().split(' ').filter(w => w.length > 3));
    const currentWords = new Set(currentQuery.toLowerCase().split(' ').filter(w => w.length > 3));
    
    const overlap = [...lastWords].filter(w => currentWords.has(w)).length;
    const maxWords = Math.max(lastWords.size, currentWords.size);
    
    return maxWords > 0 ? (overlap / maxWords) * 100 : 0;
  }

  private identifyPersonalizationOpportunities(entries: ConversationEntry[]): string[] {
    const opportunities: string[] = [];
    
    // Check for consistent patterns
    const commonThemes = this.extractCommonThemes(entries);
    if (commonThemes.length > 0) {
      opportunities.push(`leverage_theme_${commonThemes[0]}`);
    }
    
    // Check for emotional patterns
    const emotions = entries.map(e => e.emotional_state);
    const dominantEmotion = this.findDominantEmotion(emotions);
    if (dominantEmotion !== 'neutral') {
      opportunities.push(`emotional_personalization_${dominantEmotion}`);
    }
    
    // Check for feedback patterns
    const hasFeedback = entries.some(e => e.user_feedback);
    if (hasFeedback) {
      opportunities.push('feedback_based_improvement');
    }
    
    // Check for context patterns
    const socialContexts = entries.map(e => 
      e.context_tags.find(t => t.includes('_context'))
    ).filter(Boolean);
    
    if (socialContexts.length > 0) {
      const dominantContext = socialContexts[0];
      opportunities.push(`context_optimization_${dominantContext}`);
    }
    
    return opportunities;
  }

  private cleanupOldConversations(): void {
    const cutoffTime = Date.now() - (this.MEMORY_RETENTION_HOURS * 60 * 60 * 1000);
    
    for (const [conversationId, entries] of this.conversations) {
      const filteredEntries = entries.filter(entry => entry.timestamp > cutoffTime);
      
      if (filteredEntries.length === 0) {
        this.conversations.delete(conversationId);
      } else if (filteredEntries.length !== entries.length) {
        this.conversations.set(conversationId, filteredEntries);
      }
    }
  }

  // Cleanup method to run periodically
  startPeriodicCleanup(): void {
    setInterval(() => {
      this.cleanupOldConversations();
    }, 60 * 60 * 1000); // Cleanup every hour
  }
}

export const conversationMemory = new ConversationMemoryManager();