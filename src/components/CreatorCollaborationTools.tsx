// Creator Collaboration Tools - Phase 2
// AI-powered script analysis and creator-audience matching

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  Lightbulb, 
  Target,
  TrendingUp,
  Star,
  MessageCircle,
  Zap,
  Brain,
  Heart,
  Award,
  Users
} from 'lucide-react';

interface ScriptAnalysis {
  themes: string[];
  genre: string;
  targetAudience: string;
  marketPotential: number;
  uniquenessScore: number;
  improvements: string[];
}

interface CreatorMatch {
  name: string;
  expertise: string[];
  successRate: number;
  compatibility: number;
  recentProjects: string[];
}

export function CreatorCollaborationTools() {
  const [scriptText, setScriptText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ScriptAnalysis | null>(null);
  const [creatorMatches, setCreatorMatches] = useState<CreatorMatch[]>([]);

  const mockAnalysis: ScriptAnalysis = {
    themes: ['Coming of Age', 'Technology Ethics', 'Family Bonds'],
    genre: 'Sci-Fi Drama',
    targetAudience: '18-34, Tech-Savvy',
    marketPotential: 78,
    uniquenessScore: 85,
    improvements: [
      'Strengthen character arcs in Act 2',
      'Expand world-building details',
      'Add more emotional stakes'
    ]
  };

  const mockCreatorMatches: CreatorMatch[] = [
    {
      name: 'Sarah Chen',
      expertise: ['Sci-Fi', 'Character Development', 'Visual Effects'],
      successRate: 92,
      compatibility: 88,
      recentProjects: ['Neural Network', 'Digital Dreams', 'Code Breakers']
    },
    {
      name: 'Marcus Rodriguez',
      expertise: ['Drama', 'Family Stories', 'Independent Film'],
      successRate: 87,
      compatibility: 82,
      recentProjects: ['Home Truths', 'Generational Gap', 'Small Town Stories']
    }
  ];

  const handleAnalyzeScript = async () => {
    if (!scriptText.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setCreatorMatches(mockCreatorMatches);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Creator Collaboration Hub
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered script analysis, creator matching, and collaboration tools for content development
        </p>
      </div>

      {/* Script Analysis Input */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Script & Concept Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your script excerpt, logline, or detailed concept here..."
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={8}
            className="min-h-[200px]"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyzeScript} 
              disabled={!scriptText.trim() || isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze & Find Collaborators'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Analysis Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Market Potential</p>
                    <p className="text-2xl font-bold text-green-600">{analysis.marketPotential}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uniqueness Score</p>
                    <p className="text-2xl font-bold text-purple-600">{analysis.uniquenessScore}%</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Genre</p>
                    <p className="text-lg font-bold text-blue-600">{analysis.genre}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Target Audience</p>
                    <p className="text-sm font-bold text-orange-600">{analysis.targetAudience}</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis & Collaborators */}
          <Tabs defaultValue="analysis" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analysis">Content Analysis</TabsTrigger>
              <TabsTrigger value="collaborators">Creator Matches</TabsTrigger>
              <TabsTrigger value="opportunities">Market Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Content Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Identified Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.themes.map(theme => (
                        <Badge key={theme} variant="secondary">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Improvement Suggestions</h4>
                    <div className="space-y-2">
                      {analysis.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaborators" className="space-y-4">
              <div className="grid gap-4">
                {creatorMatches.map((creator, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{creator.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {creator.expertise.map(skill => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Success Rate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={creator.successRate} className="flex-1" />
                            <span className="text-sm font-medium">{creator.successRate}%</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Compatibility</p>
                          <div className="flex items-center gap-2">
                            <Progress value={creator.compatibility} className="flex-1" />
                            <span className="text-sm font-medium">{creator.compatibility}%</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Recent Projects</p>
                          <div className="text-xs text-muted-foreground">
                            {creator.recentProjects.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Market Gap Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100">
                          High Opportunity: Tech Ethics Drama
                        </h4>
                        <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                          Growing demand for technology-focused stories with moral complexity. 73% market interest.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                          Audience Connection: Family-Tech Dynamics
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                          Strong emotional resonance potential with intergenerational audiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}