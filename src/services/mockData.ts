import { User, Asset, PortfolioItem, Alert, AIRecommendation, DashboardStats } from '@/types';
import { TradeSignal } from './trading/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@quantumtrade.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-06-25T08:30:00Z'
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'client',
    status: 'active',
    createdAt: '2024-02-10T14:20:00Z',
    lastLogin: '2024-06-24T16:45:00Z'
  },
  {
    id: '3',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'client',
    status: 'active',
    createdAt: '2024-03-05T09:15:00Z',
    lastLogin: '2024-06-25T07:20:00Z'
  }
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    price: 189.50,
    change: 2.30,
    changePercent: 1.23,
    volume: 52847392
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    price: 43250.00,
    change: -850.00,
    changePercent: -1.93,
    volume: 28394857
  },
  {
    id: '3',
    symbol: 'EUR/USD',
    name: 'Euro to US Dollar',
    type: 'forex',
    price: 1.0892,
    change: 0.0023,
    changePercent: 0.21,
    volume: 847392847
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    price: 248.78,
    change: 8.92,
    changePercent: 3.72,
    volume: 78492837
  },
  {
    id: '5',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    price: 2456.80,
    change: 45.20,
    changePercent: 1.87,
    volume: 15847392
  }
];

// Mock Portfolio Items
export const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    userId: '2',
    assetId: '1',
    asset: mockAssets[0],
    quantity: 50,
    purchasePrice: 175.20,
    currentValue: 9475.00,
    gainLoss: 715.00,
    gainLossPercent: 8.16,
    purchaseDate: '2024-04-15T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    assetId: '2',
    asset: mockAssets[1],
    quantity: 0.5,
    purchasePrice: 45000.00,
    currentValue: 21625.00,
    gainLoss: -875.00,
    gainLossPercent: -3.89,
    purchaseDate: '2024-05-10T14:30:00Z'
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    userId: '2',
    assetId: '1',
    asset: mockAssets[0],
    type: 'price_above',
    threshold: 200,
    operator: '>',
    isActive: true,
    notificationMethod: 'email',
    createdAt: '2024-06-20T09:00:00Z'
  },
  {
    id: '2',
    userId: '3',
    assetId: '2',
    asset: mockAssets[1],
    type: 'price_below',
    threshold: 40000,
    operator: '<',
    isActive: true,
    notificationMethod: 'push',
    createdAt: '2024-06-22T11:30:00Z'
  }
];

// Mock AI Recommendations
export const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    userId: '2',
    assetId: '1',
    asset: mockAssets[0],
    type: 'buy',
    confidence: 0.85,
    reasoning: 'Strong quarterly earnings and positive market sentiment indicate potential for continued growth.',
    targetPrice: 210.00,
    timeHorizon: 'medium',
    createdAt: '2024-06-25T06:00:00Z'
  },
  {
    id: '2',
    assetId: '4',
    asset: mockAssets[3],
    type: 'hold',
    confidence: 0.72,
    reasoning: 'Recent volatility suggests waiting for market stabilization before making moves.',
    timeHorizon: 'short',
    createdAt: '2024-06-25T07:30:00Z'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  activeAlerts: 89,
  totalPortfolioValue: 2847592.50,
  activePortfolios: 892,
  aiRecommendations: 34,
  marketStatus: 'open'
};

export const mockTrades = [
  { id: '1', date: '2024-06-01 10:00', signal: 'BUY' as TradeSignal, price: 120, asset: 'BTC' },
  { id: '2', date: '2024-06-02 14:30', signal: 'SELL' as TradeSignal, price: 125, asset: 'ETH' },
  { id: '3', date: '2024-06-03 09:15', signal: 'HOLD' as TradeSignal, price: 130, asset: 'BTC' },
];
