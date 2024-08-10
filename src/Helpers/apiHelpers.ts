// apiHelper.ts

export const fetchCoinData = async () => {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const filteredData = data.filter((item) =>
      [
        "BTCUSDT",
        "ETHUSDT",
        "BNBUSDT",
        "DOGEUSDT",
        "SOLUSDT",
        "ADAUSDT",
        "LTCUSDT",
        "XRPUSDT",
      ].includes(item.symbol)
    );
    return filteredData.map((item) => ({
      symbol: item.symbol.replace("USDT", ""),
      price: item.lastPrice,
      priceChangePercent: item.priceChangePercent,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const startDataFetchingInterval = (
  callback: () => void,
  intervalTime: number
) => {
  callback();

  const interval = setInterval(callback, intervalTime);

  return () => clearInterval(interval);
};
