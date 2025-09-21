// Enterprise Layout with Professional Navigation
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ProfessionalNavigation } from '@/components/ProfessionalNavigation';

export function EnterpriseLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ProfessionalNavigation />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 bg-background border-b flex items-center px-6 gap-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Entertainment Intelligence Platform</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Enterprise Dashboard
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}