// Multi-Language Configuration System
// Comprehensive language and cultural context definitions

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  culturalContext: CulturalContext;
  streamingPlatforms: string[];
  festivals: string[];
  dialectVariants?: string[];
  rightToLeft?: boolean;
}

export interface CulturalContext {
  primaryThemes: string[];
  familyValues: 'individualistic' | 'collectivistic' | 'mixed';
  humorStyles: string[];
  narrativePreferences: string[];
  religiousSensitivities: string[];
  historicalContext: string[];
  socialNorms: string[];
  celebrationDates: string[];
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  'en': {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Global',
    culturalContext: {
      primaryThemes: ['individualism', 'heroism', 'self-discovery', 'justice', 'freedom'],
      familyValues: 'individualistic',
      humorStyles: ['sarcasm', 'dry humor', 'slapstick', 'wordplay'],
      narrativePreferences: ['linear', 'hero journey', 'redemption arcs'],
      religiousSensitivities: ['moderate', 'secular-friendly'],
      historicalContext: ['colonial', 'industrial revolution', 'modern democracy'],
      socialNorms: ['direct communication', 'personal space', 'equality'],
      celebrationDates: ['Christmas', 'New Year', 'Independence Day']
    },
    streamingPlatforms: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Hulu'],
    festivals: ['Sundance', 'SXSW', 'Tribeca', 'Toronto International']
  },
  'es': {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Latin America & Spain',
    culturalContext: {
      primaryThemes: ['family honor', 'passion', 'tradition vs modernity', 'magical realism', 'community'],
      familyValues: 'collectivistic',
      humorStyles: ['telenovela drama', 'wordplay', 'physical comedy', 'irony'],
      narrativePreferences: ['cyclical time', 'multigenerational sagas', 'romantic tragedy'],
      religiousSensitivities: ['Catholic traditions', 'spiritual themes'],
      historicalContext: ['colonial legacy', 'revolution', 'migration'],
      socialNorms: ['warmth', 'expressiveness', 'respect for elders'],
      celebrationDates: ['Día de los Muertos', 'Christmas', 'Carnival', 'Independence Days']
    },
    streamingPlatforms: ['Netflix', 'Amazon Prime', 'Movistar+', 'Paramount+', 'Disney+'],
    festivals: ['Festival de Cannes', 'Festival de San Sebastián', 'Festival de Cine de Guadalajara']
  },
  'fr': {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    region: 'France & Francophone',
    culturalContext: {
      primaryThemes: ['existentialism', 'love affairs', 'intellectual discourse', 'social critique', 'artistry'],
      familyValues: 'mixed',
      humorStyles: ['wit', 'satire', 'absurdism', 'sophisticated humor'],
      narrativePreferences: ['character study', 'philosophical depth', 'artistic expression'],
      religiousSensitivities: ['secular', 'philosophical'],
      historicalContext: ['revolution', 'enlightenment', 'colonial', 'wars'],
      socialNorms: ['intellectual discussion', 'artistic appreciation', 'formality'],
      celebrationDates: ['Bastille Day', 'Christmas', 'Easter', 'Cannes Festival']
    },
    streamingPlatforms: ['Netflix', 'Amazon Prime', 'Canal+', 'France.tv', 'Disney+'],
    festivals: ['Festival de Cannes', 'César Awards', 'Festival de Deauville']
  },
  'zh': {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    region: 'China & Chinese-speaking',
    culturalContext: {
      primaryThemes: ['harmony', 'filial piety', 'perseverance', 'honor', 'wisdom of ancestors'],
      familyValues: 'collectivistic',
      humorStyles: ['wordplay', 'situational comedy', 'physical humor', 'irony'],
      narrativePreferences: ['circular narratives', 'moral lessons', 'historical epics'],
      religiousSensitivities: ['Confucian values', 'Buddhist themes', 'ancestral respect'],
      historicalContext: ['ancient dynasties', 'cultural revolution', 'modernization'],
      socialNorms: ['face concept', 'hierarchical respect', 'indirect communication'],
      celebrationDates: ['Chinese New Year', 'Mid-Autumn Festival', 'Dragon Boat Festival']
    },
    streamingPlatforms: ['iQiyi', 'Youku', 'Tencent Video', 'Netflix', 'Bilibili'],
    festivals: ['Shanghai International Film Festival', 'Beijing International Film Festival']
  },
  'ar': {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Middle East & North Africa',
    rightToLeft: true,
    culturalContext: {
      primaryThemes: ['honor', 'hospitality', 'faith', 'family loyalty', 'justice'],
      familyValues: 'collectivistic',
      humorStyles: ['storytelling humor', 'wit', 'situational comedy'],
      narrativePreferences: ['oral tradition', 'moral parables', 'epic stories'],
      religiousSensitivities: ['Islamic values', 'spiritual themes', 'modesty'],
      historicalContext: ['Islamic golden age', 'colonial period', 'independence'],
      socialNorms: ['hospitality', 'respect for elders', 'community bonds'],
      celebrationDates: ['Ramadan', 'Eid al-Fitr', 'Eid al-Adha', 'Islamic New Year']
    },
    streamingPlatforms: ['Shahid', 'Netflix', 'OSN', 'Starzplay', 'Watch iT'],
    festivals: ['Cairo International Film Festival', 'Dubai International Film Festival']
  },
  'hi': {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'India',
    culturalContext: {
      primaryThemes: ['dharma', 'karma', 'family duty', 'spiritual journey', 'social harmony'],
      familyValues: 'collectivistic',
      humorStyles: ['wordplay', 'situational comedy', 'musical comedy', 'satire'],
      narrativePreferences: ['cyclical time', 'moral lessons', 'musical narratives'],
      religiousSensitivities: ['Hindu values', 'diverse religious themes', 'spiritual concepts'],
      historicalContext: ['ancient traditions', 'Mughal era', 'British colonial', 'independence'],
      socialNorms: ['respect for elders', 'joint family values', 'spiritual seeking'],
      celebrationDates: ['Diwali', 'Holi', 'Dussehra', 'Karva Chauth']
    },
    streamingPlatforms: ['Netflix', 'Amazon Prime', 'Disney+ Hotstar', 'Zee5', 'SonyLIV'],
    festivals: ['Mumbai International Film Festival', 'Goa International Film Festival']
  },
  'ja': {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'Japan',
    culturalContext: {
      primaryThemes: ['honor', 'perfectionism', 'nature harmony', 'group loyalty', 'aesthetic beauty'],
      familyValues: 'collectivistic',
      humorStyles: ['subtle humor', 'physical comedy', 'wordplay', 'situational irony'],
      narrativePreferences: ['minimalist storytelling', 'emotional subtlety', 'aesthetic focus'],
      religiousSensitivities: ['Shinto beliefs', 'Buddhist concepts', 'ancestral respect'],
      historicalContext: ['samurai tradition', 'Meiji restoration', 'post-war rebuilding'],
      socialNorms: ['politeness', 'group harmony', 'indirect communication'],
      celebrationDates: ['Cherry Blossom Season', 'Golden Week', 'Obon', 'New Year']
    },
    streamingPlatforms: ['Netflix', 'Amazon Prime', 'Hulu Japan', 'U-NEXT', 'Abema'],
    festivals: ['Tokyo International Film Festival', 'Cannes Film Festival']
  },
  'ko': {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    region: 'South Korea',
    culturalContext: {
      primaryThemes: ['social hierarchy', 'perseverance', 'family sacrifice', 'modern vs traditional', 'social justice'],
      familyValues: 'collectivistic',
      humorStyles: ['physical comedy', 'social satire', 'romantic comedy', 'dark humor'],
      narrativePreferences: ['emotional intensity', 'social commentary', 'redemption stories'],
      religiousSensitivities: ['Confucian values', 'Christian themes', 'Buddhist concepts'],
      historicalContext: ['Japanese occupation', 'Korean War', 'rapid modernization'],
      socialNorms: ['respect hierarchy', 'educational achievement', 'social conformity'],
      celebrationDates: ['Lunar New Year', 'Chuseok', 'Children\'s Day', 'Liberation Day']
    },
    streamingPlatforms: ['Netflix', 'Disney+', 'Wavve', 'Tving', 'Coupang Play'],
    festivals: ['Busan International Film Festival', 'Jeonju International Film Festival']
  }
};

export class LanguageManager {
  private currentLanguage: string = 'en';
  
  setLanguage(languageCode: string) {
    if (SUPPORTED_LANGUAGES[languageCode]) {
      this.currentLanguage = languageCode;
      localStorage.setItem('cine-discover-language', languageCode);
    }
  }
  
  getCurrentLanguage(): LanguageConfig {
    return SUPPORTED_LANGUAGES[this.currentLanguage];
  }
  
  getCurrentLanguageCode(): string {
    return this.currentLanguage;
  }
  
  getAllLanguages(): LanguageConfig[] {
    return Object.values(SUPPORTED_LANGUAGES);
  }
  
  getCulturalContext(languageCode?: string): CulturalContext {
    const lang = languageCode || this.currentLanguage;
    return SUPPORTED_LANGUAGES[lang]?.culturalContext || SUPPORTED_LANGUAGES['en'].culturalContext;
  }
  
  getStreamingPlatforms(languageCode?: string): string[] {
    const lang = languageCode || this.currentLanguage;
    return SUPPORTED_LANGUAGES[lang]?.streamingPlatforms || [];
  }
  
  getFestivals(languageCode?: string): string[] {
    const lang = languageCode || this.currentLanguage;
    return SUPPORTED_LANGUAGES[lang]?.festivals || [];
  }
  
  initialize() {
    const savedLanguage = localStorage.getItem('cine-discover-language');
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      this.currentLanguage = savedLanguage;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (SUPPORTED_LANGUAGES[browserLang]) {
        this.currentLanguage = browserLang;
      }
    }
  }
}

export const languageManager = new LanguageManager();