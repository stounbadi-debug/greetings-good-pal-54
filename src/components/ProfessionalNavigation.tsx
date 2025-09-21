// Professional Enterprise Navigation
// Sidebar navigation for entertainment industry platform

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Film,
  Brain,
  DollarSign,
  Calendar,
  Settings,
  Database,
  Shield,
  Star,
  FileText,
  Search
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Core Platform',
    items: [
      { title: 'Content Performance', url: '/platform/content-performance', icon: BarChart3, badge: 'AI' },
      { title: 'Trend Intelligence', url: '/platform/trend-intelligence', icon: TrendingUp, badge: 'Live' },
      { title: 'Creator Tools', url: '/platform/creator-tools', icon: Users, badge: 'New' },
      { title: 'Studio Analytics', url: '/platform/studio-analytics', icon: DollarSign },
      { title: 'Discovery Engine', url: '/platform/discover', icon: Search },
    ]
  },
  {
    label: 'Intelligence Hub',
    items: [
      { title: 'Multi-Source Intelligence', url: '/platform/intelligence-hub', icon: Brain },
      { title: 'Market Analysis', url: '/platform/market-analysis', icon: Target },
      { title: 'Cultural Intelligence', url: '/platform/cultural-intelligence', icon: Globe },
      { title: 'Streaming Intelligence', url: '/platform/streaming-intelligence', icon: Film },
    ]
  },
  {
    label: 'Business Tools',
    items: [
      { title: 'ROI Prediction', url: '/platform/roi-prediction', icon: DollarSign },
      { title: 'Release Planning', url: '/platform/release-planning', icon: Calendar },
      { title: 'Risk Assessment', url: '/platform/risk-assessment', icon: Shield },
      { title: 'Reports & Analytics', url: '/platform/reports', icon: FileText },
    ]
  },
  {
    label: 'Platform',
    items: [
      { title: 'Data Sources', url: '/platform/data-sources', icon: Database },
      { title: 'API Access', url: '/platform/api-access', icon: Zap },
      { title: 'Settings', url: '/platform/settings', icon: Settings },
    ]
  }
];

export function ProfessionalNavigation() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={!open ? "w-16" : "w-72"} collapsible="icon">
      <div className="p-4 border-b">
        {open && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Lunim Intelligence</h2>
              <p className="text-xs text-muted-foreground">Entertainment AI Platform</p>
            </div>
          </div>
        )}
        {!open && (
          <div className="flex justify-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </div>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.label}>
            {open && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavClassName}
                      >
                        <item.icon className={`h-5 w-5 ${!open ? 'mx-auto' : 'mr-3'}`} />
                        {open && (
                          <div className="flex items-center justify-between flex-1">
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Enterprise Badge */}
      {open && (
        <div className="p-4 border-t">
          <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Enterprise</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Advanced AI intelligence for entertainment industry professionals
            </p>
          </div>
        </div>
      )}
    </Sidebar>
  );
}