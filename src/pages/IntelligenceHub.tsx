// Multi-Source Intelligence Hub - Enterprise Dashboard Page
// Demonstrates Lunim's leadership in global entertainment discovery

'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield, 
  Cpu,
  Database,
  TrendingUp
} from 'lucide-react';
import { IntelligenceHubDashboard } from '@/components/IntelligenceHubDashboard';
import { EnhancedSearchInterface } from '@/components/EnhancedSearchInterface';

const IntelligenceHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Multi-Source Intelligence Hub
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Enterprise-grade entertainment discovery platform powered by global content aggregation, 
            intelligent source orchestration, and advanced AI fusion algorithms.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Globe className="w-4 h-4" />
              50M+ Movies & Shows
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Database className="w-4 h-4" />
              6 Data Sources
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Zap className="w-4 h-4" />
              Real-time Processing
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Shield className="w-4 h-4" />
              Enterprise Security
            </Badge>
          </div>
        </div>

        {/* Platform Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Globe className="w-10 h-10 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Global Aggregation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                TMDB, IMDb, Letterboxd, JustWatch, Rotten Tomatoes, and theater APIs
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Cpu className="w-10 h-10 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">AI Orchestration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Smart failover, cost optimization, and geographic content filtering
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="w-10 h-10 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Data Fusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multi-dimensional ranking with cultural relevance and trend analysis
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-10 h-10 mx-auto text-orange-600 mb-2" />
              <CardTitle className="text-lg">Enterprise Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring, A/B testing, and performance optimization
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Intelligent Search
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <EnhancedSearchInterface />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <IntelligenceHubDashboard />
          </TabsContent>
        </Tabs>

        {/* Business Value Section */}
        <div className="mt-16 mb-8">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Enterprise Value Proposition</CardTitle>
              <CardDescription className="text-center text-lg">
                Positioning Lunim as the definitive leader in entertainment technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Technical Excellence</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Comprehensive entertainment industry data aggregation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Intelligent source orchestration with 99.9% uptime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Advanced AI fusion for superior recommendation accuracy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Scalable architecture supporting 100K+ concurrent users</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Business Impact</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>White-label ready for streaming platform partnerships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Defensible competitive moat through data integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Enterprise-grade security and compliance standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Real-time analytics for data-driven business decisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceHub;