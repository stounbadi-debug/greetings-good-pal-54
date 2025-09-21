// Enhanced Search Interface for Multi-Source Intelligence Hub
// Professional UI for comprehensive content discovery

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Zap, 
  Globe, 
  Star, 
  Clock, 
  TrendingUp,
  MapPin,
  Settings,
  Sparkles
} from 'lucide-react';
import EnhancedMovieCard from './EnhancedMovieCard';
import LoadingSpinner from './LoadingSpinner';
import type { EnhancedMovie, SearchResult } from '@/lib/multi-source-intelligence-hub';

interface SearchFilters {
  genres: string[];
  yearRange: [number, number];
  rating: [number, number];
  region: string;
  language: string;
  contentType: 'movie' | 'tv' | 'both';
}

export const EnhancedSearchInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    genres: [],
    yearRange: [1950, new Date().getFullYear()],
    rating: [0, 10],
    region: 'global',
    language: 'en',
    contentType: 'both'
  });
  const [strategy, setStrategy] = useState<'fast' | 'comprehensive' | 'premium' | 'cost_optimized'>('fast');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    // Detect user location for enhanced regional content
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate region detection based on coordinates
          setUserLocation('us'); // Default to US for demo
        },
        () => {
          setUserLocation('global');
        }
      );
    }
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/intelligence-hub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          filters,
          userContext: {
            location: userLocation,
            preferences: {},
            previousSearches: []
          },
          strategy
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
      } else {
        console.error('Search failed:', data.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStrategyInfo = (strategy: string) => {
    switch (strategy) {
      case 'fast':
        return { icon: Zap, color: 'text-green-600', desc: 'Quick results from primary sources' };
      case 'comprehensive':
        return { icon: Globe, color: 'text-blue-600', desc: 'Multi-source aggregation with streaming data' };
      case 'premium':
        return { icon: Sparkles, color: 'text-purple-600', desc: 'AI-enhanced with all data sources' };
      case 'cost_optimized':
        return { icon: TrendingUp, color: 'text-orange-600', desc: 'Balanced performance and cost efficiency' };
      default:
        return { icon: Search, color: 'text-gray-600', desc: 'Standard search' };
    }
  };

  const strategyInfo = getStrategyInfo(strategy);
  const StrategyIcon = strategyInfo.icon;

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-6 h-6" />
            Multi-Source Intelligence Search
          </CardTitle>
          <CardDescription>
            Comprehensive entertainment discovery across global databases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search movies, TV shows, or describe what you're looking for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="px-6">
              {isLoading ? <LoadingSpinner size="sm" /> : 'Search'}
            </Button>
          </div>

          {/* Search Strategy Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Label>Search Strategy:</Label>
              <Select value={strategy} onValueChange={(value: any) => setStrategy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">⚡ Fast</SelectItem>
                  <SelectItem value="comprehensive">🌍 Comprehensive</SelectItem>
                  <SelectItem value="premium">✨ Premium AI</SelectItem>
                  <SelectItem value="cost_optimized">📈 Cost Optimized</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <StrategyIcon className={`w-4 h-4 ${strategyInfo.color}`} />
                <span>{strategyInfo.desc}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={showAdvancedFilters}
                onCheckedChange={setShowAdvancedFilters}
              />
              <Label>Advanced Filters</Label>
              <Filter className="w-4 h-4" />
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select 
                      value={filters.contentType} 
                      onValueChange={(value: any) => setFilters({...filters, contentType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Movies & TV Shows</SelectItem>
                        <SelectItem value="movie">Movies Only</SelectItem>
                        <SelectItem value="tv">TV Shows Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select 
                      value={filters.region} 
                      onValueChange={(value) => setFilters({...filters, region: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">🌍 Global</SelectItem>
                        <SelectItem value="us">🇺🇸 United States</SelectItem>
                        <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                        <SelectItem value="au">🇦🇺 Australia</SelectItem>
                        <SelectItem value="de">🇩🇪 Germany</SelectItem>
                        <SelectItem value="fr">🇫🇷 France</SelectItem>
                        <SelectItem value="jp">🇯🇵 Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select 
                      value={filters.language} 
                      onValueChange={(value) => setFilters({...filters, language: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="ko">Korean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Year Range: {filters.yearRange[0]} - {filters.yearRange[1]}</Label>
                    <Slider
                      value={filters.yearRange}
                      onValueChange={(value) => setFilters({...filters, yearRange: value as [number, number]})}
                      min={1920}
                      max={new Date().getFullYear()}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rating Range: {filters.rating[0]} - {filters.rating[1]}</Label>
                    <Slider
                      value={filters.rating}
                      onValueChange={(value) => setFilters({...filters, rating: value as [number, number]})}
                      min={0}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-lg font-medium">Searching across multiple sources...</p>
              <p className="text-sm text-muted-foreground">
                Using {strategy} strategy to find the best results
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults && !isLoading && (
        <div className="space-y-6">
          {/* Search Metadata */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {searchResults.metadata.searchTime}ms
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {searchResults.metadata.confidence}% confidence
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {searchResults.metadata.sourcesUsed.length} sources
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Sources used:</span>
                  {searchResults.metadata.sourcesUsed.map((source, index) => (
                    <Badge key={source} variant="secondary" className="text-xs">
                      {source.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.movies.map((movie) => (
              <EnhancedMovie key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Analytics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {searchResults.analytics.cacheHitRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {searchResults.analytics.failoverEvents}
                  </p>
                  <p className="text-sm text-muted-foreground">Failover Events</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    ${searchResults.metadata.costIncurred.toFixed(4)}
                  </p>
                  <p className="text-sm text-muted-foreground">Cost Incurred</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {searchResults.metadata.totalResults}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Enhanced Movie Component for Multi-Source Results
interface EnhancedMovieProps {
  movie: EnhancedMovie;
}

const EnhancedMovie: React.FC<EnhancedMovieProps> = ({ movie }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        
        {/* Source badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {movie.sources.map((source) => (
            <Badge key={source} variant="secondary" className="text-xs bg-black/70 text-white">
              {source.replace('_', ' ')}
            </Badge>
          ))}
        </div>

        {/* Confidence score */}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90 text-xs">
            {Math.round(movie.confidence)}%
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{movie.title}</h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className="text-xs">
            Cultural: {Math.round(movie.culturalRelevance)}%
          </Badge>
          <Badge variant="outline" className="text-xs">
            Trending: {Math.round(movie.trendingScore)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};