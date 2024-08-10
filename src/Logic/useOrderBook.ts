// useOrderBook.ts

import { useEffect, useState } from "react";

const useOrderBook = () => {
  const [buyOrders, setBuyOrders] = useState<any[]>([]);
  const [sellOrders, setSellOrders] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.b) {
        setBuyOrders(
          data.b.map((order: any) => ({
            price: order[0],
            quantity: order[1],
          }))
        );
      }

      if (data.a) {
        setSellOrders(
          data.a.map((order: any) => ({
            price: order[0],
            quantity: order[1],
          }))
        );
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return { buyOrders, sellOrders };
};

export default useOrderBook;
