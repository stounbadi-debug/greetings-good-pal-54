// Enhanced Gemini 2.0 Flash AI Service with Advanced Features
import { Movie } from "./tmdb"
import { tmdbService } from "./tmdb"

export interface EnhancedAIQuery {
  description: string
  mood?: string
  genre?: string
  era?: string
  style?: string
  language?: string
  userPreferences?: {
    preferredGenres?: string[]
    dislikedGenres?: string[]
    preferredRatings?: string[]
    culturalContext?: string
    previousLikes?: string[]
  }
  timestamp?: number
}

export interface AdvancedRecommendationResult {
  movies: Movie[]
  explanation: string
  confidence: number
  tags: string[]
  culturalContext?: string
  languageNotes?: string
  reasoning: {
    primaryFactors: string[]
    culturalConsiderations: string[]
    personalizations: string[]
  }
  alternatives?: {
    reason: string
    suggestions: Movie[]
  }
}

class EnhancedGeminiAIService {
  private genreMap: { [key: string]: number } = {
    'action': 28, 'adventure': 12, 'animation': 16, 'comedy': 35,
    'crime': 80, 'documentary': 99, 'drama': 18, 'family': 10751,
    'fantasy': 14, 'history': 36, 'horror': 27, 'music': 10402,
    'mystery': 9648, 'romance': 10749, 'science fiction': 878,
    'sci-fi': 878, 'thriller': 53, 'war': 10752, 'western': 37
  }

  private culturalContexts = {
    'ar': 'Arabic culture, Middle Eastern themes, Islamic values, family honor',
    'fr': 'French culture, art house cinema, philosophical themes, romance',
    'es': 'Spanish/Latino culture, passionate storytelling, family values',
    'de': 'German culture, precision, psychological depth, history',
    'it': 'Italian culture, emotional depth, fashion, family bonds',
    'ja': 'Japanese culture, honor, tradition, anime influences',
    'ko': 'Korean culture, social commentary, intense emotions, K-drama style',
    'en': 'Western culture, individualism, diverse themes'
  }

  private async callEnhancedGeminiAPI(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction: systemInstruction || this.getAdvancedSystemInstruction()
        })
      })

      if (!response.ok) {
        throw new Error(`Enhanced Gemini API Error: ${response.status}`)
      }

      const data = await response.json()
      return data.content || ''
    } catch (error) {
      console.error('Enhanced Gemini API request failed:', error)
      throw error
    }
  }

  private getAdvancedSystemInstruction(): string {
    return `You are a world-class AI movie expert with deep knowledge of:
    - Global cinema from all cultures and languages
    - Historical context and genre evolution  
    - Director styles and cinematographic techniques
    - Cultural sensitivities and preferences
    - Multi-language film analysis
    - Sentiment analysis and mood interpretation
    
    Your responses must be culturally aware, contextually appropriate, and demonstrate sophisticated understanding of cinema as both art and entertainment. Always consider the user's cultural background and language preferences.`
  }

  async analyzeEnhancedQuery(query: EnhancedAIQuery): Promise<AdvancedRecommendationResult> {
    try {
      const culturalContext = query.language ? this.culturalContexts[query.language as keyof typeof this.culturalContexts] : ''
      
      const enhancedPrompt = `
        ADVANCED CINEMA ANALYSIS REQUEST
        
        User Query: "${query.description}"
        Language/Culture: ${query.language || 'en'} (${culturalContext})
        Mood Context: ${query.mood || 'neutral'}
        Era Preference: ${query.era || 'any'}
        
        USER PREFERENCES:
        ${query.userPreferences ? JSON.stringify(query.userPreferences, null, 2) : 'None specified'}
        
        MULTI-DIMENSIONAL ANALYSIS REQUIRED:
        
        1. CULTURAL INTELLIGENCE:
        - Consider cultural context and values for ${query.language || 'English'} speakers
        - Account for cultural storytelling traditions
        - Respect religious and social sensitivities
        - Include local cinema alongside international films
        
        2. SENTIMENT & MOOD ANALYSIS:
        - Deep emotional context analysis beyond surface keywords  
        - Psychological state implications
        - Seasonal/temporal context awareness
        - Social context (solo, group, family viewing)
        
        3. SOPHISTICATED MATCHING:
        - Director style and cinematographic preferences
        - Narrative structure complexity
        - Acting style preferences (method, classical, naturalistic)
        - Genre evolution and cross-pollination
        - Thematic depth and symbolism
        
        4. PERSONALIZATION ENGINE:
        - Learn from stated preferences and dislikes
        - Cultural background adaptation
        - Sophistication level calibration
        - Viewing context optimization
        
        Provide comprehensive JSON response:
        {
          "primary_analysis": {
            "exact_titles": ["Specific movies if describing known plots"],
            "genres": ["Nuanced genre categorization with sub-genres"],
            "themes": ["Deep thematic elements and symbolic meanings"],
            "directorial_styles": ["Specific directors or cinematographic styles"],
            "cultural_elements": ["Cultural themes and considerations"]
          },
          "search_strategy": {
            "keywords": ["Sophisticated search terms"],
            "alternative_terms": ["Related concepts and synonyms"],
            "cultural_keywords": ["Culture-specific terms and concepts"],
            "exclusion_terms": ["Terms to avoid based on preferences"]
          },
          "personalization": {
            "sophistication_level": "mainstream|indie|arthouse|mixed",
            "emotional_intensity": "light|moderate|intense|variable",
            "cultural_adaptation": "Explanation of cultural considerations",
            "preference_learning": "What we learned about user preferences"
          },
          "recommendation_logic": {
            "primary_factors": ["Main decision factors"],
            "cultural_considerations": ["Cultural adaptations made"],
            "mood_adaptation": "How mood influenced selections",
            "fallback_strategy": "What to do if primary search fails"
          },
          "meta": {
            "confidence": "1-100 based on query clarity and cultural context",
            "language_notes": "Language-specific considerations",
            "alternative_suggestions": "If primary approach might not work"
          }
        }
        
        Return ONLY valid JSON, no markdown or extra text.
      `

      const response = await this.callEnhancedGeminiAPI(enhancedPrompt)
      
      let aiAnalysis
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          aiAnalysis = JSON.parse(jsonMatch[0])
        } else {
          throw new Error('No JSON found in enhanced analysis')
        }
      } catch (parseError) {
        console.error('Failed to parse enhanced analysis:', parseError)
        aiAnalysis = this.getAdvancedFallbackAnalysis(query)
      }

      // Execute advanced search strategy
      const movies = await this.executeAdvancedSearch(aiAnalysis, query)
      
      // Generate sophisticated explanation
      const explanation = await this.generateContextualExplanation(aiAnalysis, movies, query)
      
      return {
        movies: movies.slice(0, 8),
        explanation,
        confidence: Math.min(aiAnalysis.meta?.confidence || 85, movies.length > 0 ? 95 : 60),
        tags: this.generateSmartTags(aiAnalysis, query),
        culturalContext: aiAnalysis.personalization?.cultural_adaptation,
        languageNotes: aiAnalysis.meta?.language_notes,
        reasoning: {
          primaryFactors: aiAnalysis.recommendation_logic?.primary_factors || [],
          culturalConsiderations: aiAnalysis.recommendation_logic?.cultural_considerations || [],
          personalizations: [aiAnalysis.personalization?.preference_learning || '']
        },
        alternatives: movies.length > 8 ? {
          reason: "Additional culturally relevant options",
          suggestions: movies.slice(8, 12)
        } : undefined
      }

    } catch (error) {
      console.error('Enhanced analysis failed:', error)
      return this.getAdvancedFallbackRecommendations(query)
    }
  }

  async getMoodBasedRecommendations(mood: string, options: { language?: string, preferences?: any } = {}): Promise<Movie[]> {
    try {
      const culturalContext = options.language ? this.culturalContexts[options.language as keyof typeof this.culturalContexts] : ''
      
      const moodPrompt = `
        ADVANCED MOOD ANALYSIS for "${mood}" mood
        Cultural Context: ${culturalContext}
        Language: ${options.language || 'en'}
        
        Analyze this mood with sophisticated understanding:
        1. Emotional psychology behind the mood
        2. Cultural expressions of this mood in cinema
        3. Appropriate genres that resonate with this emotional state
        4. Avoid cultural taboos or inappropriate themes
        
        Return JSON:
        {
          "mood_analysis": {
            "emotional_state": "Deep analysis of the psychological state",
            "cultural_expression": "How this mood is expressed in ${options.language || 'English'} culture",
            "appropriate_themes": ["Themes that match this mood"],
            "avoid_themes": ["Themes to avoid for this mood"]
          },
          "recommendations": {
            "primary_genres": ["2-3 most suitable genres"],
            "secondary_genres": ["Alternative genre options"],
            "keywords": ["Search terms that capture the mood"],
            "directors": ["Directors known for capturing this mood"],
            "eras": ["Time periods that best capture this mood"]
          }
        }
      `

      const response = await this.callEnhancedGeminiAPI(moodPrompt)
      
      let moodAnalysis
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        moodAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : this.getFallbackMoodAnalysis(mood)
      } catch {
        moodAnalysis = this.getFallbackMoodAnalysis(mood)
      }

      return await this.searchMoviesByMoodAnalysis(moodAnalysis)

    } catch (error) {
      console.error('Enhanced mood recommendations failed:', error)
      const trending = await tmdbService.getTrendingMovies()
      return trending.results.slice(0, 6)
    }
  }

  async getSimilarMovies(movie: Movie, options: { preferences?: any, maxResults?: number } = {}): Promise<Movie[]> {
    try {
      const similarPrompt = `
        ADVANCED SIMILARITY ANALYSIS
        
        Source Movie: "${movie.title}"
        Plot: ${movie.overview?.slice(0, 300) || 'No plot available'}
        Genres: ${movie.genre_ids?.join(', ') || 'Unknown'}
        Release Year: ${movie.release_date?.slice(0, 4) || 'Unknown'}
        
        User Preferences: ${JSON.stringify(options.preferences || {}, null, 2)}
        
        Find movies with sophisticated similarity beyond surface-level genre matching:
        
        1. THEMATIC SIMILARITY:
        - Core themes and messages
        - Character archetypes and relationships
        - Narrative structure and pacing
        - Emotional journey and resolution
        
        2. STYLISTIC SIMILARITY:
        - Cinematographic style
        - Director's approach
        - Visual aesthetics
        - Tone and atmosphere
        
        3. CULTURAL CONTEXT:
        - Similar cultural themes
        - Comparable storytelling traditions
        - Equivalent emotional resonance
        
        Return JSON:
        {
          "similarity_factors": {
            "thematic_elements": ["Core themes to match"],
            "stylistic_elements": ["Visual and directorial styles"],
            "emotional_tone": "The emotional journey to replicate",
            "cultural_elements": ["Cultural themes to consider"]
          },
          "search_strategy": {
            "primary_keywords": ["Most important search terms"],
            "director_styles": ["Directors with similar approaches"],
            "genre_combinations": ["Genre mixes that would work"],
            "era_considerations": ["Time periods to focus on or avoid"]
          }
        }
      `

      const response = await this.callEnhancedGeminiAPI(similarPrompt)
      
      let similarityAnalysis
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        similarityAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null
      } catch {
        similarityAnalysis = null
      }

      if (similarityAnalysis) {
        return await this.searchMoviesBySimilarity(similarityAnalysis, movie, options.maxResults || 6)
      } else {
        // Fallback to genre-based similarity
        if (movie.genre_ids && movie.genre_ids.length > 0) {
          const genreResults = await tmdbService.getMoviesByGenre(movie.genre_ids[0])
          return genreResults.results.filter(m => m.id !== movie.id).slice(0, options.maxResults || 6)
        }
      }

      return []

    } catch (error) {
      console.error('Enhanced similar movies failed:', error)
      return []
    }
  }

  private async executeAdvancedSearch(analysis: any, query: EnhancedAIQuery): Promise<Movie[]> {
    const movies: Movie[] = []
    
    // Multi-stage search strategy
    const searchStages = [
      // Stage 1: Exact titles
      () => this.searchExactTitles(analysis.primary_analysis?.exact_titles || []),
      // Stage 2: Cultural keywords
      () => this.searchCulturalKeywords(analysis.search_strategy?.cultural_keywords || []),
      // Stage 3: Primary keywords
      () => this.searchPrimaryKeywords(analysis.search_strategy?.keywords || []),
      // Stage 4: Genre-based
      () => this.searchByGenres(analysis.primary_analysis?.genres || []),
      // Stage 5: Director styles
      () => this.searchByDirectors(analysis.primary_analysis?.directorial_styles || [])
    ]

    for (const searchStage of searchStages) {
      if (movies.length >= 12) break
      
      try {
        const stageResults = await searchStage()
        movies.push(...stageResults)
      } catch (error) {
        console.warn('Search stage failed:', error)
      }
    }

    // Remove duplicates and apply filters
    return this.deduplicateAndFilter(movies, analysis, query)
  }

  private async searchExactTitles(titles: string[]): Promise<Movie[]> {
    const results: Movie[] = []
    for (const title of titles.slice(0, 2)) {
      const searchResult = await tmdbService.searchMovies(title)
      results.push(...searchResult.results.slice(0, 3))
    }
    return results
  }

  private async searchCulturalKeywords(keywords: string[]): Promise<Movie[]> {
    if (keywords.length === 0) return []
    const query = keywords.slice(0, 2).join(' ')
    const result = await tmdbService.searchMovies(query)
    return result.results.slice(0, 4)
  }

  private async searchPrimaryKeywords(keywords: string[]): Promise<Movie[]> {
    if (keywords.length === 0) return []
    const query = keywords.slice(0, 3).join(' ')
    const result = await tmdbService.searchMovies(query)
    return result.results.slice(0, 6)
  }

  private async searchByGenres(genres: string[]): Promise<Movie[]> {
    const results: Movie[] = []
    for (const genre of genres.slice(0, 2)) {
      const genreId = this.genreMap[genre.toLowerCase()]
      if (genreId) {
        const genreResult = await tmdbService.getMoviesByGenre(genreId)
        results.push(...genreResult.results.slice(0, 4))
      }
    }
    return results
  }

  private async searchByDirectors(directors: string[]): Promise<Movie[]> {
    const results: Movie[] = []
    for (const director of directors.slice(0, 2)) {
      const searchResult = await tmdbService.searchMovies(director)
      results.push(...searchResult.results.slice(0, 3))
    }
    return results
  }

  private async searchMoviesByMoodAnalysis(analysis: any): Promise<Movie[]> {
    const movies: Movie[] = []
    
    // Search by primary genres
    const primaryGenres = analysis.recommendations?.primary_genres || []
    for (const genre of primaryGenres.slice(0, 2)) {
      const genreId = this.genreMap[genre.toLowerCase()]
      if (genreId) {
        const result = await tmdbService.getMoviesByGenre(genreId)
        movies.push(...result.results.slice(0, 3))
      }
    }

    // Search by keywords
    const keywords = analysis.recommendations?.keywords || []
    if (keywords.length > 0) {
      const query = keywords.slice(0, 2).join(' ')
      const result = await tmdbService.searchMovies(query)
      movies.push(...result.results.slice(0, 3))
    }

    return this.deduplicateMovies(movies).slice(0, 6)
  }

  private async searchMoviesBySimilarity(analysis: any, originalMovie: Movie, maxResults: number): Promise<Movie[]> {
    const movies: Movie[] = []
    
    // Search by thematic elements
    const themes = analysis.similarity_factors?.thematic_elements || []
    if (themes.length > 0) {
      const query = themes.slice(0, 2).join(' ')
      const result = await tmdbService.searchMovies(query)
      movies.push(...result.results.filter(m => m.id !== originalMovie.id).slice(0, 3))
    }

    // Search by director styles
    const directors = analysis.search_strategy?.director_styles || []
    for (const director of directors.slice(0, 2)) {
      const result = await tmdbService.searchMovies(director)
      movies.push(...result.results.filter(m => m.id !== originalMovie.id).slice(0, 2))
    }

    return this.deduplicateMovies(movies).slice(0, maxResults)
  }

  private deduplicateAndFilter(movies: Movie[], analysis: any, query: EnhancedAIQuery): Movie[] {
    // Remove duplicates
    let unique = this.deduplicateMovies(movies)
    
    // Apply era filtering if specified
    if (query.era && query.era !== 'any') {
      unique = this.filterByEra(unique, query.era)
    }

    // Apply user preferences filtering
    if (query.userPreferences) {
      unique = this.filterByPreferences(unique, query.userPreferences)
    }

    // Rank by relevance
    return this.rankMoviesByAdvancedRelevance(unique, analysis, query)
  }

  private deduplicateMovies(movies: Movie[]): Movie[] {
    return movies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    )
  }

  private filterByEra(movies: Movie[], era: string): Movie[] {
    const eraLower = era.toLowerCase()
    let fromYear: number | undefined
    let toYear: number | undefined

    if (eraLower.includes('recent')) {
      fromYear = new Date().getFullYear() - 5
    } else if (eraLower.includes('classic')) {
      toYear = 1979
    } else if (eraLower.includes('80s')) {
      fromYear = 1980; toYear = 1989
    } else if (eraLower.includes('90s')) {
      fromYear = 1990; toYear = 1999
    } else if (eraLower.includes('2000s')) {
      fromYear = 2000; toYear = 2009
    } else if (eraLower.includes('2010s')) {
      fromYear = 2010; toYear = 2019
    }

    if (fromYear || toYear) {
      return movies.filter(movie => {
        const year = parseInt(movie.release_date?.slice(0, 4) || '0')
        if (!year) return false
        if (fromYear && year < fromYear) return false
        if (toYear && year > toYear) return false
        return true
      })
    }

    return movies
  }

  private filterByPreferences(movies: Movie[], preferences: any): Movie[] {
    // This would implement complex preference filtering
    // For now, return as-is but this could filter by:
    // - Preferred/disliked genres
    // - Rating preferences
    // - Cultural considerations
    return movies
  }

  private rankMoviesByAdvancedRelevance(movies: Movie[], analysis: any, query: EnhancedAIQuery): Movie[] {
    return movies.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      // Base score from rating and popularity
      scoreA += a.vote_average * 2 + Math.log(a.popularity || 1)
      scoreB += b.vote_average * 2 + Math.log(b.popularity || 1)

      // Cultural relevance boost
      if (query.language && query.language !== 'en') {
        // Boost movies from user's cultural region
        scoreA += this.getCulturalRelevanceScore(a, query.language)
        scoreB += this.getCulturalRelevanceScore(b, query.language)
      }

      // Keyword matching boost
      const keywords = [
        ...(analysis.search_strategy?.keywords || []),
        ...(analysis.primary_analysis?.themes || [])
      ].map((k: string) => k.toLowerCase())

      for (const keyword of keywords) {
        if (a.title.toLowerCase().includes(keyword) || a.overview?.toLowerCase().includes(keyword)) {
          scoreA += 3
        }
        if (b.title.toLowerCase().includes(keyword) || b.overview?.toLowerCase().includes(keyword)) {
          scoreB += 3
        }
      }

      return scoreB - scoreA
    })
  }

  private getCulturalRelevanceScore(movie: Movie, language: string): number {
    // Simple cultural relevance scoring
    const title = movie.title.toLowerCase()
    const overview = movie.overview?.toLowerCase() || ''
    
    if (language === 'ar' && (title.includes('arab') || overview.includes('middle east'))) return 5
    if (language === 'fr' && (title.includes('french') || overview.includes('france'))) return 5
    if (language === 'es' && (title.includes('spanish') || overview.includes('spain') || overview.includes('latin'))) return 5
    
    return 0
  }

  private async generateContextualExplanation(analysis: any, movies: Movie[], query: EnhancedAIQuery): Promise<string> {
    if (movies.length === 0) {
      return "I couldn't find specific matches for your request, but I can suggest some alternative approaches."
    }

    const culturalNote = query.language && query.language !== 'en' 
      ? ` I've considered your ${this.culturalContexts[query.language as keyof typeof this.culturalContexts]} background in these recommendations.`
      : ''

    const explanation = analysis.recommendation_logic?.primary_factors?.join(', ') || 'general preferences'
    
    return `Based on ${explanation}, I've curated ${movies.length} personalized recommendations.${culturalNote} These selections balance your specific mood and preferences with cinematic quality.`
  }

  private generateSmartTags(analysis: any, query: EnhancedAIQuery): string[] {
    const tags = []
    
    // Add analysis-based tags
    if (analysis.primary_analysis?.genres) {
      tags.push(...analysis.primary_analysis.genres.slice(0, 2))
    }
    
    if (analysis.personalization?.sophistication_level) {
      tags.push(analysis.personalization.sophistication_level)
    }
    
    if (query.mood) {
      tags.push(query.mood)
    }
    
    if (query.language && query.language !== 'en') {
      tags.push(`${query.language}-cultural`)
    }
    
    tags.push('ai-enhanced')
    
    return tags.filter(Boolean).slice(0, 6)
  }

  private getAdvancedFallbackAnalysis(query: EnhancedAIQuery): any {
    // Enhanced fallback with cultural awareness
    return {
      primary_analysis: {
        exact_titles: [],
        genres: ['drama'],
        themes: ['human experience'],
        directorial_styles: ['mainstream'],
        cultural_elements: [query.language || 'universal']
      },
      search_strategy: {
        keywords: ['popular', 'acclaimed'],
        alternative_terms: ['award-winning'],
        cultural_keywords: [query.language || 'english'],
        exclusion_terms: []
      },
      personalization: {
        sophistication_level: 'mainstream',
        emotional_intensity: 'moderate',
        cultural_adaptation: `Adapted for ${query.language || 'English'} speakers`,
        preference_learning: 'Building user profile from this interaction'
      },
      recommendation_logic: {
        primary_factors: ['popularity', 'rating'],
        cultural_considerations: [`${query.language || 'English'} cultural context`],
        mood_adaptation: query.mood || 'neutral',
        fallback_strategy: 'genre-based recommendations'
      },
      meta: {
        confidence: 60,
        language_notes: query.language ? `Recommendations adapted for ${query.language} speakers` : null,
        alternative_suggestions: 'Try more specific descriptions for better results'
      }
    }
  }

  private getFallbackMoodAnalysis(mood: string): any {
    const moodMap: { [key: string]: any } = {
      'happy': {
        mood_analysis: {
          emotional_state: 'Positive, uplifting emotional state',
          appropriate_themes: ['comedy', 'adventure', 'feel-good'],
          avoid_themes: ['horror', 'tragedy']
        },
        recommendations: {
          primary_genres: ['comedy', 'adventure'],
          keywords: ['feel good', 'uplifting', 'comedy']
        }
      },
      'sad': {
        mood_analysis: {
          emotional_state: 'Melancholic, reflective emotional state',
          appropriate_themes: ['drama', 'emotional', 'touching'],
          avoid_themes: ['horror', 'action']
        },
        recommendations: {
          primary_genres: ['drama', 'romance'],
          keywords: ['emotional', 'touching', 'heartfelt']
        }
      }
    }

    return moodMap[mood.toLowerCase()] || moodMap['happy']
  }

  private async getAdvancedFallbackRecommendations(query: EnhancedAIQuery): Promise<AdvancedRecommendationResult> {
    const popular = await tmdbService.getPopularMovies()
    
    return {
      movies: popular.results.slice(0, 6),
      explanation: "I'm experiencing some technical difficulties, but here are some excellent popular movies that might interest you.",
      confidence: 50,
      tags: ['popular', 'fallback'],
      reasoning: {
        primaryFactors: ['popularity'],
        culturalConsiderations: [],
        personalizations: ['basic fallback due to technical issues']
      }
    }
  }
}

export const enhancedGeminiAI = new EnhancedGeminiAIService()