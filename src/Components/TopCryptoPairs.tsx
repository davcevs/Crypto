// // src/components/TopCryptoPairs.tsx
// import React, { useEffect, useState } from "react";
// import { fetch24hrTicker } from "../utils/binanceApi";

// const TopCryptoPairs: React.FC = () => {
//   const [topPairs, setTopPairs] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetch24hrTicker();
//       const usdtPairs = data
//         .filter((ticker: any) => ticker.symbol.endsWith("USDT"))
//         .sort((a: any, b: any) => parseFloat(b.volume) - parseFloat(a.volume))
//         .slice(0, 10);
//       setTopPairs(usdtPairs);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-800 p-4 rounded mt-4">
//       <h2 className="text-xl font-bold mb-2">Top Crypto Pairs</h2>
//       {topPairs.map((pair) => (
//         <div
//           key={pair.symbol}
//           className="flex justify-between cursor-pointer hover:bg-gray-700 p-1 rounded"
//           onClick={() => onSymbolSelect(pair.symbol)}
//         >
//           <span>{pair.symbol}</span>
//           <span>{parseFloat(pair.lastPrice).toFixed(2)}</span>
//           <span
//             className={
//               parseFloat(pair.priceChangePercent) >= 0
//                 ? "text-green-500"
//                 : "text-red-500"
//             }
//           >
//             {parseFloat(pair.priceChangePercent).toFixed(2)}%
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TopCryptoPairs;

// src/components/TopCryptoPairs.tsx
import React, { useEffect, useState } from "react";

interface TopCryptoPairsProps {
  onSymbolSelect: (symbol: string) => void;
}

interface TickerData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

const TopCryptoPairs: React.FC<TopCryptoPairsProps> = ({ onSymbolSelect }) => {
  const [topPairs, setTopPairs] = useState<TickerData[]>([
    // src/components/TopCryptoPairs.tsx (continued)
  ]);

  useEffect(() => {
    const fetchTopPairs = async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const data = await response.json();
      const usdtPairs = data
        .filter((ticker: TickerData) => ticker.symbol.endsWith("USDT"))
        .sort(
          (a: TickerData, b: TickerData) =>
            parseFloat(b.lastPrice) - parseFloat(a.lastPrice)
        )
        .slice(0, 10);
      setTopPairs(usdtPairs);
    };

    fetchTopPairs();
    const interval = setInterval(fetchTopPairs, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-2 rounded">
      <h2 className="text-lg font-bold mb-2">Top Crypto Pairs</h2>
      <div className="space-y-1">
        {topPairs.map((pair) => (
          <div
            key={pair.symbol}
            className="flex justify-between cursor-pointer hover:bg-gray-700 p-1 rounded"
            onClick={() => onSymbolSelect(pair.symbol)}
          >
            <span>{pair.symbol}</span>
            <span>{parseFloat(pair.lastPrice).toFixed(2)}</span>
            <span
              className={
                parseFloat(pair.priceChangePercent) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {parseFloat(pair.priceChangePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCryptoPairs;
