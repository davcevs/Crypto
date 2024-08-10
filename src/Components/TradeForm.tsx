import React, { useState, useEffect } from "react";
import { Wallet } from "../Helpers/Wallet";
import { fetchCryptoPriceFromAPI } from "../Logic/WalletLogic";
import { User } from "../Types/types";

interface TradeFormProps {
  currentUser: User;
  onTrade: (type: "buy" | "sell", amount: number, price: number) => void;
  wallet: Wallet | null;
  symbol: string;
}

const TradeForm: React.FC<TradeFormProps> = ({
  currentUser,
  onTrade,
  wallet,
  symbol,
}) => {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const fetchedPrice = await fetchCryptoPriceFromAPI(symbol);
      setCurrentPrice(fetchedPrice || null);
      setPrice(fetchedPrice ? fetchedPrice.toFixed(2) : "");
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  // Calculate max amount user can buy or sell based on wallet balance and crypto holdings
  const maxAmount =
    tradeType === "buy"
      ? wallet
        ? wallet.balance / parseFloat(price || "0")
        : 0
      : wallet
      ? wallet.cryptoAmounts[symbol.replace("USDT", "")] || 0
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrade(tradeType, parseFloat(amount), parseFloat(price));
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-5">
      <div className="w-1/2 pr-2">
        <div className="mb-2">
          <label className="block mb-1 text-xs">Avbl - USDT</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-1 bg-gray-700 rounded text-sm text-black"
            placeholder="Price"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-xs">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-1 bg-gray-700 rounded text-sm text-black"
            placeholder="Amount"
            max={maxAmount}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Max Buy: {maxAmount.toFixed(6)} BTC</span>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded bg-green-500 hover:bg-green-600 text-sm"
        >
          Buy BTC
        </button>
      </div>
      <div className="w-1/2 pl-2">
        <div className="mb-2">
          <label className="block mb-1 text-xs">Avbl - BTC</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-1 bg-gray-700 rounded text-sm text-black"
            placeholder="Price"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-xs">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-1 bg-gray-700 rounded text-sm text-black"
            placeholder="Amount"
            max={maxAmount}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Max Sell: {maxAmount.toFixed(6)} BTC</span>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded bg-red-500 hover:bg-red-600 text-sm"
        >
          Sell BTC
        </button>
      </div>
    </form>
  );
};

export default TradeForm;
