// HotCoins.tsx
import { Coin } from "./../Types/types";

interface HotCoinsProps {
  title: string;
  coins: Coin[];
}

const HotCoins = ({ title, coins }: HotCoinsProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {coins.map((coin) => (
          <div key={coin.symbol} className="flex justify-between items-center">
            <span className="flex items-center py-1">
              {coin.logo && (
                <img
                  src={coin.logo}
                  alt={coin.symbol}
                  className="w-6 h-6 mr-2"
                />
              )}
              <span>{coin.symbol}</span>
            </span>
            <span
              className={`${
                coin.prevPrice && coin.price > coin.prevPrice
                  ? "text-green-500"
                  : coin.prevPrice && coin.price < coin.prevPrice
                  ? "text-red-500"
                  : ""
              }`}
            >
              ${coin.price < 1 ? coin.price.toFixed(6) : coin.price.toFixed(2)}
            </span>
            <span
              className={
                coin.change24h >= 0 ? "text-green-500" : "text-red-500"
              }
            >
              {coin.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotCoins;
