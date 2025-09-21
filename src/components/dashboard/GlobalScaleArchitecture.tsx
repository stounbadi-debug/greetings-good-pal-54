// Global Scale Architecture Dashboard - Enterprise Production Infrastructure
// Demonstrates worldwide deployment capabilities and scalability

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  MapPin, 
  Zap,
  Shield,
  Users,
  Server,
  Database,
  Cloud,
  Activity,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Target,
  Gauge
} from 'lucide-react';

interface GlobalArchitectureProps {
  demoMode?: boolean;
}

export function GlobalScaleArchitecture({ demoMode = false }: GlobalArchitectureProps) {
  const [globalMetrics, setGlobalMetrics] = useState({
    totalUsers: 2847293,
    concurrentUsers: 156743,
    globalLatency: 127,
    uptimePercent: 99.98,
    requestsPerSecond: 47382,
    dataProcessed: 2.4
  });

  const [regionalData, setRegionalData] = useState([
    {
      region: 'North America',
      locations: ['US East (Virginia)', 'US West (Oregon)', 'Canada Central'],
      users: 1245890,
      latency: 89,
      uptime: 99.99,
      status: 'optimal'
    },
    {
      region: 'Europe',
      locations: ['Ireland', 'Frankfurt', 'London', 'Stockholm'],
      users: 987654,
      latency: 112,
      uptime: 99.97,
      status: 'optimal'
    },
    {
      region: 'Asia Pacific',
      locations: ['Singapore', 'Tokyo', 'Sydney', 'Mumbai'],
      users: 613749,
      latency: 156,
      uptime: 99.98,
      status: 'optimal'
    }
  ]);

  const scalabilityMetrics = [
    { metric: 'Auto-scaling Efficiency', value: '98.7%', status: 'excellent' },
    { metric: 'Load Distribution', value: 'Optimal', status: 'excellent' },
    { metric: 'CDN Hit Rate', value: '96.2%', status: 'excellent' },
    { metric: 'Cache Performance', value: '94.8%', status: 'excellent' },
    { metric: 'Database Sharding', value: 'Active', status: 'excellent' },
    { metric: 'Edge Computing', value: '127 Nodes', status: 'excellent' }
  ];

  const performanceOptimizations = [
    {
      optimization: 'Intelligent CDN Routing',
      improvement: '43% faster content delivery',
      regions: 'Global',
      savings: '$23,400/month'
    },
    {
      optimization: 'AI-Powered Caching',
      improvement: '67% cache hit rate increase',
      regions: 'All regions',
      savings: '$18,900/month'
    },
    {
      optimization: 'Database Query Optimization',
      improvement: '52% query performance boost',
      regions: 'Global',
      savings: '$31,200/month'
    },
    {
      optimization: 'Edge Computing Implementation',
      improvement: '78ms average latency reduction',
      regions: 'APAC, Europe',
      savings: '$15,600/month'
    }
  ];

  const complianceStatus = [
    { standard: 'SOC 2 Type II', status: 'Certified', region: 'Global' },
    { standard: 'GDPR', status: 'Compliant', region: 'Europe' },
    { standard: 'ISO 27001', status: 'Certified', region: 'Global' },
    { standard: 'PCI DSS Level 1', status: 'Compliant', region: 'Global' },
    { standard: 'CCPA', status: 'Compliant', region: 'North America' },
    { standard: 'PIPEDA', status: 'Compliant', region: 'Canada' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setGlobalMetrics(prev => ({
        ...prev,
        concurrentUsers: Math.floor(prev.concurrentUsers + (Math.random() - 0.5) * 1000),
        globalLatency: Math.floor(Math.max(100, Math.min(200, prev.globalLatency + (Math.random() - 0.5) * 10))),
        requestsPerSecond: Math.floor(prev.requestsPerSecond + (Math.random() - 0.5) * 2000)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'excellent':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Users className="w-3 h-3" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(globalMetrics.totalUsers / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">+12.3% this month</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Activity className="w-3 h-3" />
              Concurrent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(globalMetrics.concurrentUsers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Real-time</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              Global Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{globalMetrics.globalLatency}ms</div>
            <div className="text-xs text-muted-foreground">Average response</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Target className="w-3 h-3" />
              Uptime SLA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{globalMetrics.uptimePercent}%</div>
            <div className="text-xs text-muted-foreground">99.99% target</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <BarChart3 className="w-3 h-3" />
              Requests/Sec
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {(globalMetrics.requestsPerSecond / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">Peak: 89K/sec</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Database className="w-3 h-3" />
              Data Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{globalMetrics.dataProcessed}TB</div>
            <div className="text-xs text-muted-foreground">Last 24 hours</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="regions">Regional Status</TabsTrigger>
          <TabsTrigger value="scalability">Scalability</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Global Regional Deployment
              </CardTitle>
              <CardDescription>
                Multi-region infrastructure serving users worldwide with optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalData.map((region, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{region.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Badge variant="default" className="bg-green-600 text-xs">
                          {region.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Active Users</div>
                        <div className="font-medium">{(region.users / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Latency</div>
                        <div className="font-medium">{region.latency}ms</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Uptime</div>
                        <div className="font-medium text-green-600">{region.uptime}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Locations</div>
                        <div className="font-medium">{region.locations.length} sites</div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      Locations: {region.locations.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scalability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-600" />
                Auto-Scaling & Load Management
              </CardTitle>
              <CardDescription>
                Enterprise-grade scalability supporting 1M+ concurrent users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scalabilityMetrics.map((metric, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/30 text-center">
                    <div className="text-sm font-medium mb-1">{metric.metric}</div>
                    <div className="text-lg font-bold text-green-600 mb-1">{metric.value}</div>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                    Peak Capacity: 1.2M Concurrent Users
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Current utilization: 13% • Headroom: 87% • Auto-scaling threshold: 70%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-orange-600" />
                Performance Optimizations
              </CardTitle>
              <CardDescription>
                AI-driven optimizations delivering sub-200ms response times globally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceOptimizations.map((opt, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{opt.optimization}</span>
                      <Badge variant="default" className="bg-green-600 text-xs">
                        {opt.savings}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Improvement: </span>
                        <span className="font-medium text-green-600">{opt.improvement}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Regions: </span>
                        <span className="font-medium">{opt.regions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-2">
                    Total Monthly Savings: $89,100
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    Annual cost optimization: $1.07M • ROI: 340% • Efficiency gain: 67%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Global Compliance & Security
              </CardTitle>
              <CardDescription>
                Enterprise-grade compliance meeting international standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complianceStatus.map((compliance, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium text-sm">{compliance.standard}</div>
                        <div className="text-xs text-muted-foreground">{compliance.region}</div>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      {compliance.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    Security Posture
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                    <div>✓ AES-256 Encryption at Rest</div>
                    <div>✓ TLS 1.3 for Data in Transit</div>
                    <div>✓ Zero Trust Architecture</div>
                    <div>✓ Multi-Factor Authentication</div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Data Protection
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <div>✓ Data Residency Controls</div>
                    <div>✓ Right to be Forgotten</div>
                    <div>✓ Consent Management</div>
                    <div>✓ Audit Trail Logging</div>
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