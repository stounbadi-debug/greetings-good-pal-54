// Therapeutic Movie Mapping Engine
// Maps movies to emotional states and therapeutic needs

import { Movie } from "./tmdb";
import { MicroEmotionProfile, ContextualEmotionalAnalysis } from "./emotional-intelligence-engine";

export interface TherapeuticMovieProfile {
  movie_id: number;
  therapeutic_score: number;
  
  // Emotional healing categories
  healing_categories: {
    grief_processing: number; // 0-10
    anxiety_relief: number;
    depression_support: number;
    trauma_healing: number;
    relationship_healing: number;
    self_esteem_building: number;
    stress_relief: number;
    anger_management: number;
    loneliness_comfort: number;
    hope_restoration: number;
  };
  
  // Therapeutic mechanisms
  therapeutic_mechanisms: {
    emotional_catharsis: number; // 0-10
    cognitive_reframing: number;
    social_connection: number;
    inspiration_motivation: number;
    escape_distraction: number;
    mindfulness_presence: number;
    humor_therapy: number;
    perspective_shifting: number;
  };
  
  // Safety and intensity
  emotional_intensity: 'gentle' | 'moderate' | 'intense';
  trigger_warnings: string[];
  age_appropriateness: string[];
  viewing_context_recommendations: string[];
  
  // Therapeutic timing
  optimal_emotional_states: string[];
  progression_phase: 'crisis' | 'processing' | 'healing' | 'growth' | 'maintenance';
  contraindications: string[]; // When NOT to recommend
}

export interface MovieTherapeuticValue {
  primary_therapeutic_benefit: string;
  emotional_journey_arc: string;
  key_healing_themes: string[];
  therapeutic_quotes: string[];
  discussion_prompts: string[];
  follow_up_recommendations: number[]; // Movie IDs
}

class TherapeuticMovieMapper {
  private movieProfiles: Map<number, TherapeuticMovieProfile> = new Map();
  
  // Pre-defined therapeutic profiles for popular movies
  private knownTherapeuticMovies = {
    // Grief and Loss
    550: { // Fight Club - Complex trauma processing
      healing_categories: { trauma_healing: 8, anger_management: 7, self_esteem_building: 6 },
      mechanisms: { emotional_catharsis: 9, cognitive_reframing: 8 },
      intensity: 'intense' as const,
      warnings: ['violence', 'mental health themes'],
      contraindications: ['severe_depression', 'active_suicidal_ideation']
    },
    
    13: { // Forrest Gump - Life perspective and resilience
      healing_categories: { hope_restoration: 9, stress_relief: 8, loneliness_comfort: 7 },
      mechanisms: { inspiration_motivation: 9, perspective_shifting: 8, social_connection: 7 },
      intensity: 'gentle' as const,
      warnings: [],
      contraindications: []
    },
    
    637: { // Life is Beautiful - Hope in darkness
      healing_categories: { hope_restoration: 10, trauma_healing: 8, relationship_healing: 9 },
      mechanisms: { perspective_shifting: 10, humor_therapy: 8, emotional_catharsis: 7 },
      intensity: 'intense' as const,
      warnings: ['historical trauma', 'war themes'],
      contraindications: ['active_trauma']
    },
    
    11216: { // Cinema Paradiso - Nostalgia and healing
      healing_categories: { grief_processing: 8, loneliness_comfort: 9, hope_restoration: 8 },
      mechanisms: { emotional_catharsis: 8, social_connection: 7, mindfulness_presence: 6 },
      intensity: 'moderate' as const,
      warnings: [],
      contraindications: []
    },
    
    // Anxiety and Stress Relief
    862: { // Toy Story - Comfort and belonging
      healing_categories: { anxiety_relief: 8, loneliness_comfort: 9, stress_relief: 9 },
      mechanisms: { escape_distraction: 8, social_connection: 9, humor_therapy: 7 },
      intensity: 'gentle' as const,
      warnings: [],
      contraindications: []
    },
    
    10681: { // WALL-E - Environmental anxiety and hope
      healing_categories: { anxiety_relief: 7, hope_restoration: 9, loneliness_comfort: 8 },
      mechanisms: { perspective_shifting: 8, mindfulness_presence: 7, social_connection: 8 },
      intensity: 'gentle' as const,
      warnings: [],
      contraindications: []
    },
    
    // Depression Support
    120: { // The Lord of the Rings - Epic journey and purpose
      healing_categories: { depression_support: 8, hope_restoration: 9, self_esteem_building: 7 },
      mechanisms: { inspiration_motivation: 9, social_connection: 8, perspective_shifting: 7 },
      intensity: 'moderate' as const,
      warnings: ['violence', 'intense scenes'],
      contraindications: []
    },
    
    19995: { // Avatar - Connection and purpose
      healing_categories: { depression_support: 7, anxiety_relief: 6, hope_restoration: 8 },
      mechanisms: { perspective_shifting: 8, mindfulness_presence: 9, escape_distraction: 8 },
      intensity: 'moderate' as const,
      warnings: ['violence', 'environmental themes'],
      contraindications: []
    }
  };

  async analyzeMovieTherapeuticValue(movie: Movie): Promise<TherapeuticMovieProfile> {
    const movieId = movie.id;
    
    // Check if we have a pre-defined profile
    if (this.knownTherapeuticMovies[movieId as keyof typeof this.knownTherapeuticMovies]) {
      return this.buildProfileFromKnown(movie, this.knownTherapeuticMovies[movieId as keyof typeof this.knownTherapeuticMovies]);
    }
    
    // Check cache
    const cached = this.movieProfiles.get(movieId);
    if (cached) {
      return cached;
    }
    
    // Generate new therapeutic profile using AI analysis
    const profile = await this.generateTherapeuticProfile(movie);
    this.movieProfiles.set(movieId, profile);
    return profile;
  }

  private async generateTherapeuticProfile(movie: Movie): Promise<TherapeuticMovieProfile> {
    const therapeuticPrompt = `
      Analyze this movie for therapeutic value and emotional healing potential:
      
      Movie: "${movie.title}"
      Plot: ${movie.overview?.slice(0, 400) || 'No plot available'}
      Genres: ${movie.genre_ids?.join(', ') || 'Unknown'}
      Rating: ${movie.vote_average || 'N/A'}
      
      Provide detailed therapeutic analysis in JSON:
      {
        "therapeutic_score": "Overall therapeutic value 1-10",
        "healing_categories": {
          "grief_processing": 0-10,
          "anxiety_relief": 0-10,
          "depression_support": 0-10,
          "trauma_healing": 0-10,
          "relationship_healing": 0-10,
          "self_esteem_building": 0-10,
          "stress_relief": 0-10,
          "anger_management": 0-10,
          "loneliness_comfort": 0-10,
          "hope_restoration": 0-10
        },
        "therapeutic_mechanisms": {
          "emotional_catharsis": 0-10,
          "cognitive_reframing": 0-10,
          "social_connection": 0-10,
          "inspiration_motivation": 0-10,
          "escape_distraction": 0-10,
          "mindfulness_presence": 0-10,
          "humor_therapy": 0-10,
          "perspective_shifting": 0-10
        },
        "emotional_intensity": "gentle|moderate|intense",
        "trigger_warnings": ["specific triggers to be aware of"],
        "optimal_emotional_states": ["emotional states where this movie helps most"],
        "contraindications": ["situations where this movie should be avoided"],
        "primary_therapeutic_benefit": "Main healing benefit this movie provides"
      }
      
      Focus on psychological impact, emotional resonance, and healing potential.
      Return ONLY valid JSON.
    `;
    
    try {
      const response = await this.callTherapeuticAPI(therapeuticPrompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        return this.buildProfileFromAnalysis(movie, analysis);
      }
    } catch (error) {
      console.error('Therapeutic analysis failed for movie:', movie.title, error);
    }
    
    return this.getGenericTherapeuticProfile(movie);
  }

  private buildProfileFromKnown(movie: Movie, knownData: any): TherapeuticMovieProfile {
    return {
      movie_id: movie.id,
      therapeutic_score: this.calculateTherapeuticScore(knownData.healing_categories),
      healing_categories: {
        grief_processing: knownData.healing_categories.grief_processing || 0,
        anxiety_relief: knownData.healing_categories.anxiety_relief || 0,
        depression_support: knownData.healing_categories.depression_support || 0,
        trauma_healing: knownData.healing_categories.trauma_healing || 0,
        relationship_healing: knownData.healing_categories.relationship_healing || 0,
        self_esteem_building: knownData.healing_categories.self_esteem_building || 0,
        stress_relief: knownData.healing_categories.stress_relief || 0,
        anger_management: knownData.healing_categories.anger_management || 0,
        loneliness_comfort: knownData.healing_categories.loneliness_comfort || 0,
        hope_restoration: knownData.healing_categories.hope_restoration || 0
      },
      therapeutic_mechanisms: {
        emotional_catharsis: knownData.mechanisms.emotional_catharsis || 0,
        cognitive_reframing: knownData.mechanisms.cognitive_reframing || 0,
        social_connection: knownData.mechanisms.social_connection || 0,
        inspiration_motivation: knownData.mechanisms.inspiration_motivation || 0,
        escape_distraction: knownData.mechanisms.escape_distraction || 0,
        mindfulness_presence: knownData.mechanisms.mindfulness_presence || 0,
        humor_therapy: knownData.mechanisms.humor_therapy || 0,
        perspective_shifting: knownData.mechanisms.perspective_shifting || 0
      },
      emotional_intensity: knownData.intensity,
      trigger_warnings: knownData.warnings,
      age_appropriateness: this.determineAgeAppropriateness(movie),
      viewing_context_recommendations: this.getViewingContextRecommendations(knownData.intensity),
      optimal_emotional_states: this.getOptimalEmotionalStates(knownData.healing_categories),
      progression_phase: this.determineProgressionPhase(knownData.healing_categories),
      contraindications: knownData.contraindications
    };
  }

  private buildProfileFromAnalysis(movie: Movie, analysis: any): TherapeuticMovieProfile {
    return {
      movie_id: movie.id,
      therapeutic_score: analysis.therapeutic_score || 5,
      healing_categories: analysis.healing_categories || {},
      therapeutic_mechanisms: analysis.therapeutic_mechanisms || {},
      emotional_intensity: analysis.emotional_intensity || 'moderate',
      trigger_warnings: analysis.trigger_warnings || [],
      age_appropriateness: this.determineAgeAppropriateness(movie),
      viewing_context_recommendations: this.getViewingContextRecommendations(analysis.emotional_intensity),
      optimal_emotional_states: analysis.optimal_emotional_states || [],
      progression_phase: this.determineProgressionPhase(analysis.healing_categories),
      contraindications: analysis.contraindications || []
    };
  }

  async findTherapeuticallyMatchedMovies(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    availableMovies: Movie[]
  ): Promise<Array<Movie & { therapeutic_profile: TherapeuticMovieProfile }>> {
    const results = [];
    
    for (const movie of availableMovies) {
      const therapeuticProfile = await this.analyzeMovieTherapeuticValue(movie);
      
      // Calculate therapeutic match score
      const matchScore = this.calculateTherapeuticMatch(emotions, context, therapeuticProfile);
      
      if (matchScore > 6) { // Only include good therapeutic matches
        results.push({
          ...movie,
          therapeutic_profile: therapeuticProfile,
          therapeutic_match_score: matchScore
        });
      }
    }
    
    // Sort by therapeutic match score
    return results.sort((a: any, b: any) => (b.therapeutic_match_score || 0) - (a.therapeutic_match_score || 0));
  }

  private calculateTherapeuticMatch(
    emotions: MicroEmotionProfile,
    context: ContextualEmotionalAnalysis,
    movieProfile: TherapeuticMovieProfile
  ): number {
    let score = 5; // Base score
    
    // Primary emotion matching
    const primaryEmotion = emotions.primary_emotion;
    if (primaryEmotion === 'sadness' && movieProfile.healing_categories.grief_processing > 6) score += 3;
    if (primaryEmotion === 'fear' && movieProfile.healing_categories.anxiety_relief > 6) score += 3;
    if (primaryEmotion === 'anger' && movieProfile.healing_categories.anger_management > 6) score += 3;
    
    // Secondary emotions
    if (emotions.secondary_emotions.anxiety! > 7 && movieProfile.healing_categories.anxiety_relief > 6) score += 2;
    if (emotions.secondary_emotions.loneliness! > 7 && movieProfile.healing_categories.loneliness_comfort > 6) score += 2;
    
    // Therapeutic needs alignment
    const healingType = emotions.therapeutic_needs.healing_type;
    if (healingType === 'cathartic' && movieProfile.healing_categories.grief_processing > 6) score += 2;
    if (healingType === 'escapist' && movieProfile.therapeutic_mechanisms.escape_distraction > 6) score += 2;
    if (healingType === 'empowering' && movieProfile.therapeutic_mechanisms.inspiration_motivation > 6) score += 2;
    if (healingType === 'comforting' && movieProfile.healing_categories.stress_relief > 6) score += 2;
    if (healingType === 'inspiring' && movieProfile.healing_categories.hope_restoration > 6) score += 2;
    
    // Intensity matching
    const supportLevel = emotions.therapeutic_needs.support_level;
    if (supportLevel === 'light' && movieProfile.emotional_intensity === 'gentle') score += 1;
    if (supportLevel === 'moderate' && movieProfile.emotional_intensity === 'moderate') score += 1;
    if (supportLevel === 'intensive' && movieProfile.emotional_intensity === 'intense') score += 1;
    
    // Context considerations
    const emotionalPhase = context.emotional_journey.current_phase;
    if (emotionalPhase === movieProfile.progression_phase) score += 1;
    
    // Safety considerations (subtract for contraindications)
    const interventionUrgency = emotions.therapeutic_needs.intervention_urgency;
    if (interventionUrgency === 'high' && movieProfile.contraindications.includes('crisis')) score -= 3;
    
    return Math.max(Math.min(score, 10), 1);
  }

  generateTherapeuticInsights(
    movie: Movie,
    therapeuticProfile: TherapeuticMovieProfile,
    emotions: MicroEmotionProfile
  ): MovieTherapeuticValue {
    const primaryBenefit = this.determinePrimaryBenefit(therapeuticProfile, emotions);
    
    return {
      primary_therapeutic_benefit: primaryBenefit,
      emotional_journey_arc: this.describeEmotionalJourney(therapeuticProfile),
      key_healing_themes: this.extractHealingThemes(therapeuticProfile),
      therapeutic_quotes: [], // Could be populated with actual movie quotes
      discussion_prompts: this.generateDiscussionPrompts(therapeuticProfile, emotions),
      follow_up_recommendations: this.getFollowUpRecommendations(therapeuticProfile)
    };
  }

  private determinePrimaryBenefit(
    profile: TherapeuticMovieProfile,
    emotions: MicroEmotionProfile
  ): string {
    const categories = profile.healing_categories;
    const maxCategory = Object.entries(categories).reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, { key: '', value: 0 });
    
    const benefitMap: { [key: string]: string } = {
      'grief_processing': 'Helps process loss and grief in a healthy way',
      'anxiety_relief': 'Provides calming and stress-reducing effects',
      'depression_support': 'Offers hope and emotional uplift',
      'trauma_healing': 'Supports healing from difficult experiences',
      'relationship_healing': 'Explores healthy relationship dynamics',
      'self_esteem_building': 'Builds confidence and self-worth',
      'stress_relief': 'Provides relaxation and mental break',
      'anger_management': 'Helps process and release anger constructively',
      'loneliness_comfort': 'Offers connection and reduces isolation',
      'hope_restoration': 'Restores optimism and positive outlook'
    };
    
    return benefitMap[maxCategory.key] || 'Provides general emotional support';
  }

  private describeEmotionalJourney(profile: TherapeuticMovieProfile): string {
    const intensity = profile.emotional_intensity;
    const mechanisms = profile.therapeutic_mechanisms;
    
    if (mechanisms.emotional_catharsis > 7) {
      return `This ${intensity} journey allows for deep emotional release and processing`;
    } else if (mechanisms.escape_distraction > 7) {
      return `Provides a ${intensity} escape that offers mental respite and relaxation`;
    } else if (mechanisms.inspiration_motivation > 7) {
      return `Takes you on a ${intensity} journey of growth and empowerment`;
    } else {
      return `Offers a ${intensity} emotional experience focused on healing`;
    }
  }

  private extractHealingThemes(profile: TherapeuticMovieProfile): string[] {
    const themes = [];
    const categories = profile.healing_categories;
    
    if (categories.hope_restoration > 6) themes.push('Hope and resilience');
    if (categories.relationship_healing > 6) themes.push('Love and connection');
    if (categories.self_esteem_building > 6) themes.push('Self-acceptance and growth');
    if (categories.grief_processing > 6) themes.push('Processing loss and change');
    if (categories.trauma_healing > 6) themes.push('Overcoming adversity');
    
    return themes.length > 0 ? themes : ['Personal growth', 'Emotional healing'];
  }

  private generateDiscussionPrompts(
    profile: TherapeuticMovieProfile,
    emotions: MicroEmotionProfile
  ): string[] {
    const prompts = [];
    const primaryEmotion = emotions.primary_emotion;
    
    if (profile.healing_categories.hope_restoration > 6) {
      prompts.push('What moments in the story gave you hope?');
    }
    
    if (profile.therapeutic_mechanisms.perspective_shifting > 6) {
      prompts.push('How did this story change your perspective on your situation?');
    }
    
    if (primaryEmotion === 'sadness' && profile.healing_categories.grief_processing > 6) {
      prompts.push('Which character\'s journey resonated most with your experience?');
    }
    
    prompts.push('What will you remember most from this viewing experience?');
    
    return prompts;
  }

  private getFollowUpRecommendations(profile: TherapeuticMovieProfile): number[] {
    // This would be populated with actual movie IDs for follow-up recommendations
    // For now, return empty array
    return [];
  }

  private calculateTherapeuticScore(healingCategories: any): number {
    const values = Object.values(healingCategories) as number[];
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.round(average);
  }

  private determineAgeAppropriateness(movie: Movie): string[] {
    const considerations = [];
    
    // Basic age rating considerations
    if (movie.genre_ids?.includes(16)) { // Animation
      considerations.push('Family-friendly');
    }
    
    if (movie.genre_ids?.includes(27) || movie.genre_ids?.includes(53)) { // Horror/Thriller
      considerations.push('Adults only');
    }
    
    if (movie.genre_ids?.includes(35)) { // Comedy
      considerations.push('Appropriate for most ages');
    }
    
    return considerations.length > 0 ? considerations : ['General audiences'];
  }

  private getViewingContextRecommendations(intensity: string): string[] {
    switch (intensity) {
      case 'gentle':
        return ['Perfect for solo viewing', 'Good for family time', 'Suitable for any mood'];
      case 'moderate':
        return ['Best when you can focus', 'Good for thoughtful viewing', 'Consider your energy level'];
      case 'intense':
        return ['Ensure emotional support is available', 'Choose the right time', 'Prepare for emotional impact'];
      default:
        return ['Watch when it feels right for you'];
    }
  }

  private getOptimalEmotionalStates(healingCategories: any): string[] {
    const states = [];
    
    if (healingCategories.grief_processing > 6) states.push('Processing loss');
    if (healingCategories.anxiety_relief > 6) states.push('Feeling anxious or stressed');
    if (healingCategories.depression_support > 6) states.push('Needing hope and uplift');
    if (healingCategories.loneliness_comfort > 6) states.push('Feeling isolated');
    if (healingCategories.hope_restoration > 6) states.push('Seeking inspiration');
    
    return states.length > 0 ? states : ['Open to emotional experience'];
  }

  private determineProgressionPhase(healingCategories: any): 'crisis' | 'processing' | 'healing' | 'growth' | 'maintenance' {
    const maxValue = Math.max(...Object.values(healingCategories) as number[]);
    
    if (maxValue >= 8) return 'healing';
    if (maxValue >= 6) return 'processing';
    if (maxValue >= 4) return 'growth';
    return 'maintenance';
  }

  private getGenericTherapeuticProfile(movie: Movie): TherapeuticMovieProfile {
    // Generate a generic profile based on genre
    const baseProfile: TherapeuticMovieProfile = {
      movie_id: movie.id,
      therapeutic_score: 5,
      healing_categories: {
        grief_processing: 0,
        anxiety_relief: 0,
        depression_support: 0,
        trauma_healing: 0,
        relationship_healing: 0,
        self_esteem_building: 0,
        stress_relief: 0,
        anger_management: 0,
        loneliness_comfort: 0,
        hope_restoration: 0
      },
      therapeutic_mechanisms: {
        emotional_catharsis: 0,
        cognitive_reframing: 0,
        social_connection: 0,
        inspiration_motivation: 0,
        escape_distraction: 0,
        mindfulness_presence: 0,
        humor_therapy: 0,
        perspective_shifting: 0
      },
      emotional_intensity: 'moderate',
      trigger_warnings: [],
      age_appropriateness: ['General audiences'],
      viewing_context_recommendations: ['Watch when it feels right'],
      optimal_emotional_states: ['General entertainment'],
      progression_phase: 'maintenance',
      contraindications: []
    };
    
    // Adjust based on genre
    if (movie.genre_ids?.includes(35)) { // Comedy
      baseProfile.healing_categories.stress_relief = 7;
      baseProfile.healing_categories.anxiety_relief = 6;
      baseProfile.therapeutic_mechanisms.humor_therapy = 8;
      baseProfile.emotional_intensity = 'gentle';
    }
    
    if (movie.genre_ids?.includes(18)) { // Drama
      baseProfile.therapeutic_mechanisms.emotional_catharsis = 6;
      baseProfile.therapeutic_mechanisms.perspective_shifting = 7;
      baseProfile.emotional_intensity = 'moderate';
    }
    
    return baseProfile;
  }

  private async callTherapeuticAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          systemInstruction: "You are a therapeutic movie analysis AI specializing in the emotional and psychological impact of films. Provide detailed, clinically-informed analysis."
        })
      });

      if (!response.ok) {
        throw new Error(`Therapeutic API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.content || '';
    } catch (error) {
      console.error('Therapeutic API request failed:', error);
      throw error;
    }
  }
}

export const therapeuticMovieMapper = new TherapeuticMovieMapper();