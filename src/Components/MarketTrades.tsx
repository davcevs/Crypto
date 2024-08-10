// // src/components/MarketTrades.tsx
// import React, { useEffect, useState } from "react";
// import { fetchRecentTrades } from "../utils/binanceApi";

// interface MarketTradesProps {
//   symbol: string;
// }

// const MarketTrades: React.FC<MarketTradesProps> = ({ symbol }) => {
//   const [trades, setTrades] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchRecentTrades(symbol);
//       setTrades(data);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, [symbol]);

//   return (
//     <div className="bg-gray-800 p-4 rounded">
//       <h2 className="text-xl font-bold mb-2">Market Trades</h2>
//       <div className="overflow-y-auto h-64">
//         {trades.map((trade) => (
//           <div key={trade.id} className="flex justify-between">
//             <span
//               className={trade.isBuyerMaker ? "text-red-500" : "text-green-500"}
//             >
//               {parseFloat(trade.price).toFixed(2)}
//             </span>
//             <span>{parseFloat(trade.qty).toFixed(6)}</span>
//             <span>{new Date(trade.time).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MarketTrades;

// src/components/MarketTrades.tsx
import React, { useEffect, useState } from "react";

interface MarketTradesProps {
  symbol: string;
}

interface Trade {
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyerMaker: boolean;
}

const MarketTrades: React.FC<MarketTradesProps> = ({ symbol }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const response = await fetch(
        `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=20`
      );
      const data = await response.json();
      setTrades(data);
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 5000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="bg-gray-800 p-2 rounded">
      <h2 className="text-lg font-bold mb-2">Market Trades</h2>
      <div className="overflow-y-auto h-64">
        {trades.map((trade) => (
          <div key={trade.id} className="flex justify-between text-sm">
            <span
              className={trade.isBuyerMaker ? "text-red-500" : "text-green-500"}
            >
              {parseFloat(trade.price).toFixed(2)}
            </span>
            <span>{parseFloat(trade.qty).toFixed(6)}</span>
            <span className="text-gray-400">
              {new Date(trade.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTrades;
