import { useState, useEffect } from "react";
import HotCoins from "./../Components/HotCoins";
import CoinTable from "./../Components/CoinTable";
import { Coin } from "./../Types/types";
import {
  fetchHotCoins,
  fetchNewListings,
  fetchTopVolumeCoins,
  fetchTickerData,
  fetchGlobalMarketChange,
} from "./../Helpers/api";

const COINS_PER_PAGE = 25;

const Markets = () => {
  const [hotCoins, setHotCoins] = useState<Coin[]>([]);
  const [newListings, setNewListings] = useState<Coin[]>([]);
  const [topVolumeCoins, setTopVolumeCoins] = useState<Coin[]>([]);
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [globalMarketChange, setGlobalMarketChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [hot, newList, topVolume, all, marketChange] = await Promise.all([
        fetchHotCoins(),
        fetchNewListings(),
        fetchTopVolumeCoins(3),
        fetchTickerData(),
        fetchGlobalMarketChange(),
      ]);

      setHotCoins((prevCoins) => updatePrevPrices(hot, prevCoins));
      setNewListings((prevCoins) => updatePrevPrices(newList, prevCoins));
      setTopVolumeCoins((prevCoins) => updatePrevPrices(topVolume, prevCoins));
      setAllCoins((prevCoins) => updatePrevPrices(all, prevCoins));
      setFilteredCoins((prevCoins) => updatePrevPrices(all, prevCoins));
      setGlobalMarketChange(marketChange);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = allCoins.filter((coin) =>
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
    setCurrentPage(1);
  }, [searchTerm, allCoins]);

  const updatePrevPrices = (newCoins: Coin[], prevCoins: Coin[]): Coin[] => {
    return newCoins.map((coin) => ({
      ...coin,
      prevPrice: prevCoins.find((c) => c.symbol === coin.symbol)?.price,
    }));
  };

  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * COINS_PER_PAGE,
    currentPage * COINS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredCoins.length / COINS_PER_PAGE);

  return (
    <div className="bg-gray-900 text-white p-4 w-[75%] m-auto">
      <h1 className="text-6xl font-extralight mb-4 text-center">
        Explore the crypto market
      </h1>
      <p className="mb-4 text-center text-md font-extralight text-yellow-500">
        In the past 24 hours the market is
        <span
          className={
            globalMarketChange >= 0 ? "text-green-500" : "text-red-500"
          }
        >
          {" "}
          {globalMarketChange >= 0 ? "↑" : "↓"}{" "}
          {Math.abs(globalMarketChange).toFixed(2)}%
        </span>
      </p>
      <div className="mb-20 text-center">
        <input
          type="text"
          placeholder="Search for a coin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/6 p-2 rounded bg-gray-800 text-black"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray rounded-md">
          <HotCoins title="Hot Coins" coins={hotCoins} />
        </div>
        <div className="border border-gray rounded-md">
          <HotCoins title="New Listing" coins={newListings} />
        </div>
        <div className="border border-gray rounded-md">
          <HotCoins title="Top Volume Coins" coins={topVolumeCoins} />
        </div>
      </div>
      <CoinTable coins={paginatedCoins} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="bg-black-500 border-white border-2 rounded-md px-4 py-2 text-white hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="bg-black-500 border-white border-2 rounded-md px-4 py-2 text-white hover:bg-gray-700 transform hover:scale-105 duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Markets;
