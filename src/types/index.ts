
// Types pour la plateforme QuantumTrade

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex';
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface PortfolioItem {
  id: string;
  userId: string;
  assetId: string;
  asset: Asset;
  quantity: number;
  purchasePrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  purchaseDate: string;
}

export interface Alert {
  id: string;
  userId: string;
  assetId: string;
  asset: Asset;
  type: 'price_above' | 'price_below' | 'volume_spike' | 'percentage_change';
  threshold: number;
  operator: '>' | '<' | '>=' | '<=';
  isActive: boolean;
  notificationMethod: 'email' | 'sms' | 'push';
  createdAt: string;
  triggeredAt?: string;
}

export interface AIRecommendation {
  id: string;
  userId?: string; // null pour recommandations globales
  assetId: string;
  asset: Asset;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  targetPrice?: number;
  timeHorizon: 'short' | 'medium' | 'long';
  createdAt: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  marketCap?: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeAlerts: number;
  totalPortfolioValue: number;
  activePortfolios: number;
  aiRecommendations: number;
  marketStatus: 'open' | 'closed' | 'pre-market' | 'after-hours';
}
