
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Bell, BellOff, TrendingUp, TrendingDown, Volume2 } from 'lucide-react';
import { mockAlerts } from '@/services/mockData';
import { Alert } from '@/types';

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => 
    alert.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlertTypeIcon = (type: Alert['type']) => {
    const icons = {
      price_above: <TrendingUp className="w-4 h-4 text-green-600" />,
      price_below: <TrendingDown className="w-4 h-4 text-red-600" />,
      volume_spike: <Volume2 className="w-4 h-4 text-blue-600" />,
      percentage_change: <TrendingUp className="w-4 h-4 text-purple-600" />
    };
    return icons[type];
  };

  const getAlertTypeLabel = (type: Alert['type']) => {
    const labels = {
      price_above: 'Prix au-dessus',
      price_below: 'Prix en-dessous',
      volume_spike: 'Pic de volume',
      percentage_change: 'Variation %'
    };
    return labels[type];
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surveillance des Alertes</h1>
          <p className="text-gray-600">Gérez toutes les alertes configurées sur la plateforme</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alertes</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Alertes Actives</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alerts.filter(a => a.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Prix</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alerts.filter(a => a.type.includes('price')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Volume</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alerts.filter(a => a.type === 'volume_spike').length}
                </p>
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

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alertes Configurées ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actif</TableHead>
                <TableHead>Type d'Alerte</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Notification</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créée le</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.asset.symbol}</p>
                      <p className="text-sm text-gray-500">{alert.asset.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getAlertTypeIcon(alert.type)}
                      <span className="text-sm">{getAlertTypeLabel(alert.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {alert.operator} {alert.threshold}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {alert.notificationMethod === 'email' ? 'Email' : 
                       alert.notificationMethod === 'sms' ? 'SMS' : 'Push'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                      {alert.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(alert.createdAt)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">User #{alert.userId}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAlert(alert.id)}
                    >
                      {alert.isActive ? (
                        <BellOff className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </Button>
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

export default AdminAlerts;
