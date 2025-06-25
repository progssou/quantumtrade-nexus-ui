
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Save, Bell, Shield, CreditCard, Settings, Mail, Phone, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ClientProfile = () => {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    language: 'fr',
    timezone: 'Europe/Paris'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketAlerts: true,
    priceAlerts: true,
    newsDigest: true,
    weeklyReport: false,
    currency: 'EUR',
    theme: 'light',
    chartType: 'line'
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceTracking: true
  });

  const handleProfileSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été sauvegardées.",
    });
  };

  const handlePreferencesSave = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été sauvegardées.",
    });
  };

  const handleSecuritySave = () => {
    toast({
      title: "Paramètres de sécurité mis à jour",
      description: "Vos paramètres de sécurité ont été sauvegardés.",
    });
  };

  const updateProfile = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreference = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const updateSecurity = (field: string, value: any) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
        </div>
        <Badge variant="default">Compte Vérifié</Badge>
      </div>

      {/* Profile Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="default">Trader Actif</Badge>
                <span className="text-sm text-gray-500">Membre depuis février 2024</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Dernière connexion</p>
              <p className="font-medium">Aujourd'hui à 14:32</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Informations Personnelles</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => updateProfile('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => updateProfile('lastName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                  />
                </div>

                <Button onClick={handleProfileSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les Informations
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Adresse</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => updateProfile('address', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => updateProfile('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code Postal</Label>
                    <Input
                      id="postalCode"
                      value={profileData.postalCode}
                      onChange={(e) => updateProfile('postalCode', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select value={profileData.country} onValueChange={(value) => updateProfile('country', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Belgium">Belgique</SelectItem>
                      <SelectItem value="Switzerland">Suisse</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select value={profileData.language} onValueChange={(value) => updateProfile('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau Horaire</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => updateProfile('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notifications Email</p>
                    <p className="text-xs text-gray-500">Recevoir des emails pour les alertes importantes</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => updatePreference('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notifications SMS</p>
                    <p className="text-xs text-gray-500">Recevoir des SMS pour les alertes critiques</p>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) => updatePreference('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notifications Push</p>
                    <p className="text-xs text-gray-500">Notifications dans l'application</p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => updatePreference('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Alertes de Marché</p>
                    <p className="text-xs text-gray-500">Nouvelles du marché et analyses</p>
                  </div>
                  <Switch
                    checked={preferences.marketAlerts}
                    onCheckedChange={(checked) => updatePreference('marketAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Alertes de Prix</p>
                    <p className="text-xs text-gray-500">Notifications de seuils de prix</p>
                  </div>
                  <Switch
                    checked={preferences.priceAlerts}
                    onCheckedChange={(checked) => updatePreference('priceAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Digest Quotidien</p>
                    <p className="text-xs text-gray-500">Résumé des actualités chaque matin</p>
                  </div>
                  <Switch
                    checked={preferences.newsDigest}
                    onCheckedChange={(checked) => updatePreference('newsDigest', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Rapport Hebdomadaire</p>
                    <p className="text-xs text-gray-500">Performance de votre portefeuille</p>
                  </div>
                  <Switch
                    checked={preferences.weeklyReport}
                    onCheckedChange={(checked) => updatePreference('weeklyReport', checked)}
                  />
                </div>

                <Button onClick={handlePreferencesSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les Préférences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Interface</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise d'Affichage</Label>
                  <Select value={preferences.currency} onValueChange={(value) => updatePreference('currency', value)}>
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

                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={preferences.theme} onValueChange={(value) => updatePreference('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="auto">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chartType">Type de Graphique par Défaut</Label>
                  <Select value={preferences.chartType} onValueChange={(value) => updatePreference('chartType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Ligne</SelectItem>
                      <SelectItem value="candlestick">Chandeliers</SelectItem>
                      <SelectItem value="bar">Barres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sécurité du Compte</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Authentification à Deux Facteurs</p>
                    <p className="text-xs text-gray-500">Sécurité renforcée avec un code SMS</p>
                  </div>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSecurity('twoFactorEnabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de Session (minutes)</Label>
                  <Select 
                    value={security.sessionTimeout.toString()} 
                    onValueChange={(value) => updateSecurity('sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                      <SelectItem value="120">2 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notifications de Connexion</p>
                    <p className="text-xs text-gray-500">Être alerté des nouvelles connexions</p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => updateSecurity('loginNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Suivi des Appareils</p>
                    <p className="text-xs text-gray-500">Enregistrer les appareils utilisés</p>
                  </div>
                  <Switch
                    checked={security.deviceTracking}
                    onCheckedChange={(checked) => updateSecurity('deviceTracking', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Changer le Mot de Passe
                  </Button>
                  <Button variant="outline" className="w-full">
                    Voir les Sessions Actives
                  </Button>
                </div>

                <Button onClick={handleSecuritySave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder la Sécurité
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Connexion réussie</p>
                      <p className="text-xs text-gray-500">Aujourd'hui à 14:32 - Paris, France</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Préférences modifiées</p>
                      <p className="text-xs text-gray-500">Hier à 16:45</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Tentative de connexion</p>
                      <p className="text-xs text-gray-500">Il y a 3 jours - Dispositif non reconnu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Facturation et Abonnement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compte Gratuit</h3>
                <p className="text-gray-600 mb-4">
                  Vous utilisez actuellement la version gratuite de QuantumTrade
                </p>
                <Button>
                  Passer à Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
