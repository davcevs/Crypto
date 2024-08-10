// WalletComponent.tsx

import { useState, useEffect } from "react";
import { User, Coin } from "./../Types/types";
import {
  getWallet,
  updateWallet,
  fetchCryptoPriceFromAPI,
  buyCrypto,
  sellCrypto,
  sendCrypto,
  initializeWallet,
  calculateTotalWalletValue,
} from "../Logic/WalletLogic";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import WalletOverview from "./WalletOverview";
import TransactionHistory from "./TransactionHistory";
import { Wallet } from "../Helpers/Wallet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const QUICK_BUY_COINS = ["BTC", "ETH"];

const WalletComponent = ({ currentUser }: { currentUser: User }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [cryptoSymbol, setCryptoSymbol] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendCryptoSymbol, setSendCryptoSymbol] = useState<string>("BTC");
  const [walletValue, setWalletValue] = useState<number[]>([]);
  const [alertThreshold, setAlertThreshold] = useState<number>(0);
  const [quickBuyCoins, setQuickBuyCoins] = useState<Coin[]>([]);
  const [valueChange, setValueChange] = useState<number>(0);

  useEffect(() => {
    const fetchWallet = () => {
      let walletData = getWallet(currentUser);
      if (!walletData) {
        walletData = initializeWallet(currentUser);
      }
      console.log("Fetched wallet data:", walletData);
      setWallet(walletData);
    };
    fetchWallet();
  }, [currentUser]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (wallet) {
        const totalValue = await calculateTotalWalletValue(wallet);
        setWalletValue((prev) => {
          const newValue = [...prev, totalValue].slice(-30);
          console.log("Updated wallet value:", newValue);
          if (prev.length > 0) {
            const previousValue = prev[prev.length - 1];
            const change = ((totalValue - previousValue) / previousValue) * 100;
            setValueChange(change);
          }
          return newValue;
        });
        checkAlertThreshold(totalValue);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [wallet]);

  useEffect(() => {
    const fetchQuickBuyPrices = async () => {
      const updatedCoins = await Promise.all(
        QUICK_BUY_COINS.map(async (symbol) => {
          const price = await fetchCryptoPriceFromAPI(symbol);
          return { symbol, price: price || 0, change24h: 0 };
        })
      );
      setQuickBuyCoins(updatedCoins);
    };

    fetchQuickBuyPrices();
    const interval = setInterval(fetchQuickBuyPrices, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkAlertThreshold = (totalValue: number) => {
    if (alertThreshold > 0 && totalValue >= alertThreshold) {
      alert(`Your wallet value has reached $${totalValue.toFixed(2)}!`);
    }
  };

  const handleBuyCrypto = async () => {
    if (!cryptoSymbol || quantity <= 0) return;
    const buyResult = await buyCrypto(
      currentUser,
      cryptoSymbol.toUpperCase(),
      quantity
    );
    setTransactionStatus(
      buyResult
        ? "Purchase successful!"
        : "Purchase failed. Insufficient balance or API error."
    );
    setCryptoSymbol("");
    setQuantity(0);
    refreshWallet();
  };

  const handleSellCrypto = async () => {
    if (!cryptoSymbol || quantity <= 0) return;
    const sellResult = await sellCrypto(
      currentUser,
      cryptoSymbol.toUpperCase(),
      quantity
    );
    setTransactionStatus(
      sellResult
        ? "Sale successful!"
        : "Sale failed. Insufficient crypto amount or API error."
    );
    setCryptoSymbol("");
    setQuantity(0);
    refreshWallet();
  };

  const handleSendCrypto = async () => {
    if (!sendCryptoSymbol || sendAmount <= 0 || !recipientEmail) return;
    const sendResult = sendCrypto(
      currentUser,
      recipientEmail,
      sendCryptoSymbol.toUpperCase(),
      sendAmount
    );
    setTransactionStatus(
      sendResult
        ? `Successfully sent ${sendAmount} ${sendCryptoSymbol} to ${recipientEmail}`
        : "Failed to send crypto. Check recipient email and your balance."
    );
    setSendCryptoSymbol("BTC");
    setSendAmount(0);
    setRecipientEmail("");
    refreshWallet();
  };

  const refreshWallet = () => {
    const updatedWallet = getWallet(currentUser);
    if (updatedWallet) {
      setWallet(updatedWallet);
    }
  };

  const chartData = {
    labels: Array.from(
      { length: walletValue.length },
      (_, i) => `${i + 1}m ago`
    ),
    datasets: [
      {
        label: "Wallet Value",
        data: walletValue,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex bg-gray-100 ">
      <nav className="bg-gray-900 p-4 shadow-lg w-1/6">
        <h2 className="text-white text-2xl font-bold mb-4">Crypto Wallet</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Assets
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Orders
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Rewards Hub
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Referral
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Account
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Sub Accounts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 rounded transition-all duration-200 ease-in-out block py-2 px-2"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-4 bg-gray-100">
        {wallet ? (
          <>
            <WalletOverview
              wallet={wallet}
              walletValue={walletValue[walletValue.length - 1] || 0}
              valueChange={valueChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ">
                <h3 className="text-xl font-semibold mb-4">Quick Buy</h3>
                {quickBuyCoins.map((coin) => (
                  <div key={coin.symbol} className="mb-4">
                    <p className="text-lg font-medium">{coin.symbol}</p>
                    <p className="text-gray-500">
                      Price: ${coin.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => {
                        setCryptoSymbol(coin.symbol);
                        setQuantity(1); // Example: Quick buy 1 unit
                        handleBuyCrypto();
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-semibold mb-4">Buy/Sell Crypto</h3>
                <input
                  type="text"
                  value={cryptoSymbol}
                  onChange={(e) => setCryptoSymbol(e.target.value)}
                  placeholder="Crypto Symbol"
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value))}
                  placeholder="Quantity"
                  className="border p-2 w-full mb-4"
                />
                <button
                  onClick={handleBuyCrypto}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Buy
                </button>
                <button
                  onClick={handleSellCrypto}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Sell
                </button>
                {transactionStatus && (
                  <p className="text-red-500 mt-4">{transactionStatus}</p>
                )}
              </div>
              <div className="md:col-span-3 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-semibold mb-4">Send Crypto</h3>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Recipient Email"
                  className="border p-2 w-full mb-4"
                />
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(parseFloat(e.target.value))}
                  placeholder="Amount"
                  className="border p-2 w-full mb-4"
                />
                <select
                  value={sendCryptoSymbol}
                  onChange={(e) => setSendCryptoSymbol(e.target.value)}
                  className="border p-2 w-full mb-4"
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  {/* Add other supported crypto symbols as needed */}
                </select>
                <button
                  onClick={handleSendCrypto}
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
                {transactionStatus && (
                  <p className="text-red-500 mt-4">{transactionStatus}</p>
                )}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-4">
              <h3 className="text-xl font-semibold mb-4">Wallet Value Chart</h3>
              <Line data={chartData} />
            </div>
            <div className=" p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Transaction History
              </h3>
              <TransactionHistory wallet={wallet} />
            </div>
          </>
        ) : (
          <p>Loading wallet data...</p>
        )}
      </div>
    </div>
  );
};

export default WalletComponent;
