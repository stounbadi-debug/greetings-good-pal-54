// Cultural Intelligence Engine
// Advanced cultural context analysis and cross-cultural recommendations

import { languageManager, CulturalContext, LanguageConfig } from './multi-language-config';

export interface CulturalInsight {
  theme: string;
  culturalRelevance: number;
  regionalVariations: Record<string, number>;
  crossCulturalAppeals: string[];
  sensitivityLevel: 'low' | 'medium' | 'high';
  explanations: Record<string, string>;
}

export interface CulturalMovieAnalysis {
  movieId: number;
  title: string;
  culturalAlignment: Record<string, number>;
  universalThemes: string[];
  culturalSpecificThemes: Record<string, string[]>;
  crossCulturalBridgeScore: number;
  recommendedRegions: string[];
  culturalWarnings: string[];
  festivalCircuitAppeal: string[];
}

export interface CrossCulturalRecommendation {
  originalQuery: string;
  sourceLanguage: string;
  targetLanguages: string[];
  culturalBridgeMovies: CulturalMovieAnalysis[];
  languageSpecificRecommendations: Record<string, CulturalMovieAnalysis[]>;
  culturalLearningOpportunities: string[];
  explanation: string;
}

class CulturalIntelligenceEngine {
  private culturalThemeMap: Record<string, Record<string, number>> = {
    'family': {
      'en': 0.7, 'es': 0.95, 'zh': 0.98, 'ar': 0.96, 'hi': 0.94, 'ja': 0.88, 'ko': 0.92, 'fr': 0.75
    },
    'honor': {
      'en': 0.6, 'es': 0.85, 'zh': 0.92, 'ar': 0.96, 'hi': 0.89, 'ja': 0.94, 'ko': 0.91, 'fr': 0.68
    },
    'individualism': {
      'en': 0.92, 'es': 0.65, 'zh': 0.45, 'ar': 0.52, 'hi': 0.58, 'ja': 0.48, 'ko': 0.42, 'fr': 0.78
    },
    'spirituality': {
      'en': 0.55, 'es': 0.78, 'zh': 0.82, 'ar': 0.94, 'hi': 0.96, 'ja': 0.75, 'ko': 0.68, 'fr': 0.48
    },
    'social_justice': {
      'en': 0.85, 'es': 0.88, 'zh': 0.72, 'ar': 0.81, 'hi': 0.79, 'ja': 0.65, 'ko': 0.89, 'fr': 0.91
    },
    'romantic_love': {
      'en': 0.85, 'es': 0.94, 'zh': 0.78, 'ar': 0.72, 'hi': 0.88, 'ja': 0.82, 'ko': 0.91, 'fr': 0.89
    },
    'tradition_vs_modernity': {
      'en': 0.68, 'es': 0.82, 'zh': 0.89, 'ar': 0.87, 'hi': 0.91, 'ja': 0.85, 'ko': 0.88, 'fr': 0.72
    }
  };

  private festivalPrestige: Record<string, number> = {
    'Cannes': 1.0,
    'Venice': 0.95,
    'Berlin': 0.9,
    'Toronto': 0.85,
    'Sundance': 0.8,
    'SXSW': 0.75,
    'Shanghai': 0.85,
    'Tokyo': 0.8,
    'Busan': 0.75,
    'Cairo': 0.7,
    'Dubai': 0.65
  };

  analyzeCulturalContext(query: string, targetLanguage?: string): CulturalInsight[] {
    const language = targetLanguage || languageManager.getCurrentLanguageCode();
    const culturalContext = languageManager.getCulturalContext(language);
    const insights: CulturalInsight[] = [];

    // Analyze primary themes
    culturalContext.primaryThemes.forEach(theme => {
      if (query.toLowerCase().includes(theme.toLowerCase()) || this.isThemeRelated(query, theme)) {
        const insight: CulturalInsight = {
          theme,
          culturalRelevance: this.culturalThemeMap[theme]?.[language] || 0.5,
          regionalVariations: this.culturalThemeMap[theme] || {},
          crossCulturalAppeals: this.getCrossCulturalAppeals(theme),
          sensitivityLevel: this.getSensitivityLevel(theme, language),
          explanations: this.getThemeExplanations(theme)
        };
        insights.push(insight);
      }
    });

    return insights.sort((a, b) => b.culturalRelevance - a.culturalRelevance);
  }

  async generateCrossCulturalRecommendations(
    query: string, 
    sourceLanguage: string,
    targetLanguages: string[]
  ): Promise<CrossCulturalRecommendation> {
    const culturalInsights = this.analyzeCulturalContext(query, sourceLanguage);
    
    // Generate cultural bridge movies (universal appeal)
    const bridgeMovies = await this.findCulturalBridgeMovies(culturalInsights, targetLanguages);
    
    // Generate language-specific recommendations
    const languageSpecific: Record<string, CulturalMovieAnalysis[]> = {};
    
    for (const lang of targetLanguages) {
      const langInsights = this.analyzeCulturalContext(query, lang);
      languageSpecific[lang] = await this.findCulturallyAlignedMovies(langInsights, lang);
    }

    return {
      originalQuery: query,
      sourceLanguage,
      targetLanguages,
      culturalBridgeMovies: bridgeMovies,
      languageSpecificRecommendations: languageSpecific,
      culturalLearningOpportunities: this.generateLearningOpportunities(culturalInsights),
      explanation: this.generateCrossCulturalExplanation(query, culturalInsights)
    };
  }

  private isThemeRelated(query: string, theme: string): boolean {
    const themeKeywords: Record<string, string[]> = {
      'family': ['family', 'parents', 'children', 'siblings', 'relatives', 'generational'],
      'honor': ['honor', 'dignity', 'respect', 'reputation', 'pride', 'shame'],
      'individualism': ['self', 'independence', 'freedom', 'individual', 'personal', 'autonomy'],
      'spirituality': ['spiritual', 'religious', 'faith', 'god', 'divine', 'soul', 'meditation'],
      'social_justice': ['justice', 'equality', 'rights', 'social', 'activism', 'protest', 'change'],
      'romantic_love': ['love', 'romance', 'relationship', 'marriage', 'dating', 'passion'],
      'tradition_vs_modernity': ['tradition', 'modern', 'change', 'old ways', 'new generation', 'culture clash']
    };

    const keywords = themeKeywords[theme] || [];
    return keywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase()));
  }

  private getCrossCulturalAppeals(theme: string): string[] {
    const appeals: Record<string, string[]> = {
      'family': ['universal family bonds', 'intergenerational stories', 'parental sacrifice'],
      'honor': ['moral courage', 'standing up for beliefs', 'personal integrity'],
      'individualism': ['self-discovery', 'breaking free', 'personal growth'],
      'spirituality': ['meaning of life', 'transcendence', 'inner peace'],
      'social_justice': ['fighting oppression', 'equality', 'human rights'],
      'romantic_love': ['true love', 'sacrifice for love', 'overcoming obstacles'],
      'tradition_vs_modernity': ['generational conflict', 'cultural evolution', 'adaptation']
    };

    return appeals[theme] || [];
  }

  private getSensitivityLevel(theme: string, language: string): 'low' | 'medium' | 'high' {
    const sensitivities: Record<string, Record<string, 'low' | 'medium' | 'high'>> = {
      'spirituality': {
        'ar': 'high', 'hi': 'high', 'en': 'medium', 'fr': 'low'
      },
      'romantic_love': {
        'ar': 'high', 'zh': 'medium', 'hi': 'medium', 'en': 'low'
      },
      'social_justice': {
        'zh': 'high', 'ar': 'medium', 'en': 'low', 'fr': 'low'
      }
    };

    return sensitivities[theme]?.[language] || 'low';
  }

  private getThemeExplanations(theme: string): Record<string, string> {
    const explanations: Record<string, Record<string, string>> = {
      'family': {
        'en': 'Focus on individual family relationships and personal growth',
        'es': 'Emphasis on extended family, multigenerational bonds, and family honor',
        'zh': 'Filial piety, ancestral respect, and family duty above individual desires',
        'ar': 'Family as cornerstone of society, protection of family honor',
        'hi': 'Joint family system, respect for elders, dharmic family duties',
        'ja': 'Family hierarchy, generational responsibility, maintaining family reputation',
        'ko': 'Family sacrifice for success, intergenerational support, family pride'
      },
      'honor': {
        'en': 'Personal integrity and moral courage',
        'es': 'Family and personal honor, dignity in adversity',
        'zh': 'Face, reputation, and moral cultivation',
        'ar': 'Personal and family honor, dignity, and respect',
        'hi': 'Dharmic duty, righteous behavior, social respect',
        'ja': 'Personal and group honor, avoiding shame, maintaining dignity',
        'ko': 'Social face, respect, and honorable conduct'
      }
    };

    return explanations[theme] || {};
  }

  private async findCulturalBridgeMovies(
    insights: CulturalInsight[], 
    targetLanguages: string[]
  ): Promise<CulturalMovieAnalysis[]> {
    // This would integrate with movie database to find movies with high cross-cultural appeal
    // For now, return mock data structure
    return [];
  }

  private async findCulturallyAlignedMovies(
    insights: CulturalInsight[], 
    language: string
  ): Promise<CulturalMovieAnalysis[]> {
    // This would find movies specifically aligned with cultural context
    return [];
  }

  private generateLearningOpportunities(insights: CulturalInsight[]): string[] {
    return insights.map(insight => 
      `Explore ${insight.theme} through different cultural lenses`
    );
  }

  private generateCrossCulturalExplanation(
    query: string, 
    insights: CulturalInsight[]
  ): string {
    const topThemes = insights.slice(0, 2).map(i => i.theme).join(' and ');
    return `Your query about "${query}" resonates with themes of ${topThemes}, which have different cultural expressions across regions. These recommendations bridge cultural understanding while respecting local contexts.`;
  }

  getCulturalFestivalRecommendations(language: string): string[] {
    const festivals = languageManager.getFestivals(language);
    return festivals.sort((a, b) => 
      (this.festivalPrestige[b] || 0) - (this.festivalPrestige[a] || 0)
    );
  }

  async analyzeCulturalSentiment(
    text: string, 
    language: string
  ): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    culturalNuances: string[];
    confidenceScore: number;
  }> {
    const culturalContext = languageManager.getCulturalContext(language);
    
    // Cultural sentiment analysis would go here
    // This is a simplified version
    return {
      sentiment: 'neutral',
      culturalNuances: ['Direct communication style detected'],
      confidenceScore: 0.75
    };
  }
}

export const culturalIntelligence = new CulturalIntelligenceEngine();