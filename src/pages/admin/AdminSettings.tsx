
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Save, Globe, Mail, Shield, Database, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Paramètres généraux
    platformName: 'QuantumTrade',
    platformUrl: 'https://quantumtrade.com',
    maxUsers: 10000,
    maintenanceMode: false,
    
    // Paramètres de trading
    defaultCurrency: 'EUR',
    tradingHours: '09:00-17:30',
    minTradeAmount: 10,
    maxTradeAmount: 100000,
    
    // Paramètres de notification
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    alertFrequency: '1',
    
    // Paramètres IA
    aiEnabled: true,
    aiConfidenceThreshold: 0.7,
    aiUpdateFrequency: '4',
    maxRecommendationsPerUser: 10,
    
    // Paramètres de sécurité
    sessionTimeout: 30,
    twoFactorRequired: false,
    passwordComplexity: 'medium',
    apiRateLimit: 1000
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simuler la sauvegarde
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de la plateforme ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres de la Plateforme</h1>
          <p className="text-gray-600">Configurez les paramètres globaux de QuantumTrade</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Statut de la Plateforme</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mode Maintenance</p>
                <p className="text-xs text-gray-500">Désactiver temporairement la plateforme</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Statut Serveur</p>
              <Badge variant="default" className="mt-1">En ligne</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="text-sm text-gray-900 mt-1">v2.1.0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres Généraux */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Paramètres Généraux</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Nom de la plateforme</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platformUrl">URL de la plateforme</Label>
              <Input
                id="platformUrl"
                value={settings.platformUrl}
                onChange={(e) => handleSettingChange('platformUrl', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Nombre maximum d'utilisateurs</Label>
              <Input
                id="maxUsers"
                type="number"
                value={settings.maxUsers}
                onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Devise par défaut</Label>
              <Select 
                value={settings.defaultCurrency} 
                onValueChange={(value) => handleSettingChange('defaultCurrency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="USD">USD - Dollar US</SelectItem>
                  <SelectItem value="GBP">GBP - Livre Sterling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications Email</p>
                <p className="text-xs text-gray-500">Envoyer des emails aux utilisateurs</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications SMS</p>
                <p className="text-xs text-gray-500">Envoyer des SMS aux utilisateurs</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications Push</p>
                <p className="text-xs text-gray-500">Notifications dans l'application</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertFrequency">Fréquence des alertes (heures)</Label>
              <Select 
                value={settings.alertFrequency} 
                onValueChange={(value) => handleSettingChange('alertFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.25">15 minutes</SelectItem>
                  <SelectItem value="1">1 heure</SelectItem>
                  <SelectItem value="4">4 heures</SelectItem>
                  <SelectItem value="24">24 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Intelligence Artificielle</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">IA Activée</p>
                <p className="text-xs text-gray-500">Générer des recommandations automatiques</p>
              </div>
              <Switch
                checked={settings.aiEnabled}
                onCheckedChange={(checked) => handleSettingChange('aiEnabled', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiConfidenceThreshold">Seuil de confiance IA</Label>
              <Input
                id="aiConfidenceThreshold"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.aiConfidenceThreshold}
                onChange={(e) => handleSettingChange('aiConfidenceThreshold', parseFloat(e.target.value))}
              />
              <p className="text-xs text-gray-500">Confiance minimum pour afficher une recommandation</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiUpdateFrequency">Fréquence de mise à jour (heures)</Label>
              <Select 
                value={settings.aiUpdateFrequency} 
                onValueChange={(value) => handleSettingChange('aiUpdateFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 heure</SelectItem>
                  <SelectItem value="4">4 heures</SelectItem>
                  <SelectItem value="12">12 heures</SelectItem>
                  <SelectItem value="24">24 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRecommendationsPerUser">Max recommandations par utilisateur</Label>
              <Input
                id="maxRecommendationsPerUser"
                type="number"
                value={settings.maxRecommendationsPerUser}
                onChange={(e) => handleSettingChange('maxRecommendationsPerUser', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Sécurité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Authentification à deux facteurs</p>
                <p className="text-xs text-gray-500">Obligatoire pour tous les utilisateurs</p>
              </div>
              <Switch
                checked={settings.twoFactorRequired}
                onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordComplexity">Complexité des mots de passe</Label>
              <Select 
                value={settings.passwordComplexity} 
                onValueChange={(value) => handleSettingChange('passwordComplexity', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">Limite de taux API (req/h)</Label>
              <Input
                id="apiRateLimit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
