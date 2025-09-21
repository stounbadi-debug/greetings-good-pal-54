// Enterprise Monitoring Center - System Health & Security Dashboard
// Comprehensive monitoring for enterprise-grade operations

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Server, 
  Database, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Lock,
  Globe,
  Activity,
  HardDrive,
  Monitor
} from 'lucide-react';

interface EnterpriseMonitoringProps {
  demoMode?: boolean;
}

export function EnterpriseMonitoringCenter({ demoMode = false }: EnterpriseMonitoringProps) {
  const [systemHealth, setSystemHealth] = useState({
    overall: 98.7,
    api: 99.2,
    database: 97.8,
    cache: 99.9,
    ai: 98.1,
    security: 100
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'JustWatch API latency increased to 234ms', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance completed successfully', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'New AI model deployed with 2.3% accuracy improvement', time: '3 hours ago' }
  ]);

  const infrastructureMetrics = [
    { 
      name: 'Load Balancers', 
      status: 'healthy', 
      instances: 4,
      cpu: 23,
      memory: 67,
      requests: '45.2K/min'
    },
    { 
      name: 'API Servers', 
      status: 'healthy', 
      instances: 12,
      cpu: 45,
      memory: 72,
      requests: '156K/min'
    },
    { 
      name: 'Database Cluster', 
      status: 'healthy', 
      instances: 6,
      cpu: 67,
      memory: 89,
      requests: '23.1K/min'
    },
    { 
      name: 'Cache Layer', 
      status: 'healthy', 
      instances: 8,
      cpu: 12,
      memory: 34,
      requests: '234K/min'
    },
    { 
      name: 'AI Processing', 
      status: 'warning', 
      instances: 16,
      cpu: 89,
      memory: 91,
      requests: '12.3K/min'
    }
  ];

  const securityMetrics = [
    { metric: 'SSL/TLS Grade', value: 'A+', status: 'excellent' },
    { metric: 'API Authentication', value: '100%', status: 'excellent' },
    { metric: 'Data Encryption', value: 'AES-256', status: 'excellent' },
    { metric: 'Access Control', value: 'Multi-factor', status: 'excellent' },
    { metric: 'Compliance Score', value: '98.7%', status: 'excellent' },
    { metric: 'Vulnerability Scan', value: 'Clean', status: 'excellent' }
  ];

  const scalabilityProjections = [
    { period: 'Current', users: '2.4M', capacity: '5M', utilization: 48 },
    { period: 'Q1 2024', users: '3.1M', capacity: '6.5M', utilization: 48 },
    { period: 'Q2 2024', users: '4.2M', capacity: '8.5M', utilization: 49 },
    { period: 'Q3 2024', users: '5.8M', capacity: '12M', utilization: 48 },
    { period: 'Q4 2024', users: '7.9M', capacity: '16M', utilization: 49 }
  ];

  const costOptimization = [
    { service: 'Data Sources APIs', current: '$12,450', optimized: '$8,920', savings: 28 },
    { service: 'AI Processing', current: '$8,730', optimized: '$6,890', savings: 21 },
    { service: 'Infrastructure', current: '$15,680', optimized: '$12,340', savings: 21 },
    { service: 'Storage & CDN', current: '$4,560', optimized: '$3,780', savings: 17 },
    { service: 'Monitoring & Logs', current: '$2,340', optimized: '$2,100', savings: 10 }
  ];

  // Simulate real-time updates in demo mode
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        overall: Math.min(100, Math.max(95, prev.overall + (Math.random() - 0.5) * 2)),
        api: Math.min(100, Math.max(95, prev.api + (Math.random() - 0.5) * 1)),
        database: Math.min(100, Math.max(95, prev.database + (Math.random() - 0.5) * 1.5)),
        cache: Math.min(100, Math.max(98, prev.cache + (Math.random() - 0.5) * 0.5)),
        ai: Math.min(100, Math.max(95, prev.ai + (Math.random() - 0.5) * 1.2)),
        security: 100
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
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
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Overall Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.overall.toFixed(1)}%</div>
            <Progress value={systemHealth.overall} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">API Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemHealth.api.toFixed(1)}%</div>
            <Progress value={systemHealth.api} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemHealth.database.toFixed(1)}%</div>
            <Progress value={systemHealth.database} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Cache Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.cache.toFixed(1)}%</div>
            <Progress value={systemHealth.cache} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">AI Engine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{systemHealth.ai.toFixed(1)}%</div>
            <Progress value={systemHealth.ai} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemHealth.security}%</div>
            <Progress value={systemHealth.security} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            System Alerts & Notifications
          </CardTitle>
          <CardDescription>
            Real-time monitoring alerts and system notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={`
                ${alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20' : ''}
                ${alert.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : ''}
                ${alert.type === 'info' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950/20' : ''}
              `}>
                <div className="flex items-center justify-between">
                  <AlertDescription className="flex items-center gap-2">
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-600" />}
                    {alert.message}
                  </AlertDescription>
                  <Badge variant="outline" className="text-xs">
                    {alert.time}
                  </Badge>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Infrastructure Health
            </CardTitle>
            <CardDescription>
              Real-time monitoring of all system components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {infrastructureMetrics.map((metric, index) => (
                <div key={index} className="p-3 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(metric.status)}
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {metric.instances} instances
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>CPU</span>
                        <span>{metric.cpu}%</span>
                      </div>
                      <Progress value={metric.cpu} className="h-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Memory</span>
                        <span>{metric.memory}%</span>
                      </div>
                      <Progress value={metric.memory} className="h-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Requests</div>
                      <div className="font-medium">{metric.requests}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Security & Compliance
            </CardTitle>
            <CardDescription>
              Enterprise-grade security monitoring and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityMetrics.map((security, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(security.status)}
                    <span className="font-medium text-sm">{security.metric}</span>
                  </div>
                  <Badge variant="default" className="bg-green-600 text-xs">
                    {security.value}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm text-green-800 dark:text-green-200">
                  Compliance Status
                </span>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                ✓ SOC 2 Type II Compliant<br/>
                ✓ GDPR Compliant<br/>
                ✓ ISO 27001 Certified<br/>
                ✓ PCI DSS Level 1
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scalability & Cost Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Scalability Projections
            </CardTitle>
            <CardDescription>
              Capacity planning and growth projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scalabilityProjections.map((projection, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{projection.period}</div>
                    <div className="text-xs text-muted-foreground">
                      {projection.users} users / {projection.capacity} capacity
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{projection.utilization}%</div>
                    <Progress value={projection.utilization} className="w-16 h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Cost Optimization
            </CardTitle>
            <CardDescription>
              AI-powered cost optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costOptimization.map((cost, index) => (
                <div key={index} className="p-2 rounded bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{cost.service}</span>
                    <Badge variant="default" className="bg-green-600 text-xs">
                      -{cost.savings}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Current: {cost.current}</span>
                    <span className="text-green-600 font-medium">Optimized: {cost.optimized}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                  $8,760 Monthly Savings
                </div>
                <div className="text-xs text-orange-700 dark:text-orange-300">
                  Potential annual savings: $105K
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}