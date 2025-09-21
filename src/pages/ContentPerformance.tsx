// Content Performance Prediction Page
import React from 'react';
import { ContentPerformanceDashboard } from '@/components/ContentPerformanceDashboard';

export default function ContentPerformance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        <ContentPerformanceDashboard />
      </div>
    </div>
  );
}