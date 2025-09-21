// Security & Compliance Center - Enterprise-Grade Security Monitoring
// SOC 2 Type II, GDPR, encryption, audit logging for major entertainment clients

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle,
  Key,
  Database,
  Globe,
  UserCheck,
  Activity,
  Settings
} from 'lucide-react';

interface SecurityComplianceProps {
  demoMode?: boolean;
}

export function SecurityComplianceCenter({ demoMode = false }: SecurityComplianceProps) {
  const [securityMetrics, setSecurityMetrics] = useState({
    threatLevel: 'Low',
    blockedThreats: 1247,
    complianceScore: 98.7,
    encryptionStatus: 100,
    auditEvents: 156432,
    vulnerabilities: 0
  });

  const complianceFrameworks = [
    { 
      name: 'SOC 2 Type II', 
      status: 'Compliant', 
      score: 98.9, 
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15'
    },
    { 
      name: 'GDPR', 
      status: 'Compliant', 
      score: 99.1, 
      lastAudit: '2024-02-20',
      nextAudit: '2024-08-20'
    },
    { 
      name: 'ISO 27001', 
      status: 'Certified', 
      score: 97.8, 
      lastAudit: '2024-01-30',
      nextAudit: '2025-01-30'
    },
    { 
      name: 'PCI DSS Level 1', 
      status: 'Compliant', 
      score: 98.5, 
      lastAudit: '2024-03-10',
      nextAudit: '2024-09-10'
    }
  ];

  const securityControls = [
    {
      category: 'Access Control',
      controls: [
        { name: 'Multi-Factor Authentication', status: 'Active', coverage: '100%' },
        { name: 'Role-Based Access Control', status: 'Active', coverage: '100%' },
        { name: 'Privileged Access Management', status: 'Active', coverage: '100%' },
        { name: 'Session Management', status: 'Active', coverage: '100%' }
      ]
    },
    {
      category: 'Data Protection',
      controls: [
        { name: 'Data Encryption at Rest', status: 'Active', coverage: '100%' },
        { name: 'Data Encryption in Transit', status: 'Active', coverage: '100%' },
        { name: 'Data Loss Prevention', status: 'Active', coverage: '98.7%' },
        { name: 'Backup Encryption', status: 'Active', coverage: '100%' }
      ]
    },
    {
      category: 'Network Security',
      controls: [
        { name: 'Web Application Firewall', status: 'Active', coverage: '100%' },
        { name: 'DDoS Protection', status: 'Active', coverage: '100%' },
        { name: 'Intrusion Detection System', status: 'Active', coverage: '99.2%' },
        { name: 'API Rate Limiting', status: 'Active', coverage: '100%' }
      ]
    }
  ];

  const auditLogs = [
    {
      timestamp: '2024-01-20 14:32:18',
      event: 'Admin login from new location',
      user: 'admin@lunim.com',
      risk: 'medium',
      action: 'Verified via MFA'
    },
    {
      timestamp: '2024-01-20 14:28:45',
      event: 'API rate limit exceeded',
      user: 'api_user_12847',
      risk: 'low',
      action: 'Request blocked'
    },
    {
      timestamp: '2024-01-20 14:25:12',
      event: 'Database backup completed',
      user: 'system',
      risk: 'info',
      action: 'Encrypted and stored'
    },
    {
      timestamp: '2024-01-20 14:20:33',
      event: 'Security scan initiated',
      user: 'security_scanner',
      risk: 'info',
      action: 'No vulnerabilities found'
    }
  ];

  const threatIntelligence = [
    { source: 'Global IP Blacklist', blocked: 847, type: 'Malicious IPs' },
    { source: 'Bot Detection', blocked: 234, type: 'Automated Attacks' },
    { source: 'SQL Injection Filter', blocked: 89, type: 'Injection Attempts' },
    { source: 'XSS Protection', blocked: 77, type: 'Script Attacks' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        blockedThreats: prev.blockedThreats + Math.floor(Math.random() * 5),
        auditEvents: prev.auditEvents + Math.floor(Math.random() * 20 + 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [demoMode]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-green-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'compliant':
      case 'certified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Threat Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.threatLevel}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Eye className="w-3 h-3" />
              Blocked Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityMetrics.blockedThreats}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.complianceScore}%</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Encryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{securityMetrics.encryptionStatus}%</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <FileText className="w-3 h-3" />
              Audit Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityMetrics.auditEvents.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.vulnerabilities}</div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Compliance Frameworks
          </CardTitle>
          <CardDescription>
            Enterprise compliance status across major security frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(framework.status)}
                    <span className="font-medium">{framework.name}</span>
                  </div>
                  <Badge variant="default" className="bg-green-600 text-xs">
                    {framework.score}%
                  </Badge>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-600">{framework.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Audit:</span>
                    <span>{framework.lastAudit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Audit:</span>
                    <span>{framework.nextAudit}</span>
                  </div>
                </div>
                
                <Progress value={framework.score} className="h-2 mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600" />
              Security Controls
            </CardTitle>
            <CardDescription>
              Real-time monitoring of security control effectiveness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityControls.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {category.category}
                  </h4>
                  <div className="space-y-1">
                    {category.controls.map((control, controlIndex) => (
                      <div key={controlIndex} className="flex items-center justify-between p-2 rounded bg-muted/30">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(control.status)}
                          <span className="text-sm">{control.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {control.coverage}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Real-Time Audit Log
            </CardTitle>
            <CardDescription>
              Live security events and compliance monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLogs.map((log, index) => (
                <div key={index} className="p-3 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    <Badge variant="outline" className={`text-xs ${getRiskColor(log.risk)}`}>
                      {log.risk}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium mb-1">{log.event}</div>
                  <div className="text-xs text-muted-foreground">
                    User: {log.user} • Action: {log.action}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Threat Intelligence Dashboard
          </CardTitle>
          <CardDescription>
            AI-powered threat detection and prevention metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {threatIntelligence.map((threat, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/20 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {threat.blocked}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {threat.type}
                </div>
                <div className="text-xs font-medium">
                  {threat.source}
                </div>
              </div>
            ))}
          </div>
          
          <Alert className="mt-4 border-green-200 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Security Status: Excellent</strong> • All security controls active • Zero critical vulnerabilities • 98.7% compliance score maintained
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}