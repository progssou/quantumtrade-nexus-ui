import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Bell, BellOff, TrendingUp, TrendingDown, Edit, Trash } from 'lucide-react';
import { mockAlerts, mockAssets } from '@/services/mockData';
import { Alert } from '@/types';

const ClientAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    assetId: '',
    type: 'price_above' as Alert['type'],
    threshold: '',
    operator: '>' as Alert['operator'],
    notificationMethod: 'email' as Alert['notificationMethod']
  });

  const filteredAlerts = alerts.filter(alert => 
    alert.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleAddAlert = () => {
    if (!newAlert.assetId || !newAlert.threshold) return;

    const asset = mockAssets.find(a => a.id === newAlert.assetId);
    if (!asset) return;

    const alert: Alert = {
      id: Date.now().toString(),
      userId: '2', // Current user
      assetId: newAlert.assetId,
      asset,
      type: newAlert.type,
      threshold: parseFloat(newAlert.threshold),
      operator: newAlert.operator,
      isActive: true,
      notificationMethod: newAlert.notificationMethod,
      createdAt: new Date().toISOString()
    };

    setAlerts(prev => [...prev, alert]);
    setIsAddDialogOpen(false);
    setNewAlert({
      assetId: '',
      type: 'price_above',
      threshold: '',
      operator: '>',
      notificationMethod: 'email'
    });
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    const icons = {
      price_above: <TrendingUp className="w-4 h-4 text-green-600" />,
      price_below: <TrendingDown className="w-4 h-4 text-red-600" />,
      volume_spike: <TrendingUp className="w-4 h-4 text-blue-600" />,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeAlerts = alerts.filter(a => a.isActive).length;
  const triggeredAlerts = alerts.filter(a => a.triggeredAt).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Alertes</h1>
          <p className="text-gray-600">Configurez des alertes pour suivre vos actifs</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Alerte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Créer une Alerte</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asset">Actif</Label>
                <Select value={newAlert.assetId} onValueChange={(value) => setNewAlert(prev => ({ ...prev, assetId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un actif" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.symbol} - {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type d'alerte</Label>
                <Select value={newAlert.type} onValueChange={(value: Alert['type']) => setNewAlert(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_above">Prix au-dessus</SelectItem>
                    <SelectItem value="price_below">Prix en-dessous</SelectItem>
                    <SelectItem value="volume_spike">Pic de volume</SelectItem>
                    <SelectItem value="percentage_change">Variation %</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Opérateur</Label>
                  <Select value={newAlert.operator} onValueChange={(value: Alert['operator']) => setNewAlert(prev => ({ ...prev, operator: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">{'>'}</SelectItem>
                      <SelectItem value="<">{'<'}</SelectItem>
                      <SelectItem value=">=">{'>='}</SelectItem>
                      <SelectItem value="<=">{'<='}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Seuil</Label>
                  <Input
                    id="threshold"
                    type="number"
                    step="0.01"
                    value={newAlert.threshold}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, threshold: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification">Notification</Label>
                <Select value={newAlert.notificationMethod} onValueChange={(value: Alert['notificationMethod']) => setNewAlert(prev => ({ ...prev, notificationMethod: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddAlert} className="w-full">
                Créer l'Alerte
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-2xl font-bold text-gray-900">{activeAlerts}</p>
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
                <p className="text-sm font-medium text-gray-600">Déclenchées</p>
                <p className="text-2xl font-bold text-gray-900">{triggeredAlerts}</p>
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
          <CardTitle>Mes Alertes ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actif</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Prix Actuel</TableHead>
                <TableHead>Notification</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créée le</TableHead>
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
                      {alert.operator} €{alert.threshold}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">€{alert.asset.price.toFixed(2)}</span>
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
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
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
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
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

export default ClientAlerts;
