// components/SpotTrading.tsx
import React from "react";
import { User } from "../Types/types";
import { useWallet } from "../Hooks/useWallet";
import CandlestickChart from "./CandlestickChart";
import OrderBook from "./OrderBook";
import TradeForm from "./TradeForm";
import MarketTrades from "./MarketTrades";
import WalletOverview from "./WalletOverview";
import TopCryptoPairs from "./TopCryptoPairs";
import TopMovers from "./TopMovers";
import { buyCrypto, sellCrypto } from "../Logic/WalletLogic";

interface SpotTradingProps {
  currentUser: User;
}

const SpotTrading: React.FC<SpotTradingProps> = ({ currentUser }) => {
  const { wallet, walletValue, valueChange, updateWalletState } =
    useWallet(currentUser);

  const [selectedSymbol, setSelectedSymbol] = React.useState("BTCUSDT");

  const handleTrade = async (
    type: "buy" | "sell",
    amount: number,
    price: number
  ) => {
    if (!wallet) return;

    const success =
      type === "buy"
        ? await buyCrypto(
            currentUser,
            selectedSymbol.replace("USDT", ""),
            amount / price
          )
        : await sellCrypto(
            currentUser,
            selectedSymbol.replace("USDT", ""),
            amount
          );

    if (success) {
      const updatedWallet = { ...wallet };
      if (type === "buy") {
        updatedWallet.balance -= amount;
        updatedWallet.cryptoAmounts[selectedSymbol.replace("USDT", "")] =
          (updatedWallet.cryptoAmounts[selectedSymbol.replace("USDT", "")] ||
            0) +
          amount / price;
      } else {
        updatedWallet.balance += amount * price;
        updatedWallet.cryptoAmounts[selectedSymbol.replace("USDT", "")] -=
          amount;
      }
      updateWalletState(updatedWallet);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen border border-[#474646]">
      <header className="bg-gray-800 p-2 flex justify-between items-center border-b border-[#474646]">
        <div className="flex items-center space-x-4">
          <span className="text-yellow-500">★</span>
          <span className="font-bold">{selectedSymbol}</span>
          <span className="text-red-500">-3.74%</span>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600">
            Spot Tutorial
          </button>
          <button className="bg-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-600">
            Spot Guidance
          </button>
        </div>
      </header>
      <main className="flex flex-col p-2 space-y-2 border m-auto border-[#474646]">
        <div className="flex space-x-2">
          <div className="w-3/4 m-auto border border-[#474646]">
            <CandlestickChart symbol={selectedSymbol} />
          </div>
          <div className="w-1/4 border border-[#474646]">
            <OrderBook symbol={selectedSymbol} />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-2/4 m-auto">
            <TradeForm
              currentUser={currentUser}
              onTrade={handleTrade}
              wallet={wallet}
              symbol={selectedSymbol}
            />
          </div>
          <div className="w-1/4 border border-[#474646] m-auto">
            <MarketTrades symbol={selectedSymbol} />
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 p-2 mt-2">
        <div className="flex justify-between border border-[#474646]">
          <TopCryptoPairs onSymbolSelect={setSelectedSymbol} />
          <TopMovers onSymbolSelect={setSelectedSymbol} />
          {wallet ? (
            <WalletOverview
              wallet={wallet}
              walletValue={walletValue}
              valueChange={valueChange}
            />
          ) : (
            <div>Loading wallet...</div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default SpotTrading;
