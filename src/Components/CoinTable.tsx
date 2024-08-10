// CoinTable.tsx
import { Coin } from "./../Types/types";

interface CoinTableProps {
  coins: Coin[];
}

const CoinTable = ({ coins }: CoinTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-800 ">
            <th className="p-2">Symbol</th>
            <th className="p-2">Price</th>
            <th className="p-2">24h Change</th>
            <th className="p-2">24h Volume</th>
            <th className="p-2">Market Cap</th>
            <th className="p-2">24h High</th>
            <th className="p-2">24h Low</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.symbol} className="m-10">
              <td className="p-2 flex items-center py-8">
                {coin.logo && (
                  <img
                    src={coin.logo}
                    alt={coin.symbol}
                    className="w-6 h-6 mr-2"
                  />
                )}
                <span>{coin.symbol}</span>
              </td>
              <td
                className={`p-2 ${
                  coin.prevPrice && coin.price > coin.prevPrice
                    ? "text-green-500"
                    : coin.prevPrice && coin.price < coin.prevPrice
                    ? "text-red-500"
                    : ""
                }`}
              >
                $
                {coin.price < 1 ? coin.price.toFixed(6) : coin.price.toFixed(2)}
              </td>
              <td
                className={`p-2 ${
                  coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.change24h.toFixed(2)}%
              </td>
              <td className="p-2">${coin.volume24h.toLocaleString()}</td>
              <td className="p-2">${(coin.marketCap / 1000000).toFixed(2)}M</td>
              <td className="p-2">
                $
                {coin.highPrice < 1
                  ? coin.highPrice.toFixed(6)
                  : coin.highPrice.toFixed(2)}
              </td>
              <td className="p-2">
                $
                {coin.lowPrice < 1
                  ? coin.lowPrice.toFixed(6)
                  : coin.lowPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
