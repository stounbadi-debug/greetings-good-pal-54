// Cultural Intelligence Display - Global Market Analysis
// Cross-cultural insights and international market performance

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  MapPin, 
  Users, 
  TrendingUp,
  Languages,
  Heart,
  Star,
  Calendar,
  Clock,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

interface CulturalIntelligenceProps {
  demoMode?: boolean;
}

export function CulturalIntelligenceDisplay({ demoMode = false }: CulturalIntelligenceProps) {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const globalMarkets = [
    {
      region: 'North America',
      users: '1.2M',
      engagement: 94.2,
      accuracy: 96.1,
      languages: ['English', 'Spanish', 'French'],
      topGenres: ['Action', 'Comedy', 'Drama'],
      culturalPreferences: {
        'Individualism vs Collectivism': 85,
        'Direct vs Indirect Communication': 78,
        'Fast-paced vs Contemplative': 82
      },
      trendingThemes: ['Superhero Stories', 'Coming of Age', 'Tech Thrillers'],
      growth: '+15.3%'
    },
    {
      region: 'Europe',
      users: '890K',
      engagement: 91.7,
      accuracy: 94.3,
      languages: ['English', 'German', 'French', 'Spanish', 'Italian'],
      topGenres: ['Drama', 'Historical', 'Art House'],
      culturalPreferences: {
        'Individualism vs Collectivism': 65,
        'Direct vs Indirect Communication': 72,
        'Fast-paced vs Contemplative': 45
      },
      trendingThemes: ['Historical Drama', 'Social Issues', 'Family Dynamics'],
      growth: '+23.7%'
    },
    {
      region: 'Asia Pacific',
      users: '2.1M',
      engagement: 88.3,
      accuracy: 89.7,
      languages: ['English', 'Mandarin', 'Japanese', 'Korean', 'Hindi'],
      topGenres: ['Romance', 'Family', 'Action'],
      culturalPreferences: {
        'Individualism vs Collectivism': 35,
        'Direct vs Indirect Communication': 25,
        'Fast-paced vs Contemplative': 60
      },
      trendingThemes: ['Family Honor', 'Romantic Destiny', 'Martial Arts'],
      growth: '+67.2%'
    },
    {
      region: 'Latin America',
      users: '340K',
      engagement: 86.9,
      accuracy: 87.4,
      languages: ['Spanish', 'Portuguese', 'English'],
      topGenres: ['Romance', 'Drama', 'Musical'],
      culturalPreferences: {
        'Individualism vs Collectivism': 45,
        'Direct vs Indirect Communication': 60,
        'Fast-paced vs Contemplative': 70
      },
      trendingThemes: ['Family Values', 'Social Justice', 'Music & Dance'],
      growth: '+45.8%'
    },
    {
      region: 'Middle East/Africa',
      users: '180K',
      engagement: 82.4,
      accuracy: 84.1,
      languages: ['Arabic', 'English', 'French', 'Swahili'],
      topGenres: ['Drama', 'Historical', 'Adventure'],
      culturalPreferences: {
        'Individualism vs Collectivism': 25,
        'Direct vs Indirect Communication': 40,
        'Fast-paced vs Contemplative': 35
      },
      trendingThemes: ['Cultural Heritage', 'Family Honor', 'Adventure'],
      growth: '+89.3%'
    }
  ];

  const culturalInsights = [
    {
      culture: 'East Asian Markets',
      insight: 'Preference for ensemble casts and collective storytelling',
      accuracy: 91.2,
      impact: 'High',
      examples: ['Family dynamics in decision-making', 'Group harmony over individual goals']
    },
    {
      culture: 'Western Markets',
      insight: 'Individual hero journeys and personal transformation',
      accuracy: 94.8,
      impact: 'High',
      examples: ['Self-discovery narratives', 'Overcoming personal obstacles']
    },
    {
      culture: 'Latin Markets',
      insight: 'Emotional storytelling with music and celebration',
      accuracy: 88.7,
      impact: 'Medium',
      examples: ['Music as narrative device', 'Community celebrations']
    },
    {
      culture: 'Nordic Markets',
      insight: 'Dark, contemplative themes with social commentary',
      accuracy: 93.4,
      impact: 'Medium',
      examples: ['Moral ambiguity', 'Social welfare themes']
    }
  ];

  const crossCulturalSuccess = [
    {
      content: 'Parasite (2019)',
      originalMarket: 'South Korea',
      globalSuccess: 96.8,
      culturalAdaptation: {
        'North America': { accuracy: 94.2, themes: ['Class inequality', 'Dark comedy'] },
        'Europe': { accuracy: 96.1, themes: ['Social commentary', 'Cinematography'] },
        'Asia': { accuracy: 98.7, themes: ['Family dynamics', 'Social hierarchy'] }
      }
    },
    {
      content: 'Squid Game (2021)',
      originalMarket: 'South Korea',
      globalSuccess: 94.3,
      culturalAdaptation: {
        'North America': { accuracy: 91.8, themes: ['Survival thriller', 'Economic anxiety'] },
        'Europe': { accuracy: 93.4, themes: ['Capitalism critique', 'Moral choices'] },
        'Latin America': { accuracy: 89.7, themes: ['Desperation', 'Family loyalty'] }
      }
    }
  ];

  const languagePerformance = [
    { language: 'English', users: '3.2M', accuracy: 95.4, content: '2.1M items' },
    { language: 'Mandarin', users: '1.8M', accuracy: 91.2, content: '890K items' },
    { language: 'Spanish', users: '1.1M', accuracy: 89.7, content: '670K items' },
    { language: 'Japanese', users: '780K', accuracy: 93.8, content: '450K items' },
    { language: 'Korean', users: '650K', accuracy: 92.1, content: '380K items' },
    { language: 'French', users: '540K', accuracy: 88.9, content: '320K items' },
    { language: 'German', users: '420K', accuracy: 90.3, content: '280K items' },
    { language: 'Portuguese', users: '380K', accuracy: 87.6, content: '240K items' }
  ];

  const selectedMarket = globalMarkets.find(m => m.region === selectedRegion) || 
    { region: 'Global', users: '4.8M', engagement: 89.2, accuracy: 92.1, languages: ['50+ Languages'], 
      topGenres: ['Drama', 'Action', 'Comedy'], growth: '+35.4%',
      culturalPreferences: { 'Global Average': 65 }, trendingThemes: ['Universal Themes'] };

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 dark:text-blue-200">Global Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">89 Countries</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Active in 6 continents</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 dark:text-green-200">Languages Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">50+</div>
            <div className="text-xs text-green-600 dark:text-green-400">AI-powered localization</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800 dark:text-purple-200">Cultural Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">89.2%</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Cross-cultural understanding</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-800 dark:text-orange-200">Content Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">12.4M</div>
            <div className="text-xs text-orange-600 dark:text-orange-400">Multi-cultural content items</div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Regional Market Analysis
              </CardTitle>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global Overview</SelectItem>
                  {globalMarkets.map((market) => (
                    <SelectItem key={market.region} value={market.region}>
                      {market.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              Deep dive into regional preferences and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-muted/20 text-center">
                  <div className="text-lg font-bold">{selectedMarket.users}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div className="p-3 rounded bg-muted/20 text-center">
                  <div className="text-lg font-bold">{selectedMarket.growth}</div>
                  <div className="text-xs text-muted-foreground">Growth Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engagement Rate</span>
                  <span className="font-medium">{selectedMarket.engagement}%</span>
                </div>
                <Progress value={selectedMarket.engagement} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Top Genres</div>
                <div className="flex flex-wrap gap-1">
                  {selectedMarket.topGenres?.map((genre, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Trending Themes</div>
                <div className="flex flex-wrap gap-1">
                  {selectedMarket.trendingThemes?.map((theme, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-green-600" />
              Language Performance
            </CardTitle>
            <CardDescription>
              AI accuracy and engagement across different languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {languagePerformance.slice(0, 6).map((lang, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lang.language}</div>
                    <div className="text-xs text-muted-foreground">
                      {lang.users} users • {lang.content}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{lang.accuracy}%</div>
                    <Progress value={lang.accuracy} className="w-16 h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cultural Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Cultural Intelligence Insights
          </CardTitle>
          <CardDescription>
            AI-powered understanding of cultural preferences and storytelling patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {culturalInsights.map((insight, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{insight.culture}</h3>
                  <Badge 
                    variant={insight.impact === 'High' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {insight.impact} Impact
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {insight.insight}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Prediction Accuracy</span>
                    <span className="font-medium">{insight.accuracy}%</span>
                  </div>
                  <Progress value={insight.accuracy} className="h-1" />
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-muted-foreground mb-1">Key Patterns:</div>
                  <div className="text-xs">
                    {insight.examples.map((example, idx) => (
                      <div key={idx}>• {example}</div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Cultural Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Cross-Cultural Success Analysis
          </CardTitle>
          <CardDescription>
            How Lunim's AI accurately predicted global appeal of regional content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {crossCulturalSuccess.map((success, index) => (
              <Card key={index} className="p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{success.content}</h3>
                    <p className="text-sm text-muted-foreground">
                      Origin: {success.originalMarket} • Global Success: {success.globalSuccess}%
                    </p>
                  </div>
                  <Badge variant="default" className="bg-yellow-600">
                    Global Hit
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(success.culturalAdaptation).map(([region, data]) => (
                    <div key={region} className="p-3 rounded border">
                      <div className="font-medium text-sm mb-2">{region}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        AI Accuracy: {data.accuracy}%
                      </div>
                      <div className="space-y-1">
                        {data.themes.map((theme, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs mr-1">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}