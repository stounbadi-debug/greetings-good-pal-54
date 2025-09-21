// Studio Analytics Page
import React from 'react';
import { StudioDecisionSupport } from '@/components/StudioDecisionSupport';

export default function StudioAnalytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        <StudioDecisionSupport />
      </div>
    </div>
  );
}