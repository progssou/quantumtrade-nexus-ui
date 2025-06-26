import { useTradingBot } from '../hooks/useTradingBot';

export function TradingBotWidget() {
  // Exemple de données de prix (à remplacer par des données réelles si besoin)
  const prices = [100, 102, 101, 105, 110, 108, 112, 115, 117, 120, 119, 121, 123, 125, 127, 130, 128, 129, 131, 133];
  const { signal } = useTradingBot(prices);

  return (
    <div className="p-4 border rounded shadow bg-white max-w-xs">
      <h3 className="font-bold mb-2">Signal du Trading Bot</h3>
      <p>
        Signal actuel : <span className="font-mono text-lg">{signal}</span>
      </p>
    </div>
  );
} 