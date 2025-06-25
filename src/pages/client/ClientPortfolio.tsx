
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, TrendingUp, TrendingDown, Edit, Trash } from 'lucide-react';
import { mockPortfolio } from '@/services/mockData';
import { PortfolioItem } from '@/types';

const ClientPortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(mockPortfolio);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPortfolio = portfolio.filter(item => 
    item.asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalGainLoss = portfolio.reduce((sum, item) => sum + item.gainLoss, 0);
  const totalGainLossPercent = totalGainLoss / (totalValue - totalGainLoss) * 100;

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getGainLossDisplay = (gainLoss: number, gainLossPercent: number) => {
    const isPositive = gainLoss >= 0;
    const textColor = isPositive ? 'text-green-600' : 'text-red-600';
    const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
    
    return (
      <div className={`${bgColor} ${textColor} px-2 py-1 rounded text-sm font-medium text-center`}>
        <div>{formatCurrency(gainLoss)}</div>
        <div className="text-xs">{formatPercent(gainLossPercent)}</div>
      </div>
    );
  };

  const getAssetTypeColor = (type: string) => {
    const colors = {
      stock: 'bg-blue-100 text-blue-800',
      crypto: 'bg-orange-100 text-orange-800',
      forex: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Portefeuille</h1>
          <p className="text-gray-600">Gérez vos positions et suivez leurs performances</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter Position
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une Nouvelle Position</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 text-gray-500">
              Formulaire d'ajout de position à implémenter
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Valeur Totale</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
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
                <p className="text-sm font-medium text-gray-600">Gain/Perte Total</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalGainLoss)}
                </p>
                <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercent(totalGainLossPercent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Nombre de Positions</p>
                <p className="text-2xl font-bold text-gray-900">{portfolio.length}</p>
                <p className="text-xs text-gray-500">Actifs différents</p>
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
              placeholder="Rechercher un actif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Table */}
      <Card>
        <CardHeader>
          <CardTitle>Positions ({filteredPortfolio.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actif</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Quantité</TableHead>
                <TableHead className="text-right">Prix d'Achat</TableHead>
                <TableHead className="text-right">Prix Actuel</TableHead>
                <TableHead className="text-right">Valeur Actuelle</TableHead>
                <TableHead className="text-right">Gain/Perte</TableHead>
                <TableHead>Date d'Achat</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPortfolio.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.asset.symbol}</p>
                      <p className="text-sm text-gray-500">{item.asset.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAssetTypeColor(item.asset.type)}>
                      {item.asset.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(item.purchasePrice)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(item.asset.price)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {formatCurrency(item.currentValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {getGainLossDisplay(item.gainLoss, item.gainLossPercent)}
                  </TableCell>
                  <TableCell>
                    {formatDate(item.purchaseDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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

export default ClientPortfolio;
