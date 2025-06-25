
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, TrendingDown, Star, Plus } from 'lucide-react';
import { mockAssets } from '@/services/mockData';
import { Asset } from '@/types';

const ClientMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>(['1', '2']); // IDs des actifs en watchlist

  const filteredAssets = mockAssets.filter(asset => 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stocks = filteredAssets.filter(asset => asset.type === 'stock');
  const cryptos = filteredAssets.filter(asset => asset.type === 'crypto');
  const forex = filteredAssets.filter(asset => asset.type === 'forex');

  const toggleWatchlist = (assetId: string) => {
    setWatchlist(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const textColor = isPositive ? 'text-green-600' : 'text-red-600';
    const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
    
    return (
      <div className={`${bgColor} ${textColor} px-2 py-1 rounded text-sm font-medium text-center`}>
        <div className="flex items-center space-x-1">
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isPositive ? '+' : ''}{formatCurrency(change)}</span>
        </div>
        <div className="text-xs">{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</div>
      </div>
    );
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const AssetTable = ({ assets, title }: { assets: Asset[], title: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title} ({assets.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actif</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Variation</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{asset.symbol}</p>
                      <p className="text-sm text-gray-500">{asset.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {formatCurrency(asset.price)}
                </TableCell>
                <TableCell className="text-right">
                  {formatChange(asset.change, asset.changePercent)}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-gray-600">
                  {formatVolume(asset.volume)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWatchlist(asset.id)}
                    >
                      <Star 
                        className={`w-4 h-4 ${watchlist.includes(asset.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                      />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const marketStatus = 'open'; // Simulé
  const marketStats = {
    gainers: filteredAssets.filter(a => a.changePercent > 0).length,
    losers: filteredAssets.filter(a => a.changePercent < 0).length,
    unchanged: filteredAssets.filter(a => a.changePercent === 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marché en Temps Réel</h1>
          <p className="text-gray-600">Suivez les cours et tendances du marché</p>
        </div>
        <Badge variant={marketStatus === 'open' ? 'default' : 'secondary'}>
          Marché {marketStatus === 'open' ? 'Ouvert' : 'Fermé'}
        </Badge>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{mockAssets.length}</p>
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
                <p className="text-sm font-medium text-gray-600">En Hausse</p>
                <p className="text-2xl font-bold text-green-600">{marketStats.gainers}</p>
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
                <p className="text-sm font-medium text-gray-600">En Baisse</p>
                <p className="text-2xl font-bold text-red-600">{marketStats.losers}</p>
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
                <p className="text-sm font-medium text-gray-600">Watchlist</p>
                <p className="text-2xl font-bold text-gray-900">{watchlist.length}</p>
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
              placeholder="Rechercher un actif par symbole ou nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Market Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="stocks">Actions</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AssetTable assets={filteredAssets} title="Tous les Actifs" />
        </TabsContent>

        <TabsContent value="watchlist">
          <AssetTable 
            assets={filteredAssets.filter(asset => watchlist.includes(asset.id))} 
            title="Ma Watchlist" 
          />
        </TabsContent>

        <TabsContent value="stocks">
          <AssetTable assets={stocks} title="Actions" />
        </TabsContent>

        <TabsContent value="crypto">
          <AssetTable assets={cryptos} title="Cryptomonnaies" />
        </TabsContent>

        <TabsContent value="forex">
          <AssetTable assets={forex} title="Forex" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientMarket;
