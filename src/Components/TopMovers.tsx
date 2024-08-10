// // src/components/TopMovers.tsx
// import React, { useEffect, useState } from "react";
// import { fetch24hrTicker } from "../utils/binanceApi";

// interface TopMoversProps {
//   onSymbolSelect: (symbol: string) => void;
// }

// const TopMovers: React.FC<TopMoversProps> = ({ onSymbolSelect }) => {
//   const [topMovers, setTopMovers] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetch24hrTicker();
//       const usdtPairs = data
//         .filter((ticker: any) => ticker.symbol.endsWith("USDT"))
//         .sort(
//           (a: any, b: any) =>
//             Math.abs(parseFloat(b.priceChangePercent)) -
//             Math.abs(parseFloat(a.priceChangePercent))
//         )
//         .slice(0, 10);
//       setTopMovers(usdtPairs);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-800 p-4 rounded mt-4">
//       <h2 className="text-xl font-bold mb-2">Top Movers</h2>
//       {topMovers.map((mover) => (
//         <div
//           key={mover.symbol}
//           className="flex justify-between cursor-pointer hover:bg-gray-700 p-1 rounded"
//           onClick={() => onSymbolSelect(mover.symbol)}
//         >
//           <span>{mover.symbol}</span>
//           <span>{parseFloat(mover.lastPrice).toFixed(2)}</span>
//           <span
//             className={
//               parseFloat(mover.priceChangePercent) >= 0
//                 ? "text-green-500"
//                 : "text-red-500"
//             }
//           >
//             {parseFloat(mover.priceChangePercent).toFixed(2)}%
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TopMovers;

// src/components/TopMovers.tsx
import React, { useEffect, useState } from "react";

interface TopMoversProps {
  onSymbolSelect: (symbol: string) => void;
}

interface TickerData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

const TopMovers: React.FC<TopMoversProps> = ({ onSymbolSelect }) => {
  const [topMovers, setTopMovers] = useState<TickerData[]>([]);

  useEffect(() => {
    const fetchTopMovers = async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const data = await response.json();
      const usdtPairs = data
        .filter((ticker: TickerData) => ticker.symbol.endsWith("USDT"))
        .sort(
          (a: TickerData, b: TickerData) =>
            Math.abs(parseFloat(b.priceChangePercent)) -
            Math.abs(parseFloat(a.priceChangePercent))
        )
        .slice(0, 10);
      setTopMovers(usdtPairs);
    };

    fetchTopMovers();
    const interval = setInterval(fetchTopMovers, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-2 rounded">
      <h2 className="text-lg font-bold mb-2">Top Movers</h2>
      <div className="space-y-1">
        {topMovers.map((mover) => (
          <div
            key={mover.symbol}
            className="flex justify-between cursor-pointer hover:bg-gray-700 p-1 rounded"
            onClick={() => onSymbolSelect(mover.symbol)}
          >
            <span>{mover.symbol}</span>
            <span>{parseFloat(mover.lastPrice).toFixed(2)}</span>
            <span
              className={
                parseFloat(mover.priceChangePercent) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {parseFloat(mover.priceChangePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
