// topCryptoMovers.ts

// Function to fetch data from Binance API
async function fetchTopCryptoMovers(): Promise<any[]> {
  const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await response.json();
  return data;
}

// Function to filter and format data for Top Crypto Movers
export async function getTopCryptoMovers(): Promise<any[]> {
  try {
    const data = await fetchTopCryptoMovers();

    // Filter only relevant information for top movers
    const topMovers = data
      .map((item) => ({
        symbol: item.symbol,
        price: parseFloat(item.lastPrice).toFixed(2),
        percentChange: parseFloat(item.priceChangePercent).toFixed(2),
      }))
      .filter((item) => !isNaN(item.percentChange))
      .sort((a, b) => b.percentChange - a.percentChange)
      .slice(0, 10);

    return topMovers;
  } catch (error) {
    console.error("Error fetching top crypto movers:", error);
    return [];
  }
}
