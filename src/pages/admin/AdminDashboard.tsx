
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Bell, Briefcase, TrendingUp, ChartLine } from 'lucide-react';
import { mockDashboardStats } from '@/services/mockData';

const AdminDashboard = () => {
  const stats = mockDashboardStats;

  const cards = [
    {
      title: 'Utilisateurs Total',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600 bg-blue-100',
      description: 'Utilisateurs inscrits'
    },
    {
      title: 'Alertes Actives',
      value: stats.activeAlerts.toString(),
      icon: Bell,
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Alertes configurées'
    },
    {
      title: 'Portefeuilles Actifs',
      value: stats.activePortfolios.toString(),
      icon: Briefcase,
      color: 'text-green-600 bg-green-100',
      description: 'Portefeuilles gérés'
    },
    {
      title: 'Valeur Totale',
      value: `€${(stats.totalPortfolioValue / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
      description: 'Actifs sous gestion'
    },
    {
      title: 'Recommandations IA',
      value: stats.aiRecommendations.toString(),
      icon: ChartLine,
      color: 'text-indigo-600 bg-indigo-100',
      description: 'Analyses générées'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme QuantumTrade</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={stats.marketStatus === 'open' ? 'default' : 'secondary'}>
            Marché {stats.marketStatus === 'open' ? 'Ouvert' : 'Fermé'}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvel utilisateur inscrit</p>
                  <p className="text-xs text-gray-500">jane.smith@example.com - Il y a 2h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alerte déclenchée</p>
                  <p className="text-xs text-gray-500">AAPL {'>'} $200 - Il y a 3h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Recommandation IA générée</p>
                  <p className="text-xs text-gray-500">Tesla Inc. - Recommandation HOLD - Il y a 5h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Utilisation CPU</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Mémoire</span>
                  <span>62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Stockage</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
