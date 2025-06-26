import { Trade } from '../services/trading/types';

export function TradesList({ trades }: { trades: Trade[] }) {
  return (
    <div className="p-4 border rounded bg-white mt-4">
      <h3 className="font-bold mb-2">Historique des Trades</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Actif</th>
            <th>Signal</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id}>
              <td>{trade.date}</td>
              <td>{trade.asset}</td>
              <td>
                <span className={
                  trade.signal === 'BUY' ? 'text-green-600' :
                  trade.signal === 'SELL' ? 'text-red-600' : 'text-gray-600'
                }>
                  {trade.signal}
                </span>
              </td>
              <td>{trade.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 