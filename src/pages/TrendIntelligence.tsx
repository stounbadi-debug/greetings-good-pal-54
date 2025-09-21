// Trend Intelligence Page
import React from 'react';
import { TrendIntelligenceSystem } from '@/components/TrendIntelligenceSystem';

export default function TrendIntelligence() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        <TrendIntelligenceSystem />
      </div>
    </div>
  );
}