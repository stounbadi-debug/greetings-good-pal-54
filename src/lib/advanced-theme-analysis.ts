// Advanced Theme Analysis Service
// Integrates theme recognition with Gemini AI for sophisticated movie recommendations

import { geminiAI } from './gemini-ai';
import { themeRecognitionEngine, ThemeAnalysisResult, IdentifiedTheme } from './theme-recognition-engine';
import { Movie } from './tmdb';

export interface ThemeBasedRecommendation {
  movie: Movie;
  themeAlignment: number;
  matchedThemes: string[];
  psychologicalRelevance: number;
  therapeuticValue: number;
  explanation: string;
}

export interface ThemeAnalysisQuery {
  rawQuery: string;
  emotionalContext?: string;
  lifeStage?: string;
  specificNeeds?: string[];
  culturalBackground?: string;
}

export interface AdvancedThemeRecommendationResult {
  themeAnalysis: ThemeAnalysisResult;
  recommendedMovies: ThemeBasedRecommendation[];
  themeJourney: ThemeJourney;
  insights: ThemeInsight[];
}

export interface ThemeJourney {
  currentPhase: string;
  suggestedProgression: string[];
  alternativeExplorations: string[];
  complementaryThemes: string[];
}

export interface ThemeInsight {
  type: 'psychological' | 'cultural' | 'archetypal' | 'therapeutic';
  insight: string;
  relevance: number;
  actionable: boolean;
}

export class AdvancedThemeAnalysisService {
  
  async analyzeAndRecommend(query: ThemeAnalysisQuery): Promise<AdvancedThemeRecommendationResult> {
    try {
      // 1. Perform deep theme analysis
      const themeAnalysis = await themeRecognitionEngine.analyzeThemes(
        query.rawQuery, 
        {
          emotionalContext: query.emotionalContext,
          lifeStage: query.lifeStage,
          specificNeeds: query.specificNeeds,
          culturalBackground: query.culturalBackground
        }
      );

      // 2. Get theme-based movie recommendations
      const recommendedMovies = await this.getThemeBasedMovies(themeAnalysis, query);

      // 3. Create theme journey
      const themeJourney = await this.createThemeJourney(themeAnalysis);

      // 4. Generate insights
      const insights = await this.generateThemeInsights(themeAnalysis, query);

      return {
        themeAnalysis,
        recommendedMovies,
        themeJourney,
        insights
      };

    } catch (error) {
      console.error('Advanced theme analysis failed:', error);
      throw new Error('Failed to perform theme analysis');
    }
  }

  private async getThemeBasedMovies(
    themeAnalysis: ThemeAnalysisResult, 
    query: ThemeAnalysisQuery
  ): Promise<ThemeBasedRecommendation[]> {
    
    // Create enhanced prompt for Gemini AI that focuses on thematic matching
    const themePrompt = this.buildThemeBasedMoviePrompt(themeAnalysis, query);
    
    try {
      const aiResult = await geminiAI.analyzeQuery({
        description: themePrompt,
        mood: query.emotionalContext,
        style: themeAnalysis.thematicComplexity
      });

      return this.processThemeMovieResults(aiResult, themeAnalysis);

    } catch (error) {
      console.error('Theme-based movie recommendation failed:', error);
      return [];
    }
  }

  private buildThemeBasedMoviePrompt(
    themeAnalysis: ThemeAnalysisResult, 
    query: ThemeAnalysisQuery
  ): string {
    const primaryThemes = themeAnalysis.primaryThemes.map(t => t.theme).join(', ');
    const psychologicalNeeds = themeAnalysis.psychologicalNeeds.map(n => n.need).join(', ');
    const archetypalPatterns = themeAnalysis.archetypalPatterns.map(p => p.pattern).join(', ');

    return `
ADVANCED THEMATIC MOVIE RECOMMENDATION

ORIGINAL QUERY: "${query.rawQuery}"

IDENTIFIED THEMES:
Primary Themes: ${primaryThemes}
Archetypal Patterns: ${archetypalPatterns}
Psychological Needs: ${psychologicalNeeds}
Life Stage Alignment: ${themeAnalysis.lifeStageAlignment.primaryStage}
Thematic Complexity: ${themeAnalysis.thematicComplexity}

THEME-BASED RECOMMENDATION CRITERIA:
1. Deep thematic resonance (not just genre matching)
2. Psychological and emotional alignment with identified needs
3. Archetypal pattern matching for universal appeal
4. Life stage appropriateness and relevance
5. Therapeutic or growth potential

Please recommend movies that authentically explore these themes and patterns. Focus on:
- Narrative depth and thematic sophistication
- Character development that mirrors the psychological needs
- Stories that offer insight, catharsis, or growth in these areas
- Cross-cultural relevance and universal human experiences
- Appropriate emotional intensity and complexity

For each recommendation, explain:
- How it matches the identified themes
- What psychological needs it addresses
- The archetypal patterns it explores
- Why it's particularly relevant for this user's journey

Prioritize quality and thematic authenticity over popularity.
    `;
  }

  private processThemeMovieResults(
    aiResult: any, 
    themeAnalysis: ThemeAnalysisResult
  ): ThemeBasedRecommendation[] {
    // Process the AI result to create structured theme-based recommendations
    const movies = aiResult.movies || [];
    
    return movies.map((movie: any) => ({
      movie,
      themeAlignment: this.calculateThemeAlignment(movie, themeAnalysis),
      matchedThemes: this.extractMatchedThemes(movie, themeAnalysis),
      psychologicalRelevance: this.calculatePsychologicalRelevance(movie, themeAnalysis),
      therapeuticValue: this.calculateTherapeuticValue(movie, themeAnalysis),
      explanation: movie.themeExplanation || 'Thematically aligned with your exploration'
    }));
  }

  private calculateThemeAlignment(movie: any, themeAnalysis: ThemeAnalysisResult): number {
    // Calculate how well the movie aligns with identified themes
    let alignment = 0;
    const totalThemes = themeAnalysis.primaryThemes.length;
    
    themeAnalysis.primaryThemes.forEach(theme => {
      if (movie.themes?.includes(theme.theme)) {
        alignment += theme.confidence;
      }
    });
    
    return totalThemes > 0 ? alignment / totalThemes : 0.5;
  }

  private extractMatchedThemes(movie: any, themeAnalysis: ThemeAnalysisResult): string[] {
    const matched: string[] = [];
    
    themeAnalysis.primaryThemes.forEach(theme => {
      if (movie.themes?.includes(theme.theme)) {
        matched.push(theme.theme);
      }
    });
    
    themeAnalysis.secondaryThemes.forEach(theme => {
      if (movie.themes?.includes(theme.theme)) {
        matched.push(theme.theme);
      }
    });
    
    return matched;
  }

  private calculatePsychologicalRelevance(movie: any, themeAnalysis: ThemeAnalysisResult): number {
    // Calculate psychological relevance based on identified needs
    let relevance = 0;
    const totalNeeds = themeAnalysis.psychologicalNeeds.length;
    
    themeAnalysis.psychologicalNeeds.forEach(need => {
      if (movie.psychologicalElements?.includes(need.need)) {
        relevance += need.intensity;
      }
    });
    
    return totalNeeds > 0 ? relevance / totalNeeds : 0.5;
  }

  private calculateTherapeuticValue(movie: any, themeAnalysis: ThemeAnalysisResult): number {
    // Calculate therapeutic value based on healing potential
    let therapeuticValue = 0;
    
    themeAnalysis.psychologicalNeeds.forEach(need => {
      if (need.therapeutic_value && movie.therapeuticElements?.includes(need.category)) {
        therapeuticValue += need.therapeutic_value;
      }
    });
    
    return Math.min(therapeuticValue, 1); // Cap at 1
  }

  private async createThemeJourney(themeAnalysis: ThemeAnalysisResult): Promise<ThemeJourney> {
    // Create a thematic journey for progressive exploration
    const currentThemes = themeAnalysis.primaryThemes.map(t => t.theme);
    
    return {
      currentPhase: this.determineCurrentPhase(themeAnalysis),
      suggestedProgression: this.suggestProgression(themeAnalysis),
      alternativeExplorations: this.suggestAlternatives(themeAnalysis),
      complementaryThemes: this.findComplementaryThemes(currentThemes)
    };
  }

  private determineCurrentPhase(themeAnalysis: ThemeAnalysisResult): string {
    // Determine where the user is in their thematic journey
    const complexity = themeAnalysis.thematicComplexity;
    const primaryTheme = themeAnalysis.primaryThemes[0]?.theme || 'exploration';
    
    return `${complexity}_${primaryTheme.replace(/\s+/g, '_').toLowerCase()}`;
  }

  private suggestProgression(themeAnalysis: ThemeAnalysisResult): string[] {
    // Suggest natural thematic progression
    const progressions = {
      'identity': ['self_discovery', 'authenticity', 'belonging', 'purpose'],
      'relationships': ['connection', 'intimacy', 'loyalty', 'love'],
      'growth': ['challenge', 'resilience', 'wisdom', 'transformation'],
      'healing': ['recognition', 'processing', 'integration', 'renewal']
    };
    
    const primaryTheme = themeAnalysis.primaryThemes[0]?.category || 'growth';
    return progressions[primaryTheme as keyof typeof progressions] || ['exploration', 'discovery', 'integration'];
  }

  private suggestAlternatives(themeAnalysis: ThemeAnalysisResult): string[] {
    // Suggest alternative thematic explorations
    return [
      'Perspective shift: Same theme, different cultural context',
      'Intensity variation: Lighter or deeper exploration',
      'Time period variation: Historical or futuristic setting',
      'Genre variation: Different storytelling approaches'
    ];
  }

  private findComplementaryThemes(themes: string[]): string[] {
    // Find themes that complement the current exploration
    const complementaryMap: Record<string, string[]> = {
      'identity': ['belonging', 'authenticity', 'purpose'],
      'love': ['loss', 'growth', 'sacrifice'],
      'power': ['responsibility', 'justice', 'corruption'],
      'mortality': ['legacy', 'meaning', 'acceptance']
    };
    
    const complementary = new Set<string>();
    themes.forEach(theme => {
      const complements = complementaryMap[theme] || [];
      complements.forEach(c => complementary.add(c));
    });
    
    return Array.from(complementary);
  }

  private async generateThemeInsights(
    themeAnalysis: ThemeAnalysisResult, 
    query: ThemeAnalysisQuery
  ): Promise<ThemeInsight[]> {
    const insights: ThemeInsight[] = [];
    
    // Psychological insights
    if (themeAnalysis.psychologicalNeeds.length > 0) {
      insights.push({
        type: 'psychological',
        insight: `Your query suggests a focus on ${themeAnalysis.psychologicalNeeds[0].category} needs, particularly around ${themeAnalysis.psychologicalNeeds[0].need}. This is common during ${themeAnalysis.lifeStageAlignment.primaryStage} life stages.`,
        relevance: themeAnalysis.psychologicalNeeds[0].intensity,
        actionable: true
      });
    }
    
    // Archetypal insights
    if (themeAnalysis.archetypalPatterns.length > 0) {
      const pattern = themeAnalysis.archetypalPatterns[0];
      insights.push({
        type: 'archetypal',
        insight: `The ${pattern.pattern} pattern in your request connects to universal human experiences of transformation and growth.`,
        relevance: pattern.relevance,
        actionable: true
      });
    }
    
    // Cultural insights
    if (themeAnalysis.culturalContext.crossCulturalRelevance > 0.7) {
      insights.push({
        type: 'cultural',
        insight: 'Your themes have strong cross-cultural relevance, opening opportunities to explore diverse storytelling traditions.',
        relevance: themeAnalysis.culturalContext.crossCulturalRelevance,
        actionable: true
      });
    }
    
    return insights;
  }
}

export const advancedThemeAnalysis = new AdvancedThemeAnalysisService();