// cryptoPairs.ts

import { Coin } from "../Types/types";

// Function to fetch data from Binance API
async function fetchCryptoPairs(): Promise<Coin[]> {
  const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await response.json();
  return data;
}

// Function to filter and format data for Crypto Pairs
export async function getCryptoPairs(): Promise<Coin[]> {
  try {
    const data = await fetchCryptoPairs();
    const cryptoPairs = data
      .map((item) => ({
        symbol: item.symbol,
        price: parseFloat(item.lastPrice).toFixed(2),
        percentChange: parseFloat(item.priceChangePercent).toFixed(2),
      }))
      .filter((item) => !isNaN(item.price) && item.symbol.endsWith("USDT"))
      .sort((a, b) => b.price - a.price)
      .slice(0, 10);

    return cryptoPairs;
  } catch (error) {
    console.error("Error fetching crypto pairs:", error);
    return [];
  }
}
