// Global Entertainment Discovery Dashboard
// Multi-language cultural intelligence showcase

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher, useLanguageContext } from '@/components/LanguageSwitcher';
import { Globe, Sparkles, TrendingUp, Film, Users } from 'lucide-react';

export function GlobalEntertainmentDashboard() {
  const { language, config, culturalContext } = useLanguageContext();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/multi-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          language,
          intentType: 'recommendation'
        })
      });
      
      const result = await response.json();
      console.log('🌍 Global search result:', result);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Global Entertainment Discovery
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered cultural intelligence for {config.nativeName} entertainment discovery
        </p>
      </div>

      {/* Language Switcher */}
      <div className="max-w-md mx-auto">
        <LanguageSwitcher showCulturalContext={true} />
      </div>

      {/* Search Interface */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Cultural Intelligence Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search for ${config.nativeName} entertainment...`}
              className="flex-1"
              dir={config.rightToLeft ? 'rtl' : 'ltr'}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Discover'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-medium">Cultural Themes</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {culturalContext.primaryThemes.slice(0, 3).map(theme => (
                    <Badge key={theme} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Film className="h-4 w-4 text-primary" />
                  <span className="font-medium">Platforms</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {config.streamingPlatforms.length} regional platforms
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Festivals</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {config.festivals.length} major festivals
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">8+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">$70B</div>
            <div className="text-sm text-muted-foreground">Global Market</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">80%</div>
            <div className="text-sm text-muted-foreground">Non-English Growth</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Cultural Themes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}