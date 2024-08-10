// src/utils/binanceApi.ts

const BASE_URL = "https://api.binance.com/api/v3";

export const fetchOrderBook = async (symbol: string) => {
  const response = await fetch(`${BASE_URL}/depth?symbol=${symbol}&limit=10`);
  return response.json();
};

export const fetchRecentTrades = async (symbol: string) => {
  const response = await fetch(`${BASE_URL}/trades?symbol=${symbol}&limit=20`);
  return response.json();
};

export const fetch24hrTicker = async () => {
  const response = await fetch(`${BASE_URL}/ticker/24hr`);
  return response.json();
};

export const fetchExchangeInfo = async () => {
  const response = await fetch(`${BASE_URL}/exchangeInfo`);
  return response.json();
};
