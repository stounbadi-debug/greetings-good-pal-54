// Theme-Enhanced Movie Recommendations Component
// Integrates advanced theme analysis with movie recommendations

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';
import EnhancedMovieCard from '@/components/EnhancedMovieCard';
import { useThemeAnalysis, ThemeAnalysisQuery } from '@/hooks/useThemeAnalysis';
import { AlertCircle, Sparkles } from 'lucide-react';

interface ThemeEnhancedRecommendationsProps {
  initialQuery?: string;
  onMovieSelect?: (movieId: number) => void;
  className?: string;
}

export function ThemeEnhancedRecommendations({ 
  initialQuery = '',
  onMovieSelect,
  className 
}: ThemeEnhancedRecommendationsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [emotionalContext, setEmotionalContext] = useState('');
  const [lifeStage, setLifeStage] = useState('');
  const [specificNeeds, setSpecificNeeds] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    analyzeThemes,
    isAnalyzing,
    result,
    error,
    clearResults,
    clearError
  } = useThemeAnalysis();

  const handleAnalyze = async () => {
    if (!query.trim()) return;

    const analysisQuery: ThemeAnalysisQuery = {
      query: query.trim(),
      emotionalContext: emotionalContext || undefined,
      lifeStage: lifeStage || undefined,
      specificNeeds: specificNeeds ? specificNeeds.split(',').map(n => n.trim()) : undefined
    };

    await analyzeThemes(analysisQuery);
  };

  const handleThemeExplore = (theme: string) => {
    setQuery(`Movies about ${theme}`);
  };

  const lifeStageOptions = [
    { value: 'childhood', label: 'Childhood (Wonder & Adventure)' },
    { value: 'adolescence', label: 'Adolescence (Identity & Growth)' },
    { value: 'young_adult', label: 'Young Adult (Independence & Exploration)' },
    { value: 'early_adulthood', label: 'Early Adulthood (Career & Relationships)' },
    { value: 'midlife', label: 'Midlife (Purpose & Legacy)' },
    { value: 'later_life', label: 'Later Life (Wisdom & Reflection)' },
    { value: 'universal', label: 'Universal Themes' }
  ];

  return (
    <div className={className}>
      {/* Query Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Advanced Theme Recognition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="query">What kind of movie experience are you seeking?</Label>
            <Textarea
              id="query"
              placeholder="Describe what you're looking for... (e.g., 'I want something about finding yourself after a major life change' or 'Stories about overcoming impossible odds')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Advanced Options Toggle */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label htmlFor="emotional-context">Emotional Context</Label>
                <Input
                  id="emotional-context"
                  placeholder="e.g., feeling lost, celebrating success, processing grief"
                  value={emotionalContext}
                  onChange={(e) => setEmotionalContext(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="life-stage">Life Stage</Label>
                <Select value={lifeStage} onValueChange={setLifeStage}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your current life stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {lifeStageOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="specific-needs">Specific Needs (comma-separated)</Label>
                <Input
                  id="specific-needs"
                  placeholder="e.g., healing, inspiration, understanding, growth"
                  value={specificNeeds}
                  onChange={(e) => setSpecificNeeds(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyze} 
              disabled={!query.trim() || isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <LoadingSpinner />
                  Analyzing Themes...
                </>
              ) : (
                'Analyze & Recommend'
              )}
            </Button>
            
            {result && (
              <Button 
                variant="outline" 
                onClick={clearResults}
              >
                Clear
              </Button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
              <Button size="sm" variant="ghost" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Theme Analysis Visualization */}
          {/* Theme Analysis Visualization would go here */}
          <div
            className="p-4 bg-muted/20 rounded-lg">
            <p>Advanced theme analysis results would be displayed here</p>
          </div>

          {/* Recommended Movies */}
          {result.recommendedMovies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎬 Theme-Based Recommendations
                  <Badge variant="secondary">
                    {result.recommendedMovies.length} movies
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.recommendedMovies.map((rec, index) => (
                    <div key={index} className="space-y-2">
                      <EnhancedMovieCard 
                        movie={rec.movie}
                      />
                      
                      {/* Theme Matching Details */}
                      <div className="text-sm space-y-1 p-2 bg-muted/30 rounded">
                        <div className="flex justify-between">
                          <span>Theme Alignment:</span>
                          <Badge variant="outline">
                            {Math.round(rec.themeAlignment * 100)}%
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Psychological Relevance:</span>
                          <Badge variant="outline">
                            {Math.round(rec.psychologicalRelevance * 100)}%
                          </Badge>
                        </div>
                        
                        {rec.therapeuticValue > 0 && (
                          <div className="flex justify-between">
                            <span>Therapeutic Value:</span>
                            <Badge variant="outline">
                              {Math.round(rec.therapeuticValue * 100)}%
                            </Badge>
                          </div>
                        )}
                        
                        {rec.matchedThemes.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-muted-foreground mb-1">Matched Themes:</div>
                            <div className="flex flex-wrap gap-1">
                              {rec.matchedThemes.slice(0, 3).map(theme => (
                                <Badge key={theme} variant="secondary">
                                  {theme}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {rec.explanation && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {rec.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}