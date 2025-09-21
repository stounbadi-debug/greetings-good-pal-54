// Business Continuity Center - Disaster Recovery & Operations
// 24/7 monitoring, backup systems, and incident response

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Database,
  Server,
  Zap,
  Activity,
  TrendingUp,
  FileText,
  Phone,
  Users,
  Timer,
  Target,
  Globe
} from 'lucide-react';

interface BusinessContinuityProps {
  demoMode?: boolean;
}

export function BusinessContinuityCenter({ demoMode = false }: BusinessContinuityProps) {
  const [systemStatus, setSystemStatus] = useState({
    overallHealth: 99.98,
    backupStatus: 'active',
    lastBackup: '2 minutes ago',
    recoveryTime: '< 30 seconds',
    incidentCount: 0,
    uptimeDays: 247
  });

  const [deploymentMetrics, setDeploymentMetrics] = useState([
    {
      environment: 'Production',
      version: 'v2.4.1',
      deployedAt: '2024-01-15 14:30 UTC',
      status: 'active',
      rollbackReady: true,
      healthScore: 99.9
    },
    {
      environment: 'Staging',
      version: 'v2.4.2-rc1',
      deployedAt: '2024-01-15 16:45 UTC',
      status: 'testing',
      rollbackReady: true,
      healthScore: 98.7
    },
    {
      environment: 'Blue Environment',
      version: 'v2.4.1',
      deployedAt: '2024-01-15 14:30 UTC',
      status: 'standby',
      rollbackReady: true,
      healthScore: 100
    }
  ]);

  const backupSystems = [
    {
      system: 'Primary Database',
      lastBackup: '2 min ago',
      frequency: 'Every 5 minutes',
      retention: '90 days',
      size: '2.3 TB',
      status: 'healthy'
    },
    {
      system: 'User Data Store',
      lastBackup: '1 min ago',
      frequency: 'Real-time replication',
      retention: '1 year',
      size: '890 GB',
      status: 'healthy'
    },
    {
      system: 'Application Code',
      lastBackup: '15 min ago',
      frequency: 'Every commit',
      retention: 'Indefinite',
      size: '45 GB',
      status: 'healthy'
    },
    {
      system: 'Configuration Data',
      lastBackup: '30 min ago',
      frequency: 'Hourly',
      retention: '6 months',
      size: '2.1 GB',
      status: 'healthy'
    },
    {
      system: 'Analytics Data',
      lastBackup: '5 min ago',
      frequency: 'Every 10 minutes',
      retention: '2 years',
      size: '4.7 TB',
      status: 'healthy'
    }
  ];

  const incidentResponse = [
    {
      severity: 'P1 - Critical',
      responseTime: '< 5 minutes',
      escalation: 'Immediate C-level notification',
      team: 'On-call engineer + Manager',
      sla: '99.99% uptime recovery'
    },
    {
      severity: 'P2 - High',
      responseTime: '< 15 minutes',
      escalation: 'Team lead notification',
      team: 'On-call engineer',
      sla: '2 hour resolution'
    },
    {
      severity: 'P3 - Medium',
      responseTime: '< 1 hour',
      escalation: 'Next business day',
      team: 'Assigned engineer',
      sla: '24 hour resolution'
    },
    {
      severity: 'P4 - Low',
      responseTime: '< 4 hours',
      escalation: 'Weekly review',
      team: 'Product team',
      sla: '1 week resolution'
    }
  ];

  const monitoringAlerts = [
    {
      id: 1,
      type: 'success',
      title: 'Automated failover test completed',
      message: 'Blue-green deployment switched successfully in 12 seconds',
      time: '5 min ago',
      region: 'Global'
    },
    {
      id: 2,
      type: 'info',
      title: 'Scheduled backup completed',
      message: 'All systems backed up successfully (2.3TB processed)',
      time: '2 min ago',
      region: 'Global'
    },
    {
      id: 3,
      type: 'success',
      title: 'Performance optimization deployed',
      message: 'Database query optimization reduced latency by 23%',
      time: '1 hour ago',
      region: 'APAC'
    }
  ];

  const disasterRecoveryMetrics = [
    { metric: 'RTO (Recovery Time Objective)', target: '< 30 seconds', actual: '18 seconds', status: 'excellent' },
    { metric: 'RPO (Recovery Point Objective)', target: '< 5 minutes', actual: '2 minutes', status: 'excellent' },
    { metric: 'Data Replication Lag', target: '< 1 second', actual: '0.3 seconds', status: 'excellent' },
    { metric: 'Backup Verification', target: '100%', actual: '100%', status: 'excellent' },
    { metric: 'Failover Success Rate', target: '99.9%', actual: '100%', status: 'excellent' },
    { metric: 'Cross-Region Sync', target: '< 100ms', actual: '67ms', status: 'excellent' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        uptimeDays: prev.uptimeDays + (Math.random() < 0.1 ? 1 : 0),
        overallHealth: Math.min(100, Math.max(99.9, prev.overallHealth + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
      case 'testing':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'standby':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    if (severity.includes('P1')) return 'bg-red-600';
    if (severity.includes('P2')) return 'bg-orange-600';
    if (severity.includes('P3')) return 'bg-yellow-600';
    return 'bg-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStatus.overallHealth.toFixed(2)}%</div>
            <div className="text-xs text-muted-foreground">99.99% SLA target</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Uptime Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemStatus.uptimeDays} days</div>
            <div className="text-xs text-muted-foreground">Zero incidents</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Recovery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemStatus.recoveryTime}</div>
            <div className="text-xs text-muted-foreground">RTO target: 30s</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground">Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStatus.lastBackup}</div>
            <div className="text-xs text-muted-foreground">Automated</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="incident">Incident Response</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Real-time Monitoring
                </CardTitle>
                <CardDescription>
                  24/7 automated monitoring with predictive alerting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monitoringAlerts.map((alert) => (
                    <Alert key={alert.id} className={`
                      ${alert.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : ''}
                      ${alert.type === 'info' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950/20' : ''}
                    `}>
                      <AlertDescription>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">{alert.title}</div>
                            <div className="text-xs text-muted-foreground mb-2">{alert.message}</div>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline">{alert.region}</Badge>
                              <span className="text-muted-foreground">{alert.time}</span>
                            </div>
                          </div>
                          {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                          {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-600 ml-2" />}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Disaster Recovery Metrics
                </CardTitle>
                <CardDescription>
                  Key performance indicators for business continuity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {disasterRecoveryMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <div>
                        <div className="font-medium text-sm">{metric.metric}</div>
                        <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{metric.actual}</div>
                        <Badge variant="default" className="bg-green-600 text-xs mt-1">
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Automated Backup Systems
              </CardTitle>
              <CardDescription>
                Comprehensive backup and recovery infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupSystems.map((backup, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(backup.status)}
                        <span className="font-medium">{backup.system}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {backup.size}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-muted-foreground">Last Backup</div>
                        <div className="font-medium text-green-600">{backup.lastBackup}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Frequency</div>
                        <div className="font-medium">{backup.frequency}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Retention</div>
                        <div className="font-medium">{backup.retention}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <div className="font-medium text-green-600">{backup.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                Blue-Green Deployment Pipeline
              </CardTitle>
              <CardDescription>
                Zero-downtime deployments with instant rollback capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentMetrics.map((deployment, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(deployment.status)}
                        <span className="font-medium">{deployment.environment}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {deployment.version}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-muted-foreground">Deployed</div>
                        <div className="font-medium">{deployment.deployedAt}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Health Score</div>
                        <div className="font-medium text-green-600">{deployment.healthScore}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Rollback</div>
                        <div className="font-medium">
                          {deployment.rollbackReady ? (
                            <span className="text-green-600">Ready</span>
                          ) : (
                            <span className="text-yellow-600">Preparing</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                    Zero-Downtime Deployments
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Average deployment time: 12 seconds • Rollback time: 8 seconds • Success rate: 100%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incident" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                Incident Response Procedures
              </CardTitle>
              <CardDescription>
                Enterprise-grade incident management with 24/7 support escalation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incidentResponse.map((incident, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getSeverityColor(incident.severity)} text-white text-xs`}>
                        {incident.severity}
                      </Badge>
                      <span className="text-sm font-medium">{incident.responseTime}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-muted-foreground">Response Team</div>
                        <div className="font-medium">{incident.team}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Escalation</div>
                        <div className="font-medium">{incident.escalation}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground">SLA: </span>
                      <span className="font-medium text-blue-600">{incident.sla}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <div className="text-lg font-bold text-green-600">0</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Critical Incidents (30d)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-lg font-bold text-blue-600">2.3 min</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Avg Response Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                  <div className="text-lg font-bold text-purple-600">100%</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">SLA Compliance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}