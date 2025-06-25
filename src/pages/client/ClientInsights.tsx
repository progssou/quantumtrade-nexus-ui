
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Brain, TrendingUp, TrendingDown, Minus, Target, Clock, Lightbulb, Newspaper, Star } from 'lucide-react';
import { mockRecommendations } from '@/services/mockData';
import { AIRecommendation } from '@/types';

const ClientInsights = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedInsights, setSavedInsights] = useState<string[]>([]);

  // Filtrer les recommandations pour l'utilisateur actuel
  const userRecommendations = mockRecommendations.filter(rec => rec.userId === '2');
  const globalRecommendations = mockRecommendations.filter(rec => !rec.userId);

  const filteredUserRecommendations = userRecommendations.filter(rec => 
    rec.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGlobalRecommendations = globalRecommendations.filter(rec => 
    rec.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSaveInsight = (insightId: string) => {
    setSavedInsights(prev => 
      prev.includes(insightId) 
        ? prev.filter(id => id !== insightId)
        : [...prev, insightId]
    );
  };

  const getRecommendationIcon = (type: AIRecommendation['type']) => {
    const icons = {
      buy: <TrendingUp className="w-5 h-5 text-green-600" />,
      sell: <TrendingDown className="w-5 h-5 text-red-600" />,
      hold: <Minus className="w-5 h-5 text-gray-600" />
    };
    return icons[type];
  };

  const getRecommendationBadge = (type: AIRecommendation['type']) => {
    const variants: Record<AIRecommendation['type'], { variant: any; label: string; color: string }> = {
      buy: { variant: 'default', label: 'ACHETER', color: 'bg-green-500' },
      sell: { variant: 'destructive', label: 'VENDRE', color: 'bg-red-500' },
      hold: { variant: 'secondary', label: 'CONSERVER', color: 'bg-gray-500' }
    };
    const config = variants[type];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTimeHorizonBadge = (horizon: AIRecommendation['timeHorizon']) => {
    const variants = {
      short: { variant: 'outline' as const, label: 'Court terme', color: 'border-blue-200' },
      medium: { variant: 'secondary' as const, label: 'Moyen terme', color: 'border-purple-200' },
      long: { variant: 'default' as const, label: 'Long terme', color: 'border-green-200' }
    };
    const config = variants[horizon];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RecommendationCard = ({ rec }: { rec: AIRecommendation }) => (
    <Card key={rec.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {getRecommendationIcon(rec.type)}
              <div>
                <h3 className="font-semibold text-lg">{rec.asset.symbol}</h3>
                <p className="text-sm text-gray-500">{rec.asset.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getRecommendationBadge(rec.type)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSaveInsight(rec.id)}
            >
              <Star className={`w-4 h-4 ${savedInsights.includes(rec.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
              <Target className="w-4 h-4 mr-1" />
              Confiance: {Math.round(rec.confidence * 100)}%
            </div>
            {getTimeHorizonBadge(rec.timeHorizon)}
          </div>

          <p className="text-gray-700 leading-relaxed">{rec.reasoning}</p>

          {rec.targetPrice && (
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">Prix actuel:</span>
              <span className="font-mono font-medium">€{rec.asset.price.toFixed(2)}</span>
              <span className="text-gray-600">Prix cible:</span>
              <span className="font-mono font-medium text-green-600">€{rec.targetPrice.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(rec.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span>IA QuantumTrade</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Fausses actualités du marché
  const marketNews = [
    {
      id: '1',
      title: 'Les actions technologiques en forte hausse suite aux résultats trimestriels',
      summary: 'Le secteur technologique affiche une performance exceptionnelle avec des gains moyens de 8% sur la semaine.',
      source: 'Financial Times',
      time: '2h',
      category: 'tech'
    },
    {
      id: '2', 
      title: 'Bitcoin franchit la barre des 45 000$ malgré la volatilité',
      summary: 'La cryptomonnaie phare continue sa progression après les déclarations positives des régulateurs.',
      source: 'CoinDesk',
      time: '4h',
      category: 'crypto'
    },
    {
      id: '3',
      title: 'La BCE maintient ses taux directeurs à 4.5%',
      summary: 'La Banque Centrale Européenne conserve sa politique monétaire restrictive face à l\'inflation persistante.',
      source: 'Reuters',
      time: '6h',
      category: 'forex'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insights IA</h1>
          <p className="text-gray-600">Recommandations personnalisées et actualités du marché</p>
        </div>
        <Button>
          <Brain className="w-4 h-4 mr-2" />
          Actualiser les Analyses
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Mes Insights</p>
                <p className="text-2xl font-bold text-gray-900">{userRecommendations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Acheter</p>
                <p className="text-2xl font-bold text-green-600">
                  {userRecommendations.filter(r => r.type === 'buy').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-red-100 text-red-600">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Vendre</p>
                <p className="text-2xl font-bold text-red-600">
                  {userRecommendations.filter(r => r.type === 'sell').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Sauvegardés</p>
                <p className="text-2xl font-bold text-gray-900">{savedInsights.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par symbole ou nom d'actif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personnalisées</TabsTrigger>
          <TabsTrigger value="global">Marché Global</TabsTrigger>
          <TabsTrigger value="saved">Sauvegardées</TabsTrigger>
          <TabsTrigger value="news">Actualités</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Recommandations Personnalisées ({filteredUserRecommendations.length})</h3>
          <div className="grid grid-cols-1 gap-6">
            {filteredUserRecommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Analyses du Marché ({filteredGlobalRecommendations.length})</h3>
          <div className="grid grid-cols-1 gap-6">
            {filteredGlobalRecommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Insights Sauvegardés ({savedInsights.length})</h3>
          <div className="grid grid-cols-1 gap-6">
            {[...userRecommendations, ...globalRecommendations]
              .filter(rec => savedInsights.includes(rec.id))
              .map((rec) => (
                <RecommendationCard key={rec.id} rec={rec} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Actualités du Marché</h3>
          <div className="grid grid-cols-1 gap-6">
            {marketNews.map((news) => (
              <Card key={news.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">{news.category.toUpperCase()}</Badge>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Il y a {news.time}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                  <p className="text-gray-700 mb-3">{news.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Newspaper className="w-4 h-4" />
                      <span>{news.source}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Lire plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientInsights;
