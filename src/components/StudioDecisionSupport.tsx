// Studio Decision Support Dashboard - Phase 2
// Investment ROI prediction and risk assessment for content decisions

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  Target,
  Calendar,
  Users,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';

interface InvestmentAnalysis {
  recommendedBudget: number;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  breakEvenPoint: number;
  marketSaturation: number;
  competitorAnalysis: {
    similarProjects: number;
    avgPerformance: number;
    marketGap: boolean;
  };
}

interface TalentAnalysis {
  name: string;
  type: 'director' | 'actor' | 'producer';
  boxOfficeValue: number;
  riskFactor: number;
  recentTrend: 'rising' | 'stable' | 'declining';
}

export function StudioDecisionSupport() {
  const [projectTitle, setProjectTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);
  const [talentData, setTalentData] = useState<TalentAnalysis[]>([]);

  const mockAnalysis: InvestmentAnalysis = {
    recommendedBudget: 45000000,
    expectedROI: 187,
    riskLevel: 'medium',
    breakEvenPoint: 95000000,
    marketSaturation: 65,
    competitorAnalysis: {
      similarProjects: 3,
      avgPerformance: 156000000,
      marketGap: true
    }
  };

  const mockTalentData: TalentAnalysis[] = [
    {
      name: 'Christopher Nolan',
      type: 'director',
      boxOfficeValue: 285,
      riskFactor: 15,
      recentTrend: 'stable'
    },
    {
      name: 'Margot Robbie',
      type: 'actor',
      boxOfficeValue: 195,
      riskFactor: 25,
      recentTrend: 'rising'
    }
  ];

  const handleAnalyze = async () => {
    if (!projectTitle.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setTalentData(mockTalentData);
      setIsAnalyzing(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Studio Decision Support
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered investment analysis, risk assessment, and ROI prediction for content development decisions
        </p>
      </div>

      {/* Project Input */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Project Investment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Project Title/Concept</label>
              <Input
                placeholder="Enter project name or concept..."
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Proposed Budget</label>
              <Input
                placeholder="e.g., $50M"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!projectTitle.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Investment...' : 'Analyze Investment Opportunity'}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Expected ROI</p>
                    <p className="text-2xl font-bold text-green-600">{analysis.expectedROI}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Recommended: {formatCurrency(analysis.recommendedBudget)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                    <p className={`text-2xl font-bold capitalize ${getRiskColor(analysis.riskLevel)}`}>
                      {analysis.riskLevel}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <Progress value={analysis.riskLevel === 'low' ? 30 : analysis.riskLevel === 'medium' ? 65 : 90} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Break-Even Point</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(analysis.breakEvenPoint)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Global box office target
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Market Saturation</p>
                    <p className="text-2xl font-bold text-orange-600">{analysis.marketSaturation}%</p>
                  </div>
                  <PieChart className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-2">
                  <Progress value={analysis.marketSaturation} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="financial" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financial">Financial Forecast</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="talent">Talent Analysis</TabsTrigger>
              <TabsTrigger value="competition">Market Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Projections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Revenue Scenarios</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded">
                          <span className="font-medium">Optimistic</span>
                          <span className="text-green-600 font-bold">{formatCurrency(285000000)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
                          <span className="font-medium">Most Likely</span>
                          <span className="text-blue-600 font-bold">{formatCurrency(185000000)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded">
                          <span className="font-medium">Conservative</span>
                          <span className="text-yellow-600 font-bold">{formatCurrency(125000000)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Investment Recommendation</h4>
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-primary">Recommended Action: PROCEED</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Strong ROI potential with manageable risk profile. Market conditions favorable for this genre.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Factors Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Market Saturation</h4>
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            3 similar projects in development. Timing and differentiation crucial.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900 dark:text-green-100">Strong IP Foundation</h4>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            Proven concept with built-in audience interest and merchandising potential.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="talent" className="space-y-4">
              <div className="grid gap-4">
                {talentData.map((talent, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{talent.name}</h3>
                          <Badge variant="outline" className="mt-1 capitalize">
                            {talent.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(talent.recentTrend)}
                          <span className="text-sm capitalize">{talent.recentTrend}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Box Office Value</p>
                          <div className="flex items-center gap-2">
                            <Progress value={talent.boxOfficeValue / 3} className="flex-1" />
                            <span className="text-sm font-medium">{talent.boxOfficeValue}M avg</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Risk Factor</p>
                          <div className="flex items-center gap-2">
                            <Progress value={talent.riskFactor} className="flex-1" />
                            <span className="text-sm font-medium">{talent.riskFactor}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Competitive Landscape
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {analysis.competitorAnalysis.similarProjects}
                      </div>
                      <div className="text-sm text-muted-foreground">Similar Projects</div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {formatCurrency(analysis.competitorAnalysis.avgPerformance)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Performance</div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {analysis.competitorAnalysis.marketGap ? 'YES' : 'NO'}
                      </div>
                      <div className="text-sm text-muted-foreground">Market Gap</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}