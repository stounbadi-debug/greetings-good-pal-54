// Enhanced Movie Card with Therapeutic Insights
// Shows movie recommendations with emotional intelligence

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Brain, 
  Shield, 
  TrendingUp, 
  Play, 
  Info, 
  Star,
  Calendar,
  AlertTriangle,
  Lightbulb,
  MessageCircle
} from 'lucide-react';
import { Movie } from '@/lib/tmdb';
import { TherapeuticMovieProfile, MovieTherapeuticValue } from '@/lib/therapeutic-movie-mapper';

interface TherapeuticMovieCardProps {
  movie: Movie;
  therapeuticProfile: TherapeuticMovieProfile;
  therapeuticValue: MovieTherapeuticValue;
  onWatchTrailer?: (movie: Movie) => void;
  onMoreDetails?: (movie: Movie) => void;
  className?: string;
}

export const TherapeuticMovieCard: React.FC<TherapeuticMovieCardProps> = ({
  movie,
  therapeuticProfile,
  therapeuticValue,
  onWatchTrailer,
  onMoreDetails,
  className = ""
}) => {
  const [showTherapeuticDetails, setShowTherapeuticDetails] = useState(false);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'gentle': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'intense': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressionPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'crisis': return <AlertTriangle className="w-4 h-4" />;
      case 'processing': return <Brain className="w-4 h-4" />;
      case 'healing': return <Heart className="w-4 h-4" />;
      case 'growth': return <TrendingUp className="w-4 h-4" />;
      case 'maintenance': return <Shield className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const topHealingCategories = Object.entries(therapeuticProfile.healing_categories)
    .filter(([_, value]) => value > 5)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 3);

  const topMechanisms = Object.entries(therapeuticProfile.therapeutic_mechanisms)
    .filter(([_, value]) => value > 5)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 2);

  const formatCategoryName = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/20 border border-border/50 ${className}`}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
        <img
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.svg'
          }
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Therapeutic Score Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {therapeuticProfile.therapeutic_score}/10
          </Badge>
        </div>

        {/* Intensity Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`border ${getIntensityColor(therapeuticProfile.emotional_intensity)}`}>
            {therapeuticProfile.emotional_intensity}
          </Badge>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          {onWatchTrailer && (
            <Button 
              size="sm" 
              onClick={() => onWatchTrailer(movie)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Play className="w-4 h-4 mr-1" />
              Trailer
            </Button>
          )}
          {onMoreDetails && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onMoreDetails(movie)}
              className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            >
              <Info className="w-4 h-4 mr-1" />
              Details
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Movie Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {movie.release_date?.slice(0, 4) || 'N/A'}
            </div>
            {movie.vote_average && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                {movie.vote_average.toFixed(1)}
              </div>
            )}
          </div>
        </div>

        {/* Primary Therapeutic Benefit */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm text-foreground">Therapeutic Benefit</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {therapeuticValue.primary_therapeutic_benefit}
          </p>
        </div>

        {/* Top Healing Categories */}
        {topHealingCategories.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Healing Focus</span>
            <div className="flex flex-wrap gap-2">
              {topHealingCategories.map(([category, score]) => (
                <Badge 
                  key={category} 
                  variant="secondary" 
                  className="text-xs bg-muted/50 text-muted-foreground"
                >
                  {formatCategoryName(category)} ({score})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Progression Phase */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getProgressionPhaseIcon(therapeuticProfile.progression_phase)}
            <span className="text-sm text-muted-foreground">
              Best for: {therapeuticProfile.progression_phase} phase
            </span>
          </div>
        </div>

        {/* Trigger Warnings */}
        {therapeuticProfile.trigger_warnings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Content Notes</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {therapeuticProfile.trigger_warnings.map((warning, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs text-amber-700 border-amber-300 bg-amber-50"
                >
                  {warning}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Viewing Context Recommendations */}
        {therapeuticProfile.viewing_context_recommendations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Viewing Tips</span>
            </div>
            <ul className="space-y-1">
              {therapeuticProfile.viewing_context_recommendations.slice(0, 2).map((tip, index) => (
                <li key={index} className="text-xs text-blue-700 flex items-start gap-2">
                  <span className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Therapeutic Details Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTherapeuticDetails(!showTherapeuticDetails)}
          className="w-full text-xs text-muted-foreground hover:text-foreground"
        >
          {showTherapeuticDetails ? 'Hide' : 'Show'} Therapeutic Analysis
          <Brain className="w-3 h-3 ml-1" />
        </Button>

        {/* Extended Therapeutic Details */}
        {showTherapeuticDetails && (
          <div className="space-y-3 pt-3 border-t border-border/30">
            {/* Therapeutic Mechanisms */}
            {topMechanisms.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">How It Helps</span>
                {topMechanisms.map(([mechanism, score]) => (
                  <div key={mechanism} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-foreground">
                        {formatCategoryName(mechanism)}
                      </span>
                      <span className="text-xs text-muted-foreground">{score}/10</span>
                    </div>
                    <Progress value={score * 10} className="h-1 bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {/* Key Healing Themes */}
            {therapeuticValue.key_healing_themes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Healing Themes</span>
                <div className="flex flex-wrap gap-1">
                  {therapeuticValue.key_healing_themes.map((theme, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-primary/5 text-primary border-primary/20"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Emotional Journey Arc */}
            {therapeuticValue.emotional_journey_arc && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Emotional Journey</span>
                <p className="text-xs text-foreground leading-relaxed">
                  {therapeuticValue.emotional_journey_arc}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};