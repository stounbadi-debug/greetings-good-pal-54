// Emotional Insight Display Component
// Shows detected emotions and therapeutic insights

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { MicroEmotionProfile, ContextualEmotionalAnalysis, EmotionalRecommendationResult } from '@/lib/emotional-intelligence-engine';

interface EmotionalInsightCardProps {
  emotionalResult: EmotionalRecommendationResult;
  className?: string;
}

export const EmotionalInsightCard: React.FC<EmotionalInsightCardProps> = ({
  emotionalResult,
  className = ""
}) => {
  const { emotional_analysis, contextual_analysis, therapeutic_insights, emotional_metrics } = emotionalResult;

  const getEmotionColor = (emotion: string) => {
    const colorMap: { [key: string]: string } = {
      'joy': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'sadness': 'bg-blue-100 text-blue-800 border-blue-200',
      'anger': 'bg-red-100 text-red-800 border-red-200',
      'fear': 'bg-purple-100 text-purple-800 border-purple-200',
      'surprise': 'bg-orange-100 text-orange-800 border-orange-200',
      'disgust': 'bg-green-100 text-green-800 border-green-200',
      'neutral': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colorMap[emotion] || colorMap['neutral'];
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 8) return 'text-red-600';
    if (intensity >= 6) return 'text-orange-600';
    if (intensity >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getHealingTypeIcon = (healingType: string) => {
    switch (healingType) {
      case 'cathartic': return <Heart className="w-4 h-4" />;
      case 'escapist': return <Brain className="w-4 h-4" />;
      case 'empowering': return <TrendingUp className="w-4 h-4" />;
      case 'comforting': return <Shield className="w-4 h-4" />;
      case 'inspiring': return <TrendingUp className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const topSecondaryEmotions = Object.entries(emotional_analysis.secondary_emotions)
    .filter(([_, value]) => value! > 3)
    .sort(([_, a], [__, b]) => b! - a!)
    .slice(0, 3);

  return (
    <Card className={`bg-gradient-to-br from-background via-background to-muted/20 border border-border/50 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="w-5 h-5 text-primary" />
          Emotional Intelligence Insights
          <Badge variant="outline" className="ml-auto text-xs">
            {emotionalResult.emotional_confidence}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Emotion Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              Primary Emotional State
            </h4>
            <Badge 
              className={`${getEmotionColor(emotional_analysis.primary_emotion)} border`}
              variant="outline"
            >
              {emotional_analysis.primary_emotion}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Emotional Intensity</span>
              <span className={`text-sm font-medium ${getIntensityColor(emotional_analysis.emotional_intensity)}`}>
                {emotional_analysis.emotional_intensity}/10
              </span>
            </div>
            <Progress 
              value={emotional_analysis.emotional_intensity * 10} 
              className="h-2 bg-muted"
            />
          </div>

          {topSecondaryEmotions.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Secondary Emotions</span>
              <div className="flex flex-wrap gap-2">
                {topSecondaryEmotions.map(([emotion, intensity]) => (
                  <Badge 
                    key={emotion} 
                    variant="secondary" 
                    className="text-xs bg-muted text-muted-foreground"
                  >
                    {emotion} ({intensity})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Therapeutic Needs Section */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            {getHealingTypeIcon(emotional_analysis.therapeutic_needs.healing_type)}
            Therapeutic Approach
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Healing Type</span>
              <Badge variant="outline" className="w-full justify-center">
                {emotional_analysis.therapeutic_needs.healing_type}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Support Level</span>
              <Badge variant="outline" className="w-full justify-center">
                {emotional_analysis.therapeutic_needs.support_level}
              </Badge>
            </div>
          </div>

          {emotional_analysis.therapeutic_needs.intervention_urgency !== 'low' && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                {emotional_analysis.therapeutic_needs.intervention_urgency === 'high' 
                  ? 'High support needs detected - consider professional guidance'
                  : 'Moderate emotional support recommended'
                }
              </span>
            </div>
          )}
        </div>

        {/* Life Context Section */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="font-medium text-foreground">Life Context</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Situation:</span>
              <span className="ml-2 font-medium text-foreground">
                {contextual_analysis.life_context.situation_type}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Phase:</span>
              <span className="ml-2 font-medium text-foreground">
                {contextual_analysis.emotional_journey.current_phase}
              </span>
            </div>
          </div>

          {contextual_analysis.life_context.stress_level > 6 && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
              <AlertTriangle className="w-4 h-4" />
              <span>High stress level detected ({contextual_analysis.life_context.stress_level}/10)</span>
            </div>
          )}
        </div>

        {/* Therapeutic Insights */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="font-medium text-foreground">Why These Recommendations Help</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {therapeutic_insights.why_these_help}
          </p>
          
          {therapeutic_insights.emotional_progression && (
            <div className="mt-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Emotional Journey</span>
              <p className="text-sm text-foreground mt-1">
                {therapeutic_insights.emotional_progression}
              </p>
            </div>
          )}
        </div>

        {/* Safety Considerations */}
        {emotionalResult.safety_considerations.length > 0 && (
          <div className="space-y-2 border-t border-border/20 pt-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              Safety & Wellness Notes
            </h4>
            <ul className="space-y-1">
              {emotionalResult.safety_considerations.map((consideration, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                  {consideration}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Emotional Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {emotional_metrics.predicted_mood_improvement}/10
            </div>
            <div className="text-xs text-muted-foreground">Mood Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {emotional_metrics.emotional_safety_score}/10
            </div>
            <div className="text-xs text-muted-foreground">Safety Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};