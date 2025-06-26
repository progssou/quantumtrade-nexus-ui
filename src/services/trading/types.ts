export type TradeSignal = 'BUY' | 'SELL' | 'HOLD';

export interface MarketData {
  prices: number[];
  // Ajoute d'autres champs si besoin (volume, timestamp, etc.)
}

export interface Trade {
  id: string;
  date: string; // ou Date
  signal: TradeSignal;
  price: number;
  asset: string;
} 