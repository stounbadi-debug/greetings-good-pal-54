// Enterprise Analytics Dashboard for Multi-Source Intelligence Hub
// Real-time monitoring and performance visualization

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Database, 
  Globe, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  BarChart3,
  RefreshCw
} from 'lucide-react';

interface SourceStatus {
  id: string;
  name: string;
  healthStatus: 'active' | 'degraded' | 'inactive';
  reliability: number;
  responseTime: number;
  dailyUsage: number;
  dailyLimit: number;
  usagePercentage: number;
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  healthPercentage: number;
  activeSources: number;
  totalSources: number;
  lastUpdated: number;
}

interface AnalyticsData {
  overview: {
    totalRequests: number;
    averageResponseTime: number;
    cacheHitRate: number;
    failoverEvents: number;
  };
  sources: SourceStatus[];
  performance: { [sourceId: string]: number };
}

export const IntelligenceHubDashboard: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchDashboardData = async () => {
    try {
      const [healthResponse, analyticsResponse] = await Promise.all([
        fetch('/api/intelligence-hub?endpoint=health'),
        fetch('/api/intelligence-hub?endpoint=analytics')
      ]);

      const healthData = await healthResponse.json();
      const analyticsData = await analyticsResponse.json();

      if (healthData.success) setSystemHealth(healthData.data);
      if (analyticsData.success) setAnalyticsData(analyticsData.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'inactive':
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
        return <AlertCircle className="w-4 h-4" />;
      case 'inactive':
      case 'critical':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading Intelligence Hub Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Source Intelligence Hub</h1>
          <p className="text-muted-foreground">
            Enterprise-grade entertainment discovery platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <Activity className="w-4 h-4 mr-2" />
            Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
          </Button>
          <Button onClick={fetchDashboardData} size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      {systemHealth && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Real-time status of the multi-source intelligence platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  systemHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
                  systemHealth.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getStatusIcon(systemHealth.status)}
                  {systemHealth.status.toUpperCase()}
                </div>
                <p className="text-2xl font-bold mt-2">{systemHealth.healthPercentage}%</p>
                <p className="text-sm text-muted-foreground">Overall Health</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{systemHealth.activeSources}</p>
                <p className="text-sm text-muted-foreground">Active Sources</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold">{systemHealth.totalSources}</p>
                <p className="text-sm text-muted-foreground">Total Sources</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">
                  {new Date(systemHealth.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {analyticsData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.totalRequests.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Processed by the intelligence hub
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Zap className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.averageResponseTime}ms</div>
                  <p className="text-xs text-muted-foreground">
                    Across all data sources
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
                  <Database className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.cacheHitRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Performance optimization
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failover Events</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.overview.failoverEvents}</div>
                  <p className="text-xs text-muted-foreground">
                    Automatic source switching
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          {analyticsData && (
            <div className="grid gap-4">
              {analyticsData.sources.map((source) => (
                <Card key={source.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(source.healthStatus)} text-white`}
                      >
                        {getStatusIcon(source.healthStatus)}
                        <span className="ml-1">{source.healthStatus}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Reliability</p>
                        <div className="flex items-center gap-2">
                          <Progress value={source.reliability} className="flex-1" />
                          <span className="text-sm font-medium">{source.reliability}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Response Time</p>
                        <p className="text-lg font-semibold">{source.responseTime}ms</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Daily Usage</p>
                        <div className="flex items-center gap-2">
                          <Progress value={source.usagePercentage} className="flex-1" />
                          <span className="text-sm font-medium">
                            {source.dailyUsage}/{source.dailyLimit}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Performance Score</p>
                        <p className="text-lg font-semibold">
                          {Math.round(analyticsData.performance[source.id] || 0)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>
                Detailed performance metrics and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">System Strengths</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• High reliability across primary data sources</li>
                    <li>• Intelligent failover mechanisms working effectively</li>
                    <li>• Cost optimization through smart source selection</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Optimization Opportunities</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Consider increasing cache TTL for static content</li>
                    <li>• Monitor API rate limits more closely</li>
                    <li>• Implement geographic CDN for better response times</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};