
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Clock } from 'lucide-react';
import { mockPortfolio, mockRecommendations } from '@/services/mockData';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ClientDashboard = () => {
  // Calculs du portefeuille
  const totalValue = mockPortfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalGainLoss = mockPortfolio.reduce((sum, item) => sum + item.gainLoss, 0);
  const totalGainLossPercent = totalGainLoss / (totalValue - totalGainLoss) * 100;

  // Données pour le graphique en secteurs
  const pieData = mockPortfolio.map(item => ({
    name: item.asset.symbol,
    value: item.currentValue,
    color: item.gainLoss >= 0 ? '#10b981' : '#ef4444'
  }));

  // Données simulées pour le graphique temporel
  const lineData = [
    { date: '01/06', value: 28500 },
    { date: '08/06', value: 29200 },
    { date: '15/06', value: 28800 },
    { date: '22/06', value: 31100 },
    { date: '25/06', value: totalValue }
  ];

  // Recommandations personnalisées
  const personalRecommendations = mockRecommendations.filter(rec => rec.userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble de votre portefeuille</p>
        </div>
        <Badge variant="default">Marché Ouvert</Badge>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Valeur Totale</p>
                <p className="text-2xl font-bold text-gray-900">€{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${totalGainLoss >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {totalGainLoss >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Gain/Perte</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLoss >= 0 ? '+' : ''}€{totalGainLoss.toLocaleString()}
                </p>
                <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{mockPortfolio.length}</p>
                <p className="text-xs text-gray-500">Positions ouvertes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Recommandations</p>
                <p className="text-2xl font-bold text-gray-900">{personalRecommendations.length}</p>
                <p className="text-xs text-gray-500">Nouvelles analyses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Portefeuille</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Valeur']} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Portefeuille</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Valeur']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Position AAPL mise à jour</p>
                  <p className="text-xs text-gray-500">Prix : €189.50 (+€2.30) - Il y a 1h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvelle recommandation IA</p>
                  <p className="text-xs text-gray-500">AAPL - Recommandation ACHETER - Il y a 2h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Position BTC en baisse</p>
                  <p className="text-xs text-gray-500">Prix : €43,250 (-€850) - Il y a 3h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights IA du Jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personalRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{rec.asset.symbol}</span>
                      <Badge variant={rec.type === 'buy' ? 'default' : rec.type === 'sell' ? 'destructive' : 'secondary'}>
                        {rec.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Confiance: {Math.round(rec.confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{rec.reasoning}</p>
                  {rec.targetPrice && (
                    <p className="text-xs text-gray-500 mt-2">Prix cible: €{rec.targetPrice}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
