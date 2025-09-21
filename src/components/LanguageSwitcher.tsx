// Language Switcher Component
// Multi-language interface with cultural context awareness

import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ChevronDown, Sparkles } from 'lucide-react';
import { languageManager, SUPPORTED_LANGUAGES, LanguageConfig } from '@/lib/multi-language-config';

interface LanguageSwitcherProps {
  onLanguageChange?: (language: string) => void;
  showCulturalContext?: boolean;
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ 
  onLanguageChange, 
  showCulturalContext = false,
  compact = false,
  className 
}: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    languageManager.initialize();
    setCurrentLanguage(languageManager.getCurrentLanguageCode());
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    languageManager.setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
    
    // Trigger page refresh or re-render for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  const currentConfig = SUPPORTED_LANGUAGES[currentLanguage];
  const languages = Object.values(SUPPORTED_LANGUAGES);

  if (compact) {
    return (
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-40 ${className}`}>
          <Globe className="h-4 w-4 mr-2" />
          <SelectValue>
            <span className="flex items-center gap-2">
              {currentConfig.nativeName}
              <Badge variant="outline" className="text-xs">
                {currentConfig.region}
              </Badge>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
                <Badge variant="outline" className="ml-2 text-xs">
                  {lang.region}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Cultural Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{currentConfig.nativeName}</span>
                    <span className="text-sm text-muted-foreground">{currentConfig.name}</span>
                  </div>
                  <Badge variant="secondary">{currentConfig.region}</Badge>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center justify-between w-full py-2">
                    <div className="flex flex-col">
                      <span 
                        className="font-medium"
                        style={{ direction: lang.rightToLeft ? 'rtl' : 'ltr' }}
                      >
                        {lang.nativeName}
                      </span>
                      <span className="text-sm text-muted-foreground">{lang.name}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs">
                        {lang.region}
                      </Badge>
                      <div className="flex gap-1">
                        {lang.festivals.slice(0, 2).map(festival => (
                          <Badge key={festival} variant="secondary" className="text-xs">
                            {festival.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showCulturalContext && currentConfig && (
            <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Cultural Intelligence</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Primary Themes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentConfig.culturalContext.primaryThemes.slice(0, 4).map(theme => (
                      <Badge key={theme} variant="outline" className="text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Family Values:</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {currentConfig.culturalContext.familyValues}
                  </Badge>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Major Festivals:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentConfig.festivals.slice(0, 3).map(festival => (
                      <Badge key={festival} variant="outline" className="text-xs">
                        {festival}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-medium text-muted-foreground">Streaming Platforms:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentConfig.streamingPlatforms.slice(0, 4).map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {currentConfig.culturalContext.celebrationDates.length > 0 && (
                  <div>
                    <span className="font-medium text-muted-foreground">Cultural Celebrations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentConfig.culturalContext.celebrationDates.slice(0, 3).map(celebration => (
                        <Badge key={celebration} variant="outline" className="text-xs">
                          {celebration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Content recommendations will be culturally optimized for {currentConfig.name} preferences
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook for using language context in components
export function useLanguageContext() {
  const [language, setLanguage] = useState(languageManager.getCurrentLanguageCode());
  const [config, setConfig] = useState(languageManager.getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail.language;
      setLanguage(newLanguage);
      setConfig(SUPPORTED_LANGUAGES[newLanguage]);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (newLanguage: string) => {
    languageManager.setLanguage(newLanguage);
    setLanguage(newLanguage);
    setConfig(SUPPORTED_LANGUAGES[newLanguage]);
    
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  return {
    language,
    config,
    changeLanguage,
    culturalContext: config.culturalContext,
    isRTL: config.rightToLeft || false
  };
}