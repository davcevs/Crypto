import { Coin } from "./../Types/types";
import cryptoLogos from "./../Data/cryptoLogos.json";
import axios from "axios";

const BINANCE_API_URL = "https://api.binance.com/api/v3";

export const fetchTickerData = async (): Promise<Coin[]> => {
  try {
    const [tickerResponse, priceResponse] = await Promise.all([
      axios.get(`${BINANCE_API_URL}/ticker/24hr`),
      axios.get(`${BINANCE_API_URL}/ticker/price`),
    ]);

    const tickerData = tickerResponse.data;
    const priceData = priceResponse.data;

    const priceMap = new Map(
      priceData.map((item: any) => [item.symbol, parseFloat(item.price)])
    );

    const coins = tickerData
      .filter((item: any) => item.symbol.endsWith("USDT"))
      .map((item: any) => {
        const price = parseFloat(item.lastPrice);
        const volume = parseFloat(item.volume);
        return {
          symbol: item.symbol,
          price: price,
          change24h: parseFloat(item.priceChangePercent),
          volume24h: volume,
          highPrice: parseFloat(item.highPrice),
          lowPrice: parseFloat(item.lowPrice),
          marketCap: price * volume, // This is an approximation
          logo: (cryptoLogos as any)[item.symbol.replace("USDT", "")] || "",
        };
      })
      .filter((coin: Coin) => coin.marketCap >= 1000000) // Filter coins with market cap >= 100 million
      .sort((a: Coin, b: Coin) => b.marketCap - a.marketCap); // Sort by market cap descending

    return coins;
  } catch (error) {
    console.error("Error fetching data from Binance API:", error);
    return [];
  }
};

export const fetchHotCoins = async (): Promise<Coin[]> => {
  const allCoins = await fetchTickerData();
  const hotSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
  return allCoins.filter((coin) => hotSymbols.includes(coin.symbol));
};

export const fetchNewListings = async (): Promise<Coin[]> => {
  const newSymbols = ["NOTUSDT", "ZKUSDT", "LISTAUSDT"];
  const allCoins = await fetchTickerData();
  return allCoins.filter((coin) => newSymbols.includes(coin.symbol));
};

export const fetchTopVolumeCoins = async (limit: number): Promise<Coin[]> => {
  const allCoins = await fetchTickerData();
  return allCoins.sort((a, b) => b.volume24h - a.volume24h).slice(0, limit);
};

export const fetchGlobalMarketChange = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/24hr"
    );
    const globalMarketData = response.data.find(
      (ticker: any) =>
        ticker.symbol === "TOTAL" && ticker.priceChangePercent !== undefined
    );

    if (globalMarketData) {
      return parseFloat(globalMarketData.priceChangePercent);
    } else {
      throw new Error("Global market data not found");
    }
  } catch (error) {
    console.error("Error fetching global market change:", error);
    // Placeholder value for API until issue is resolved
    return 2;
  }
};
