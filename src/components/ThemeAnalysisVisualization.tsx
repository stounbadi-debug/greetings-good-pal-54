// Theme Analysis Visualization Component
// Displays sophisticated theme analysis results with interactive exploration

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  ThemeAnalysisResult, 
  IdentifiedTheme, 
  ArchetypalPattern, 
  PsychologicalNeed 
} from '@/lib/theme-recognition-engine';
import { 
  AdvancedThemeRecommendationResult, 
  ThemeJourney, 
  ThemeInsight 
} from '@/lib/advanced-theme-analysis';

interface ThemeAnalysisVisualizationProps {
  analysis: AdvancedThemeRecommendationResult;
  onThemeExplore?: (theme: string) => void;
  onMovieSelect?: (movieId: number) => void;
}

export function ThemeAnalysisVisualization({ 
  analysis, 
  onThemeExplore, 
  onMovieSelect 
}: ThemeAnalysisVisualizationProps) {
  const { themeAnalysis, themeJourney, insights } = analysis;

  return (
    <div className="space-y-6 p-6">
      {/* Overview Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎭 Theme Analysis Overview
            <Badge variant="outline" className="ml-auto">
              {themeAnalysis.thematicComplexity}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round(themeAnalysis.confidenceScore * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Analysis Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {themeAnalysis.primaryThemes.length + themeAnalysis.secondaryThemes.length}
              </div>
              <div className="text-sm text-muted-foreground">Themes Identified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {themeAnalysis.psychologicalNeeds.length}
              </div>
              <div className="text-sm text-muted-foreground">Psychological Needs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="themes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="archetypal">Archetypal</TabsTrigger>
          <TabsTrigger value="psychological">Psychological</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Primary & Secondary Themes */}
        <TabsContent value="themes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThemeSection 
              title="Primary Themes" 
              themes={themeAnalysis.primaryThemes}
              onThemeExplore={onThemeExplore}
            />
            <ThemeSection 
              title="Secondary Themes" 
              themes={themeAnalysis.secondaryThemes}
              onThemeExplore={onThemeExplore}
            />
          </div>
        </TabsContent>

        {/* Archetypal Patterns */}
        <TabsContent value="archetypal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🏛️ Universal Story Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {themeAnalysis.archetypalPatterns.map((pattern, index) => (
                  <ArchetypalPatternCard key={index} pattern={pattern} />
                ))}
                {themeAnalysis.archetypalPatterns.length === 0 && (
                  <div className="text-muted-foreground text-center py-8">
                    No specific archetypal patterns detected in this query
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Psychological Needs */}
        <TabsContent value="psychological" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🧠 Psychological Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themeAnalysis.psychologicalNeeds.map((need, index) => (
                  <PsychologicalNeedCard key={index} need={need} />
                ))}
              </div>
              
              {/* Life Stage Alignment */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Life Stage Alignment</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {themeAnalysis.lifeStageAlignment.primaryStage}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Primary stage</span>
                </div>
                {themeAnalysis.lifeStageAlignment.relevantStages.length > 1 && (
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Also relevant: </span>
                    {themeAnalysis.lifeStageAlignment.relevantStages
                      .filter(stage => stage !== themeAnalysis.lifeStageAlignment.primaryStage)
                      .map(stage => (
                        <Badge key={stage} variant="outline" className="ml-1">
                          {stage}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Journey */}
        <TabsContent value="journey" className="space-y-4">
          <ThemeJourneyVisualization journey={themeJourney} />
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ThemeSection({ 
  title, 
  themes, 
  onThemeExplore 
}: { 
  title: string; 
  themes: IdentifiedTheme[]; 
  onThemeExplore?: (theme: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {themes.map((theme, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span 
                  className="font-medium cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onThemeExplore?.(theme.theme)}
                >
                  {theme.theme}
                </span>
                <Badge variant={theme.confidence > 0.8 ? 'default' : 'secondary'}>
                  {Math.round(theme.confidence * 100)}%
                </Badge>
              </div>
              <Progress value={theme.confidence * 100} className="h-2" />
              <p className="text-sm text-muted-foreground">{theme.explanation}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ArchetypalPatternCard({ pattern }: { pattern: ArchetypalPattern }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{pattern.pattern}</h4>
        <Badge variant="outline">{Math.round(pattern.relevance * 100)}%</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
      <div className="text-xs text-muted-foreground">
        Stage: <span className="font-medium">{pattern.stage}</span>
      </div>
    </div>
  );
}

function PsychologicalNeedCard({ need }: { need: PsychologicalNeed }) {
  const getCategoryColor = (category: string) => {
    const colors = {
      belonging: 'bg-blue-100 text-blue-800',
      identity: 'bg-purple-100 text-purple-800',
      purpose: 'bg-green-100 text-green-800',
      growth: 'bg-orange-100 text-orange-800',
      healing: 'bg-pink-100 text-pink-800',
      understanding: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{need.need}</span>
              <Badge className={getCategoryColor(need.category)}>
                {need.category}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Intensity:</span>
                <span>{Math.round(need.intensity * 100)}%</span>
              </div>
              <Progress value={need.intensity * 100} className="h-1" />
              <div className="flex justify-between text-sm">
                <span>Therapeutic Value:</span>
                <span>{Math.round(need.therapeutic_value * 100)}%</span>
              </div>
              <Progress value={need.therapeutic_value * 100} className="h-1" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>This psychological need shows high therapeutic potential for movie recommendations</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ThemeJourneyVisualization({ journey }: { journey: ThemeJourney }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🗺️ Your Thematic Journey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Current Phase</h4>
          <Badge variant="default" className="text-sm">
            {journey.currentPhase}
          </Badge>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Suggested Progression</h4>
          <div className="flex flex-wrap gap-2">
            {journey.suggestedProgression.map((step, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {index + 1}. {step}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Alternative Explorations</h4>
          <div className="space-y-2">
            {journey.alternativeExplorations.map((alt, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                • {alt}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Complementary Themes</h4>
          <div className="flex flex-wrap gap-2">
            {journey.complementaryThemes.map((theme, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InsightCard({ insight }: { insight: ThemeInsight }) {
  const getInsightIcon = (type: string) => {
    const icons = {
      psychological: '🧠',
      cultural: '🌍',
      archetypal: '🏛️',
      therapeutic: '🌱'
    };
    return icons[type as keyof typeof icons] || '💡';
  };

  return (
    <Card className={insight.actionable ? 'border-primary/50' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-xl">{getInsightIcon(insight.type)}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {insight.type}
              </Badge>
              <div className="flex items-center gap-2">
                <Progress value={insight.relevance * 100} className="w-16 h-2" />
                <span className="text-xs text-muted-foreground">
                  {Math.round(insight.relevance * 100)}%
                </span>
              </div>
            </div>
            <p className="text-sm">{insight.insight}</p>
            {insight.actionable && (
              <Badge variant="secondary" className="mt-2 text-xs">
                Actionable
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}