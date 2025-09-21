// Client Presentation Hub - Interactive Demo Platform
// ROI calculators and interactive scenarios for entertainment industry prospects

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Target, 
  Play, 
  Users, 
  DollarSign,
  TrendingUp,
  Palette,
  Globe,
  Zap,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ClientPresentationProps {
  demoMode?: boolean;
}

export function ClientPresentationHub({ demoMode = false }: ClientPresentationProps) {
  const [selectedPersona, setSelectedPersona] = useState('streaming-platform');
  const [roiInputs, setRoiInputs] = useState({
    monthlyUsers: 1000000,
    currentChurn: 15,
    avgRevenuePer: 12.99,
    industryType: 'streaming'
  });
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const clientPersonas = [
    {
      id: 'streaming-platform',
      title: 'Streaming Platform',
      icon: Play,
      description: 'Netflix, Hulu, Disney+ competitors',
      painPoints: ['High churn rates', 'Content discovery issues', 'User engagement'],
      solutions: ['AI recommendations', 'Emotional targeting', 'Cultural adaptation']
    },
    {
      id: 'studio',
      title: 'Film Studio',
      icon: Award,
      description: 'Major film studios and distributors',
      painPoints: ['Market prediction', 'Audience targeting', 'ROI optimization'],
      solutions: ['Trend analysis', 'Demographic insights', 'Performance forecasting']
    },
    {
      id: 'broadcaster',
      title: 'TV Broadcaster',
      icon: Globe,
      description: 'Traditional and digital broadcasters',
      painPoints: ['Scheduling optimization', 'Audience retention', 'Ad targeting'],
      solutions: ['Smart scheduling', 'Viewer analytics', 'Targeted advertising']
    },
    {
      id: 'streaming-aggregator',
      title: 'Content Aggregator',
      icon: Target,
      description: 'Multi-platform content aggregators',
      painPoints: ['Content curation', 'Cross-platform sync', 'User preferences'],
      solutions: ['Intelligent curation', 'Universal profiles', 'Preference learning']
    }
  ];

  const calculateROI = () => {
    const { monthlyUsers, currentChurn, avgRevenuePer } = roiInputs;
    
    // Current metrics
    const currentMonthlyRevenue = monthlyUsers * avgRevenuePer;
    const currentChurnUsers = monthlyUsers * (currentChurn / 100);
    const currentChurnLoss = currentChurnUsers * avgRevenuePer;
    
    // With Lunim improvements (conservative estimates)
    const improvedChurn = Math.max(1, currentChurn * 0.55); // 45% churn reduction
    const improvedEngagement = 1.34; // 34% engagement increase
    const improvedDiscovery = 1.23; // 23% discovery improvement
    
    const newMonthlyRevenue = monthlyUsers * avgRevenuePer * improvedEngagement;
    const newChurnUsers = monthlyUsers * (improvedChurn / 100);
    const newChurnLoss = newChurnUsers * avgRevenuePer;
    
    const monthlyImprovement = (newMonthlyRevenue - currentMonthlyRevenue) + (currentChurnLoss - newChurnLoss);
    const annualImprovement = monthlyImprovement * 12;
    const roiPercentage = (annualImprovement / currentMonthlyRevenue / 12) * 100;
    
    return {
      currentRevenue: currentMonthlyRevenue,
      projectedRevenue: newMonthlyRevenue,
      monthlyImprovement,
      annualImprovement,
      roiPercentage,
      churnReduction: currentChurn - improvedChurn,
      engagementIncrease: (improvedEngagement - 1) * 100
    };
  };

  const roiResults = calculateROI();

  const demoScenarios = [
    {
      id: 'emotional-targeting',
      title: 'Emotional Intelligence Demo',
      description: 'Watch AI analyze user emotions and adapt recommendations',
      duration: '3 min',
      highlight: 'Live emotion detection'
    },
    {
      id: 'cultural-adaptation',
      title: 'Cross-Cultural Recommendations',
      description: 'See how AI adapts to different cultural contexts',
      duration: '4 min',
      highlight: '89 countries supported'
    },
    {
      id: 'real-time-analytics',
      title: 'Real-Time Performance Dashboard',
      description: 'Live view of recommendation accuracy and user engagement',
      duration: '5 min',
      highlight: 'Real-time metrics'
    },
    {
      id: 'competitive-analysis',
      title: 'Competitive Advantage Analysis',
      description: 'Side-by-side comparison with industry leaders',
      duration: '6 min',
      highlight: '+247% better results'
    }
  ];

  const whiteLabelFeatures = [
    { feature: 'Custom Branding', included: true, description: 'Full UI customization with your brand' },
    { feature: 'API Integration', included: true, description: 'Seamless integration with existing systems' },
    { feature: 'Multi-language Support', included: true, description: '50+ languages supported' },
    { feature: 'Advanced Analytics', included: true, description: 'Comprehensive reporting dashboard' },
    { feature: 'Enterprise Security', included: true, description: 'SOC 2 compliant infrastructure' },
    { feature: 'Dedicated Support', included: true, description: '24/7 enterprise support team' },
    { feature: 'Custom AI Training', included: false, description: 'Train AI on your specific content' },
    { feature: 'On-Premise Deployment', included: false, description: 'Full on-premise installation available' }
  ];

  return (
    <div className="space-y-6">
      {/* Client Persona Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Select Client Type for Customized Presentation
          </CardTitle>
          <CardDescription>
            Tailored demonstrations for different entertainment industry segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientPersonas.map((persona) => (
              <Card 
                key={persona.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPersona === persona.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <persona.icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-sm">{persona.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {persona.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs">
                  <div className="space-y-1">
                    <div className="font-medium text-red-600">Pain Points:</div>
                    {persona.painPoints.slice(0, 2).map((point, idx) => (
                      <div key={idx}>• {point}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              ROI Calculator
            </CardTitle>
            <CardDescription>
              Calculate potential revenue impact for your platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="users">Monthly Active Users</Label>
              <Input
                id="users"
                type="number"
                value={roiInputs.monthlyUsers}
                onChange={(e) => setRoiInputs(prev => ({ ...prev, monthlyUsers: parseInt(e.target.value) || 0 }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="churn">Current Monthly Churn Rate (%)</Label>
              <div className="px-3">
                <Slider
                  value={[roiInputs.currentChurn]}
                  onValueChange={([value]) => setRoiInputs(prev => ({ ...prev, currentChurn: value }))}
                  max={30}
                  min={1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1%</span>
                  <span>{roiInputs.currentChurn}%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue">Average Revenue Per User (Monthly)</Label>
              <Input
                id="revenue"
                type="number"
                step="0.01"
                value={roiInputs.avgRevenuePer}
                onChange={(e) => setRoiInputs(prev => ({ ...prev, avgRevenuePer: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry Type</Label>
              <Select value={roiInputs.industryType} onValueChange={(value) => setRoiInputs(prev => ({ ...prev, industryType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="streaming">Streaming Platform</SelectItem>
                  <SelectItem value="studio">Film Studio</SelectItem>
                  <SelectItem value="broadcaster">TV Broadcaster</SelectItem>
                  <SelectItem value="aggregator">Content Aggregator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">
              Projected Results with Lunim
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Conservative estimates based on existing client performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded bg-white/50 dark:bg-black/20">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  +{Math.round(roiResults.roiPercentage)}%
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">ROI Increase</div>
              </div>
              <div className="text-center p-3 rounded bg-white/50 dark:bg-black/20">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${(roiResults.annualImprovement / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Annual Revenue</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Churn Reduction</span>
                <Badge variant="default" className="bg-green-600">
                  -{roiResults.churnReduction.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Engagement Increase</span>
                <Badge variant="default" className="bg-blue-600">
                  +{roiResults.engagementIncrease.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Revenue Boost</span>
                <Badge variant="default" className="bg-purple-600">
                  ${(roiResults.monthlyImprovement / 1000).toFixed(0)}K
                </Badge>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Generate Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Demo Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-purple-600" />
            Interactive Demo Scenarios
          </CardTitle>
          <CardDescription>
            Live demonstrations of Lunim's AI capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoScenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveDemo(scenario.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{scenario.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {scenario.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="text-xs">
                      {scenario.highlight}
                    </Badge>
                    <Button size="sm" variant="outline">
                      {activeDemo === scenario.id ? 'Running...' : 'Start Demo'}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* White-Label Customization Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-orange-600" />
            White-Label Solution Preview
          </CardTitle>
          <CardDescription>
            Customize Lunim's AI engine with your brand and requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Included Features</h3>
              {whiteLabelFeatures.filter(f => f.included).map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{feature.feature}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Premium Add-ons</h3>
              {whiteLabelFeatures.filter(f => !f.included).map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded bg-orange-50 dark:bg-orange-950/20">
                  <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{feature.feature}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                Request Custom Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}