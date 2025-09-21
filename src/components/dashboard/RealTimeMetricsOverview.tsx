// Real-Time Metrics Overview - Executive Dashboard
// Live system performance and key business metrics

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Zap, 
  Globe, 
  Brain,
  Database,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface MetricsOverviewProps {
  demoMode?: boolean;
}

export function RealTimeMetricsOverview({ demoMode = false }: MetricsOverviewProps) {
  const [metrics, setMetrics] = useState({
    activeUsers: 2437,
    aiProcessingRate: 94.7,
    systemLoad: 67,
    recommendationAccuracy: 94.7,
    globalReach: 89,
    dataSourcesActive: 6,
    avgResponseTime: 127,
    uptime: 99.98
  });

  // Simulate real-time updates in demo mode
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        aiProcessingRate: Math.min(100, Math.max(90, prev.aiProcessingRate + (Math.random() - 0.5) * 2)),
        systemLoad: Math.min(100, Math.max(0, prev.systemLoad + (Math.random() - 0.5) * 10)),
        recommendationAccuracy: Math.min(100, Math.max(85, prev.recommendationAccuracy + (Math.random() - 0.5) * 1)),
        globalReach: prev.globalReach,
        dataSourcesActive: prev.dataSourcesActive,
        avgResponseTime: Math.max(50, prev.avgResponseTime + Math.floor((Math.random() - 0.5) * 20)),
        uptime: prev.uptime
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const systemHealthItems = [
    { name: 'TMDB API', status: 'healthy', latency: '45ms' },
    { name: 'Gemini AI', status: 'healthy', latency: '127ms' },
    { name: 'IMDb Scraper', status: 'healthy', latency: '89ms' },
    { name: 'JustWatch API', status: 'warning', latency: '234ms' },
    { name: 'Cache Layer', status: 'healthy', latency: '12ms' },
    { name: 'Analytics DB', status: 'healthy', latency: '34ms' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              +12.3% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                AI Processing Rate
              </CardTitle>
              <Brain className="w-4 h-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.aiProcessingRate.toFixed(1)}%</div>
            <Progress value={metrics.aiProcessingRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Load
              </CardTitle>
              <Activity className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.systemLoad}%</div>
            <Progress 
              value={metrics.systemLoad} 
              className="mt-2 h-2"
              color={metrics.systemLoad > 80 ? "destructive" : "primary"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Response Time
              </CardTitle>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
            <div className="text-xs text-muted-foreground mt-1">
              Target: &lt;200ms
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Data Sources Health
            </CardTitle>
            <CardDescription>
              Real-time monitoring of all entertainment data sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealthItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.latency}
                    </Badge>
                    <Badge 
                      variant={item.status === 'healthy' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Global Performance
            </CardTitle>
            <CardDescription>
              Entertainment discovery performance across regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">North America</span>
                <div className="flex items-center gap-2">
                  <Progress value={96} className="w-20 h-2" />
                  <span className="text-sm font-medium">96%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Europe</span>
                <div className="flex items-center gap-2">
                  <Progress value={94} className="w-20 h-2" />
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Asia Pacific</span>
                <div className="flex items-center gap-2">
                  <Progress value={91} className="w-20 h-2" />
                  <span className="text-sm font-medium">91%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Latin America</span>
                <div className="flex items-center gap-2">
                  <Progress value={89} className="w-20 h-2" />
                  <span className="text-sm font-medium">89%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Middle East/Africa</span>
                <div className="flex items-center gap-2">
                  <Progress value={87} className="w-20 h-2" />
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>
            Critical business metrics and competitive benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-primary">94.7%</div>
              <div className="text-sm font-medium">Recommendation Accuracy</div>
              <div className="text-xs text-muted-foreground">vs 73% industry avg</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-green-600">+247%</div>
              <div className="text-sm font-medium">Client ROI</div>
              <div className="text-xs text-muted-foreground">Average improvement</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-blue-600">50M+</div>
              <div className="text-sm font-medium">Content Items</div>
              <div className="text-xs text-muted-foreground">Multi-source aggregation</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm font-medium">Countries</div>
              <div className="text-xs text-muted-foreground">Global coverage</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-red-600">99.98%</div>
              <div className="text-sm font-medium">Uptime SLA</div>
              <div className="text-xs text-muted-foreground">Enterprise grade</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {demoMode && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Zap className="w-5 h-5" />
              Demo Mode Active
            </CardTitle>
            <CardDescription>
              Simulating real-time data updates for client presentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All metrics are updating in real-time to demonstrate live monitoring capabilities. 
              This showcases how enterprise clients can track their entertainment platform performance.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}