// Emotional Journey Visualization Component
// Visual representation of user's emotional progress and movie impact

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Heart, 
  Brain, 
  Target,
  MapPin,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { EmotionalRecommendationResult } from '@/lib/emotional-intelligence-engine';

interface EmotionalJourneyVisualizationProps {
  emotionalResult: EmotionalRecommendationResult;
  className?: string;
}

export const EmotionalJourneyVisualization: React.FC<EmotionalJourneyVisualizationProps> = ({
  emotionalResult,
  className = ""
}) => {
  const { contextual_analysis, emotional_analysis, emotional_metrics, therapeutic_insights } = emotionalResult;

  const getPhaseColor = (phase: string) => {
    const colorMap: { [key: string]: string } = {
      'crisis': 'bg-red-100 text-red-800 border-red-200',
      'processing': 'bg-orange-100 text-orange-800 border-orange-200',
      'healing': 'bg-blue-100 text-blue-800 border-blue-200',
      'growth': 'bg-green-100 text-green-800 border-green-200',
      'maintenance': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colorMap[phase] || colorMap['processing'];
  };

  const getProgressIcon = (direction: string) => {
    switch (direction) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDesiredOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'release': return <Heart className="w-4 h-4" />;
      case 'comfort': return <Heart className="w-4 h-4" />;
      case 'motivation': return <TrendingUp className="w-4 h-4" />;
      case 'distraction': return <Brain className="w-4 h-4" />;
      case 'insight': return <Sparkles className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const calculateOverallProgress = () => {
    const currentPhaseScore = {
      'crisis': 2,
      'processing': 4,
      'healing': 6,
      'growth': 8,
      'maintenance': 10
    };
    
    const currentScore = currentPhaseScore[contextual_analysis.emotional_journey.current_phase as keyof typeof currentPhaseScore] || 5;
    const predictionBoost = emotional_metrics.predicted_mood_improvement * 0.5;
    const projectedScore = Math.min(currentScore + predictionBoost, 10);
    
    return { current: currentScore, projected: projectedScore };
  };

  const progress = calculateOverallProgress();

  return (
    <Card className={`bg-gradient-to-br from-background via-background to-muted/20 border border-border/50 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          Your Emotional Journey
          <Badge variant="outline" className="ml-auto text-xs">
            Personalized Path
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current State */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Where You Are Now
          </h4>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
            <div className="space-y-2">
              <Badge className={`${getPhaseColor(contextual_analysis.emotional_journey.current_phase)} border`}>
                {contextual_analysis.emotional_journey.current_phase} phase
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getProgressIcon(contextual_analysis.emotional_journey.progress_direction)}
                <span>Currently {contextual_analysis.emotional_journey.progress_direction}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {progress.current}/10
              </div>
              <div className="text-xs text-muted-foreground">Emotional State</div>
            </div>
          </div>
        </div>

        {/* Journey Progress Visualization */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-green-600" />
            Projected Journey
          </h4>
          
          <div className="space-y-3">
            {/* Current to Projected Progress Bar */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Emotional Progress</span>
                <span className="text-sm font-medium text-foreground">
                  {progress.current}/10 → {progress.projected}/10
                </span>
              </div>
              
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                {/* Current progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-primary/60 transition-all duration-500"
                  style={{ width: `${progress.current * 10}%` }}
                />
                {/* Projected progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500"
                  style={{ width: `${progress.projected * 10}%` }}
                />
                {/* Current position marker */}
                <div 
                  className="absolute top-0 h-full w-1 bg-primary-foreground shadow-sm"
                  style={{ left: `${progress.current * 10}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Crisis</span>
                <span>Processing</span>
                <span>Healing</span>
                <span>Growth</span>
                <span>Thriving</span>
              </div>
            </div>

            {/* Improvement Prediction */}
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Predicted Improvement</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-700">
                  +{emotional_metrics.predicted_mood_improvement}/10
                </div>
                <div className="text-xs text-green-600">Mood boost potential</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desired Destination */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            Your Destination
          </h4>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-3">
              {getDesiredOutcomeIcon(contextual_analysis.emotional_journey.desired_outcome)}
              <div>
                <div className="font-medium text-purple-800 capitalize">
                  {contextual_analysis.emotional_journey.desired_outcome}
                </div>
                <div className="text-sm text-purple-600">
                  What you're seeking
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              Target Outcome
            </Badge>
          </div>
        </div>

        {/* Journey Plan */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            Your Personalized Plan
          </h4>
          
          <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
            <p className="text-sm text-foreground leading-relaxed">
              {emotionalResult.emotional_journey_plan}
            </p>
          </div>
          
          {therapeutic_insights.emotional_progression && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Emotional Progression Path</span>
              </div>
              <p className="text-sm text-blue-700">
                {therapeutic_insights.emotional_progression}
              </p>
            </div>
          )}
        </div>

        {/* Journey Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {emotional_metrics.therapeutic_alignment}/10
            </div>
            <div className="text-xs text-muted-foreground">Therapeutic Fit</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {emotional_metrics.emotional_safety_score}/10
            </div>
            <div className="text-xs text-muted-foreground">Safety Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {emotional_metrics.recommendation_confidence}%
            </div>
            <div className="text-xs text-muted-foreground">Confidence</div>
          </div>
        </div>

        {/* Contextual Notes */}
        {contextual_analysis.life_context.situation_type !== 'general' && (
          <div className="pt-4 border-t border-border/20">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Context Consideration</span>
              </div>
              <p className="text-sm text-amber-700">
                Your {contextual_analysis.life_context.situation_type} situation has been considered in these recommendations.
                {contextual_analysis.life_context.social_support_needs && 
                  " Consider watching with supportive friends or family."
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};