// Universal Intelligence Dashboard - Enterprise Analytics & Client Demo Platform
// Comprehensive showcase of Lunim's entertainment technology leadership

'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield, 
  Cpu,
  Database,
  TrendingUp,
  Users,
  Target,
  Monitor,
  Lightbulb,
  MapPin,
  DollarSign,
  Eye,
  Settings,
  Lock
} from 'lucide-react';

// Import specialized dashboard components
import { AIIntelligenceShowcase } from './dashboard/AIIntelligenceShowcase';
import { BusinessIntelligenceCenter } from './dashboard/BusinessIntelligenceCenter';
import { ClientPresentationHub } from './dashboard/ClientPresentationHub';
import { EnterpriseMonitoringCenter } from './dashboard/EnterpriseMonitoringCenter';
import { CulturalIntelligenceDisplay } from './dashboard/CulturalIntelligenceDisplay';
import { RealTimeMetricsOverview } from './dashboard/RealTimeMetricsOverview';
import { GlobalScaleArchitecture } from './dashboard/GlobalScaleArchitecture';
import { BusinessContinuityCenter } from './dashboard/BusinessContinuityCenter';
import { SecurityComplianceCenter } from './dashboard/SecurityComplianceCenter';
import { PerformanceOptimizationHub } from './dashboard/PerformanceOptimizationHub';
import { ClientReadyFeatures } from './dashboard/ClientReadyFeatures';

export function UniversalIntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [demoMode, setDemoMode] = useState(false);

  const dashboardSections = [
    {
      id: 'overview',
      title: 'Real-Time Overview',
      icon: BarChart3,
      description: 'Live metrics and system performance overview',
      color: 'text-blue-600'
    },
    {
      id: 'ai-showcase',
      title: 'AI Intelligence',
      icon: Brain,
      description: 'Advanced AI capabilities and machine learning insights',
      color: 'text-purple-600'
    },
    {
      id: 'business',
      title: 'Business Intelligence',
      icon: TrendingUp,
      description: 'Strategic insights and performance analytics',
      color: 'text-green-600'
    },
    {
      id: 'client-demo',
      title: 'Client Presentation',
      icon: Monitor,
      description: 'Client-ready demonstration environment',
      color: 'text-orange-600'
    },
    {
      id: 'enterprise',
      title: 'Enterprise Monitoring',
      icon: Shield,
      description: 'Enterprise-grade system monitoring and alerts',
      color: 'text-red-600'
    },
    {
      id: 'global-scale',
      title: 'Global Architecture',
      icon: Globe,
      description: 'Multi-region deployment and scaling infrastructure',
      color: 'text-indigo-600'
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: Lock,
      description: 'SOC 2, GDPR compliance and security monitoring',
      color: 'text-emerald-600'
    },
    {
      id: 'performance',
      title: 'Performance Hub',
      icon: Zap,
      description: 'AI-powered performance optimization and cost savings',
      color: 'text-yellow-600'
    },
    {
      id: 'client-ready',
      title: 'Enterprise Features',
      icon: Settings,
      description: 'White-label, SSO, and multi-tenant capabilities',
      color: 'text-pink-600'
    },
    {
      id: 'business-continuity',
      title: 'Business Continuity',
      icon: Shield,
      description: 'Disaster recovery and business continuity planning',
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Universal Intelligence Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Enterprise Analytics & Client Demonstration Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={demoMode ? "default" : "outline"}
                onClick={() => setDemoMode(!demoMode)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                {demoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
              </Button>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Live Data
              </Badge>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Data Sources</div>
                  <div className="font-semibold">6 Active</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                  <div className="font-semibold">2.4M</div>
                </div>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-xs text-muted-foreground">AI Accuracy</div>
                  <div className="font-semibold">94.7%</div>
                </div>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-600" />
                <div>
                  <div className="text-xs text-muted-foreground">ROI Impact</div>
                  <div className="font-semibold">+247%</div>
                </div>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Global Reach</div>
                  <div className="font-semibold">89 Countries</div>
                </div>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                  <div className="font-semibold">99.98%</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1">
            {dashboardSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary/10"
              >
                <section.icon className={`w-4 h-4 ${section.color}`} />
                <span className="text-xs font-medium text-center leading-tight">
                  {section.title.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview" className="space-y-6">
            <RealTimeMetricsOverview demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="ai-showcase" className="space-y-6">
            <AIIntelligenceShowcase demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <BusinessIntelligenceCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="client-demo" className="space-y-6">
            <ClientPresentationHub demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-6">
            <EnterpriseMonitoringCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="global-scale" className="space-y-6">
            <GlobalScaleArchitecture demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityComplianceCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceOptimizationHub demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="client-ready" className="space-y-6">
            <ClientReadyFeatures demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-6">
            <EnterpriseMonitoringCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="global-scale" className="space-y-6">
            <GlobalScaleArchitecture demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityComplianceCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceOptimizationHub demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="client-ready" className="space-y-6">
            <ClientReadyFeatures demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="business-continuity" className="space-y-6">
            <BusinessContinuityCenter demoMode={demoMode} />
          </TabsContent>

          <TabsContent value="cultural" className="space-y-6">
            <CulturalIntelligenceDisplay demoMode={demoMode} />
          </TabsContent>
        </Tabs>

        {/* Strategic Value Proposition Footer */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Lunim's Competitive Advantage
              </CardTitle>
              <CardDescription className="text-center">
                Industry-leading entertainment technology with measurable business impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50M+</div>
                  <div className="font-medium">Entertainment Assets</div>
                  <div className="text-muted-foreground">Across 6 global data sources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">94.7%</div>
                  <div className="font-medium">AI Accuracy Rate</div>
                  <div className="text-muted-foreground">vs. 73% industry average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">247%</div>
                  <div className="font-medium">Average ROI Increase</div>
                  <div className="text-muted-foreground">For enterprise clients</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UniversalIntelligenceDashboard;