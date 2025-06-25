
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, Minus, Brain, Target, Clock } from 'lucide-react';
import { mockRecommendations } from '@/services/mockData';
import { AIRecommendation } from '@/types';

const AdminAIContent = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(mockRecommendations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecommendations = recommendations.filter(rec => 
    rec.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecommendationIcon = (type: AIRecommendation['type']) => {
    const icons = {
      buy: <TrendingUp className="w-4 h-4 text-green-600" />,
      sell: <TrendingDown className="w-4 h-4 text-red-600" />,
      hold: <Minus className="w-4 h-4 text-gray-600" />
    };
    return icons[type];
  };

  const getRecommendationBadge = (type: AIRecommendation['type']) => {
    const variants: Record<AIRecommendation['type'], { variant: any; label: string }> = {
      buy: { variant: 'default', label: 'ACHETER' },
      sell: { variant: 'destructive', label: 'VENDRE' },
      hold: { variant: 'secondary', label: 'CONSERVER' }
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
      short: { variant: 'outline' as const, label: 'Court terme' },
      medium: { variant: 'secondary' as const, label: 'Moyen terme' },
      long: { variant: 'default' as const, label: 'Long terme' }
    };
    const config = variants[horizon];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: recommendations.length,
    buy: recommendations.filter(r => r.type === 'buy').length,
    sell: recommendations.filter(r => r.type === 'sell').length,
    hold: recommendations.filter(r => r.type === 'hold').length,
    highConfidence: recommendations.filter(r => r.confidence >= 0.8).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contenu IA</h1>
          <p className="text-gray-600">Recommandations et analyses générées par l'intelligence artificielle</p>
        </div>
        <Button>
          <Brain className="w-4 h-4 mr-2" />
          Générer Nouvelles Analyses
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.buy}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.sell}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                <Minus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Conserver</p>
                <p className="text-2xl font-bold text-gray-900">{stats.hold}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Haute Conf.</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highConfidence}</p>
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

      {/* Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations IA ({filteredRecommendations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actif</TableHead>
                <TableHead>Recommandation</TableHead>
                <TableHead>Confiance</TableHead>
                <TableHead>Prix Cible</TableHead>
                <TableHead>Horizon</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Généré le</TableHead>
                <TableHead>Raisonnement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecommendations.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{rec.asset.symbol}</p>
                      <p className="text-sm text-gray-500">{rec.asset.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(rec.type)}
                      {getRecommendationBadge(rec.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2 py-1 rounded-lg text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                      {Math.round(rec.confidence * 100)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    {rec.targetPrice ? `€${rec.targetPrice.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {getTimeHorizonBadge(rec.timeHorizon)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {rec.userId ? `User #${rec.userId}` : 'Global'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(rec.createdAt)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 truncate" title={rec.reasoning}>
                        {rec.reasoning}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAIContent;
