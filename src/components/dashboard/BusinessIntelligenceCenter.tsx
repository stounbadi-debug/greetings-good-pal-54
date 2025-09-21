// Business Intelligence Center - Analytics & ROI Tracking
// Comprehensive business metrics and industry benchmarking

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  BarChart3,
  PieChart,
  MapPin,
  Clock,
  Zap,
  Trophy,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface BusinessIntelligenceProps {
  demoMode?: boolean;
}

export function BusinessIntelligenceCenter({ demoMode = false }: BusinessIntelligenceProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const businessMetrics = {
    userEngagement: {
      activeUsers: 2437000,
      avgSessionTime: '14.2 min',
      retentionRate: 84.7,
      churnRate: 3.2,
      nps: 68,
      trend: '+12.3%'
    },
    revenueMetrics: {
      arpu: 24.67,
      ltv: 347.89,
      conversionRate: 12.4,
      subscriptionGrowth: 23.8,
      churnRevenue: 89340,
      trend: '+18.7%'
    },
    competitiveAnalysis: {
      marketShare: 12.4,
      competitorGap: '+21.3%',
      featureAdvantage: 94.2,
      priceCompetitiveness: 87.6,
      brandSentiment: 89.3
    }
  };

  const industryBenchmarks = [
    { metric: 'Recommendation CTR', lunim: 8.7, industry: 3.2, improvement: '+171%' },
    { metric: 'User Engagement', lunim: 84.7, industry: 62.1, improvement: '+36%' },
    { metric: 'Content Discovery', lunim: 76.3, industry: 45.9, improvement: '+66%' },
    { metric: 'Retention Rate', lunim: 84.7, industry: 68.2, improvement: '+24%' },
    { metric: 'Revenue per User', lunim: 24.67, industry: 18.34, improvement: '+35%' }
  ];

  const clientROICase = [
    {
      client: 'StreamMax Pro',
      industry: 'Streaming Platform',
      users: '2.3M',
      improvement: '+247%',
      details: {
        engagementIncrease: '+73%',
        churnReduction: '-45%',
        revenueGrowth: '+156%',
        timeToValue: '3 weeks'
      }
    },
    {
      client: 'CineVault Studios',
      industry: 'Film Distribution',
      users: '890K',
      improvement: '+189%',
      details: {
        discoveryRate: '+92%',
        viewingTime: '+67%',
        subscriptionGrowth: '+134%',
        timeToValue: '2 weeks'
      }
    },
    {
      client: 'GlobalFlix Network',
      industry: 'International Streaming',
      users: '4.1M',
      improvement: '+298%',
      details: {
        crossCulturalEngagement: '+156%',
        internationalGrowth: '+203%',
        localizationEfficiency: '+87%',
        timeToValue: '4 weeks'
      }
    }
  ];

  const geographicPerformance = [
    { region: 'North America', users: '1.2M', engagement: 94.2, revenue: '$2.1M', growth: '+15.3%' },
    { region: 'Europe', users: '890K', engagement: 91.7, revenue: '$1.8M', growth: '+23.7%' },
    { region: 'Asia Pacific', users: '2.1M', engagement: 88.3, revenue: '$1.4M', growth: '+67.2%' },
    { region: 'Latin America', users: '340K', engagement: 86.9, revenue: '$420K', growth: '+45.8%' },
    { region: 'Middle East/Africa', users: '180K', engagement: 82.4, revenue: '$210K', growth: '+89.3%' }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800 dark:text-green-200">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">+247%</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUp className="w-3 h-3" />
              Average client ROI
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800 dark:text-blue-200">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">84.7%</div>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <ArrowUp className="w-3 h-3" />
              vs 62% industry avg
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800 dark:text-purple-200">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">2.4M</div>
            <div className="flex items-center gap-1 text-xs text-purple-600">
              <ArrowUp className="w-3 h-3" />
              +23.8% this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-800 dark:text-orange-200">Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">12.4%</div>
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <ArrowUp className="w-3 h-3" />
              Entertainment AI sector
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="benchmarks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
          <TabsTrigger value="roi">Client ROI Cases</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Performance vs Industry Leaders
              </CardTitle>
              <CardDescription>
                Lunim's competitive advantage across key entertainment metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {industryBenchmarks.map((benchmark, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{benchmark.metric}</span>
                      <Badge variant="default" className="bg-green-600">
                        {benchmark.improvement}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-primary font-medium">Lunim</span>
                          <span className="font-mono">
                            {typeof benchmark.lunim === 'number' && benchmark.lunim > 50 
                              ? `${benchmark.lunim}%` 
                              : typeof benchmark.lunim === 'number' 
                              ? `$${benchmark.lunim}` 
                              : benchmark.lunim}
                          </span>
                        </div>
                        <Progress value={typeof benchmark.lunim === 'number' ? benchmark.lunim : 0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Industry Avg</span>
                          <span className="font-mono">
                            {typeof benchmark.industry === 'number' && benchmark.industry > 50 
                              ? `${benchmark.industry}%` 
                              : typeof benchmark.industry === 'number' 
                              ? `$${benchmark.industry}` 
                              : benchmark.industry}
                          </span>
                        </div>
                        <Progress 
                          value={typeof benchmark.industry === 'number' ? benchmark.industry : 0} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {clientROICase.map((clientCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{clientCase.client}</CardTitle>
                    <Badge variant="outline">{clientCase.improvement}</Badge>
                  </div>
                  <CardDescription>{clientCase.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">User Base</span>
                      <span className="font-medium">{clientCase.users}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(clientCase.details).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Global Performance Analysis
              </CardTitle>
              <CardDescription>
                Regional engagement and revenue metrics across all markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicPerformance.map((region, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{region.region}</h3>
                      <Badge 
                        variant={region.growth.startsWith('+') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {region.growth}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Users</div>
                        <div className="font-medium">{region.users}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Engagement</div>
                        <div className="font-medium">{region.engagement}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div className="font-medium">{region.revenue}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Growth</div>
                        <div className={`font-medium ${region.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {region.growth}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Trend Predictions & Market Intelligence
              </CardTitle>
              <CardDescription>
                AI-powered predictions for entertainment content trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Emerging Content Trends</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">AI/Tech Thrillers</span>
                      <Badge variant="default">+234%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Climate Fiction</span>
                      <Badge variant="default">+187%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Cultural Identity Stories</span>
                      <Badge variant="default">+156%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">Mental Health Narratives</span>
                      <Badge variant="default">+143%</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Market Opportunities</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded border">
                      <div className="font-medium text-sm">Emerging Markets</div>
                      <div className="text-xs text-muted-foreground">
                        Southeast Asia showing 89% growth potential
                      </div>
                      <Progress value={89} className="h-1 mt-2" />
                    </div>
                    <div className="p-3 rounded border">
                      <div className="font-medium text-sm">GenZ Demographics</div>
                      <div className="text-xs text-muted-foreground">
                        Short-form content engagement up 156%
                      </div>
                      <Progress value={76} className="h-1 mt-2" />
                    </div>
                    <div className="p-3 rounded border">
                      <div className="font-medium text-sm">Cross-Platform Integration</div>
                      <div className="text-xs text-muted-foreground">
                        Multi-device viewing patterns increasing
                      </div>
                      <Progress value={84} className="h-1 mt-2" />
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