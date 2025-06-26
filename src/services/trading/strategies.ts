import { MarketData, TradeSignal } from './types';

// Exemple : stratégie de croisement de moyennes mobiles
export function simpleMovingAverageStrategy(data: MarketData): TradeSignal {
  const { prices } = data;
  if (prices.length < 20) return 'HOLD';
  const shortMA = average(prices.slice(-5));
  const longMA = average(prices.slice(-20));
  if (shortMA > longMA) return 'BUY';
  if (shortMA < longMA) return 'SELL';
  return 'HOLD';
}

function average(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
} 