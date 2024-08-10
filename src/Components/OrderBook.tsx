// // src/components/OrderBook.tsx
// import React, { useEffect, useState } from "react";
// import { fetchOrderBook } from "../utils/binanceApi";

// interface OrderBookProps {
//   symbol: string;
// }

// const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
//   const [orderBook, setOrderBook] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchOrderBook(symbol);
//       setOrderBook(data);
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, [symbol]);

//   if (!orderBook) return <div>Loading order book...</div>;

//   return (
//     <div className="bg-gray-800 p-4 rounded">
//       <h2 className="text-xl font-bold mb-2">Order Book</h2>
//       <div className="flex">
//         <div className="w-1/2 pr-2">
//           <h3 className="text-green-500">Bids</h3>
//           {orderBook.bids.slice(0, 10).map((bid: string[], index: number) => (
//             <div key={index} className="flex justify-between">
//               <span>{parseFloat(bid[0]).toFixed(2)}</span>
//               <span>{parseFloat(bid[1]).toFixed(6)}</span>
//             </div>
//           ))}
//         </div>
//         <div className="w-1/2 pl-2">
//           <h3 className="text-red-500">Asks</h3>
//           {orderBook.asks.slice(0, 10).map((ask: string[], index: number) => (
//             <div key={index} className="flex justify-between">
//               <span>{parseFloat(ask[0]).toFixed(2)}</span>
//               <span>{parseFloat(ask[1]).toFixed(6)}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderBook;

// src/components/OrderBook.tsx
import React, { useEffect, useState } from "react";

interface OrderBookProps {
  symbol: string;
}

interface OrderBookData {
  bids: string[][];
  asks: string[][];
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null);

  useEffect(() => {
    const fetchOrderBook = async () => {
      const response = await fetch(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`
      );
      const data = await response.json();
      setOrderBook(data);
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 5000);

    return () => clearInterval(interval);
  }, [symbol]);

  if (!orderBook) return <div>Loading order book...</div>;

  return (
    <div className="bg-gray-800 p-2 rounded">
      <h2 className="text-lg font-bold mb-2">Order Book</h2>
      <div className="flex">
        <div className="w-1/2 pr-1">
          <div className="text-green-500 font-bold">Bids</div>
          {orderBook.bids.slice(0, 10).map((bid, index) => (
            <div key={index} className="flex justify-between">
              <span>{parseFloat(bid[1]).toFixed(6)}</span>
              <span>{parseFloat(bid[0]).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-1">
          <div className="text-red-500 font-bold text-right">Asks</div>
          {orderBook.asks.slice(0, 10).map((ask, index) => (
            <div key={index} className="flex justify-between">
              <span>{parseFloat(ask[0]).toFixed(2)}</span>
              <span>{parseFloat(ask[1]).toFixed(6)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
