import { useState, useEffect } from 'react';
import { getTradeSignal, MarketData, TradeSignal } from '../services/trading';

// Hook pour brancher la logique métier à l'UI
export function useTradingBot(prices: number[]) {
  const [signal, setSignal] = useState<TradeSignal>('HOLD');

  useEffect(() => {
    const data: MarketData = { prices };
    setSignal(getTradeSignal(data));
  }, [prices]);

  return { signal };
} 