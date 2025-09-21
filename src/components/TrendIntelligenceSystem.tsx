// Trend Intelligence System
// Emerging theme detection and cultural moment identification

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Zap, 
  Globe,
  Calendar,
  Users,
  Heart,
  Eye,
  MessageCircle,
  BarChart3,
  AlertTriangle,
  Target,
  Clock
} from 'lucide-react';

interface TrendData {
  id: string;
  theme: string;
  momentum: number;
  velocity: 'rising' | 'stable' | 'declining';
  timeframe: string;
  markets: string[];
  demographic: string;
  confidence: number;
  culturalMoments: string[];
  contentOpportunities: string[];
}

interface EmergingTrend {
  trend: string;
  growthRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeToMarket: string;
  predictedPeak: string;
}

export function TrendIntelligenceSystem() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [emergingTrends, setEmergingTrends] = useState<EmergingTrend[]>([]);

  const mockTrends: TrendData[] = [
    {
      id: '1',
      theme: 'Climate Fiction (Cli-Fi)',
      momentum: 87,
      velocity: 'rising',
      timeframe: 'Last 30 days',
      markets: ['North America', 'Europe', 'Australia'],
      demographic: '18-45',
      confidence: 92,
      culturalMoments: ['COP28 Conference', 'Extreme Weather Events', 'Youth Climate Activism'],
      contentOpportunities: ['Post-apocalyptic dramas', 'Environmental thrillers', 'Solarpunk narratives']
    },
    {
      id: '2',
      theme: 'AI Consciousness Narratives',
      momentum: 94,
      velocity: 'rising',
      timeframe: 'Last 7 days',
      markets: ['Global'],
      demographic: '25-54',
      confidence: 89,
      culturalMoments: ['ChatGPT advancements', 'AI regulation debates', 'Tech worker automation fears'],
      contentOpportunities: ['AI-human relationships', 'Digital consciousness', 'Tech thriller concepts']
    },
    {
      id: '3',
      theme: 'Intergenerational Stories',
      momentum: 73,
      velocity: 'stable',
      timeframe: 'Last 60 days',
      markets: ['Asia-Pacific', 'North America'],
      demographic: '35-65',
      confidence: 85,
      culturalMoments: ['Aging populations', 'Family reunification post-COVID', 'Wisdom transfer themes'],
      contentOpportunities: ['Family sagas', 'Mentorship narratives', 'Cultural preservation stories']
    },
    {
      id: '4',
      theme: 'Space Commercialization',
      momentum: 65,
      velocity: 'declining',
      timeframe: 'Last 90 days',
      markets: ['North America', 'Europe'],
      demographic: '18-34',
      confidence: 78,
      culturalMoments: ['SpaceX missions', 'Space tourism growth', 'Mars exploration plans'],
      contentOpportunities: ['Space entrepreneur stories', 'Orbital conflict narratives', 'Space tourism adventures']
    }
  ];

  const mockEmergingTrends: EmergingTrend[] = [
    {
      trend: 'Regenerative Agriculture Stories',
      growthRate: 245,
      riskLevel: 'low',
      timeToMarket: '6-8 months',
      predictedPeak: 'Q2 2025'
    },
    {
      trend: 'Digital Nomad Communities',
      growthRate: 189,
      riskLevel: 'medium',
      timeToMarket: '3-4 months',
      predictedPeak: 'Q1 2025'
    },
    {
      trend: 'Longevity Science Fiction',
      growthRate: 156,
      riskLevel: 'high',
      timeToMarket: '8-12 months',
      predictedPeak: 'Q3 2025'
    }
  ];

  useEffect(() => {
    // Simulate real-time trend analysis
    setTrends(mockTrends);
    setEmergingTrends(mockEmergingTrends);
  }, []);

  const refreshTrends = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate updated data
    }, 1500);
  };

  const getVelocityIcon = (velocity: string) => {
    switch (velocity) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            Trend Intelligence System
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time cultural moment detection and emerging theme analysis
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button onClick={refreshTrends} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Refresh Trends'}
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Trends</p>
                <p className="text-2xl font-bold text-primary">247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cultural Moments</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">High-impact events tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emerging Themes</p>
                <p className="text-2xl font-bold text-blue-600">34</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Early-stage opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prediction Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">91%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Trends Analysis */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Trends</TabsTrigger>
          <TabsTrigger value="emerging">Emerging Themes</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Moments</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {trends.map((trend) => (
              <Card key={trend.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getVelocityIcon(trend.velocity)}
                      {trend.theme}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={trend.velocity === 'rising' ? 'default' : 'secondary'}>
                        {trend.momentum}% momentum
                      </Badge>
                      <Badge variant="outline">
                        {trend.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Demographics & Markets
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Target: {trend.demographic}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {trend.markets.map(market => (
                          <Badge key={market} variant="outline" className="text-xs">
                            {market}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Cultural Drivers
                      </h4>
                      <div className="space-y-1">
                        {trend.culturalMoments.slice(0, 2).map(moment => (
                          <p key={moment} className="text-xs text-muted-foreground">
                            • {moment}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Content Opportunities
                      </h4>
                      <div className="space-y-1">
                        {trend.contentOpportunities.slice(0, 2).map(opportunity => (
                          <p key={opportunity} className="text-xs text-muted-foreground">
                            • {opportunity}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Trend Momentum</span>
                      <span className="text-sm text-muted-foreground">{trend.momentum}%</span>
                    </div>
                    <Progress value={trend.momentum} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emerging" className="space-y-4">
          <div className="grid gap-4">
            {emergingTrends.map((trend, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{trend.trend}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getRiskColor(trend.riskLevel)}>
                        {trend.riskLevel} risk
                      </Badge>
                      <Badge variant="default">
                        +{trend.growthRate}% growth
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Time to Market</p>
                        <p className="text-sm text-muted-foreground">{trend.timeToMarket}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Predicted Peak</p>
                        <p className="text-sm text-muted-foreground">{trend.predictedPeak}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Investment Signal</p>
                        <p className="text-sm text-green-600">Strong opportunity</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Cultural Moment Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-100">
                        High-Impact Cultural Moment
                      </h4>
                      <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                        Global climate summit driving 340% increase in climate fiction interest
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                        Recommended action: Fast-track climate-themed content development
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-2">
                    <Eye className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                        Emerging Cultural Shift
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                        AI consciousness discussions reaching mainstream, 89% audience awareness
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
                        Opportunity window: 3-6 months for optimal market entry
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}