import { MarketData, TradeSignal } from './types';
import { simpleMovingAverageStrategy } from './strategies';

// Point d'entrée pour la prise de décision
export function getTradeSignal(data: MarketData): TradeSignal {
  return simpleMovingAverageStrategy(data);
} 