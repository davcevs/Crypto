import { useEffect, useState } from "react";
import { getCryptoPairs } from "./../Logic/cryptoPairs";
import { getTopCryptoMovers } from "./../Logic/topCryptoMovers";
import { Coin } from "../Types/types";

const CryptoMovers = () => {
  const [cryptoPairs, setCryptoPairs] = useState<Coin[]>([]);
  const [topMovers, setTopMovers] = useState<Coin[]>([]);

  useEffect(() => {
    getCryptoPairs().then((data) => setCryptoPairs(data));
    getTopCryptoMovers().then((data) => setTopMovers(data));
  }, []);

  const getPriceColor = (price: number) => {
    return price >= 0 ? "text-green-500" : "text-red-500";
  };

  const getPercentColor = (percent: number) => {
    return percent >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-center text-white mb-4">Crypto Pairs</h1>
          <div id="crypto-list" className="space-y-2 text-white">
            {cryptoPairs.map((pair, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-700 py-2 px-4"
              >
                <span>{pair.symbol}</span>
                <span className={getPriceColor(pair.price)}>{pair.price}</span>
                <span className={getPercentColor(pair.percentChange)}>
                  {pair.percentChange}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-center text-white mb-4">Top Crypto Movers</h1>
          <div id="top-movers" className="space-y-2 text-white">
            {topMovers.map((mover, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-700 py-2 px-4"
              >
                <span>{mover.symbol}</span>
                <span className={getPriceColor(parseFloat(mover.price))}>
                  {mover.price}
                </span>
                <span
                  className={getPercentColor(parseFloat(mover.percentChange))}
                >
                  {mover.percentChange}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoMovers;
