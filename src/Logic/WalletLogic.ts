// WalletLogic.ts
import { User } from "./../Types/types";
import { Wallet, Transaction } from "../Helpers/Wallet";

const API_BASE_URL = "https://api.binance.com/api/v3";

// In WalletLogic.ts
export const getWallet = (user: User): Wallet | null => {
  if (!user) {
    console.log("No user provided to getWallet");
    return null;
  }

  const walletData = localStorage.getItem(`wallet_${user.walletId}`);
  console.log("Raw wallet data from localStorage:", walletData);

  if (!walletData) {
    console.log("No wallet data found in localStorage");
    return null;
  }

  try {
    const wallet: Wallet = JSON.parse(walletData);
    console.log("Parsed wallet data:", wallet);
    return wallet;
  } catch (error) {
    console.error("Error parsing wallet data:", error);
    return null;
  }
};

export const initializeWallet = (user: User): Wallet => {
  const newWallet: Wallet = {
    userId: user.id,
    walletId: user.walletId,
    balance: 1000, // Starting balance, adjust as needed
    cryptoAmounts: {},
    transactions: [],
  };

  localStorage.setItem(`wallet_${user.walletId}`, JSON.stringify(newWallet));
  return newWallet;
};

export const updateWallet = (wallet: Wallet): void => {
  localStorage.setItem(`wallet_${wallet.walletId}`, JSON.stringify(wallet));
};

export const fetchCryptoPriceFromAPI = async (
  cryptoSymbol: string
): Promise<number | undefined> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ticker/price?symbol=${cryptoSymbol.toUpperCase()}USDT`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch price");
    }
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error(
      `Failed to fetch price for ${cryptoSymbol}: ${error.message}`
    );
    return undefined;
  }
};

export const buyCrypto = async (
  user: User,
  cryptoSymbol: string,
  quantity: number
): Promise<boolean> => {
  const currentPrice = await fetchCryptoPriceFromAPI(cryptoSymbol);
  if (currentPrice === undefined) return false;

  const totalCost = currentPrice * quantity;
  const wallet = getWallet(user);
  if (!wallet || wallet.balance < totalCost) return false;

  const updatedCryptoAmounts = {
    ...wallet.cryptoAmounts,
    [cryptoSymbol]: (wallet.cryptoAmounts[cryptoSymbol] || 0) + quantity,
  };
  const updatedBalance = wallet.balance - totalCost;
  const newTransaction: Transaction = {
    date: new Date().toISOString(),
    type: "buy",
    cryptoSymbol,
    amount: quantity,
    price: currentPrice,
  };
  const updatedWallet = {
    ...wallet,
    balance: updatedBalance,
    cryptoAmounts: updatedCryptoAmounts,
    transactions: [...wallet.transactions, newTransaction],
  };
  updateWallet(updatedWallet);
  return true;
};

export const sellCrypto = async (
  user: User,
  cryptoSymbol: string,
  quantity: number
): Promise<boolean> => {
  const currentPrice = await fetchCryptoPriceFromAPI(cryptoSymbol);
  if (currentPrice === undefined) return false;

  const wallet = getWallet(user);
  if (!wallet || (wallet.cryptoAmounts[cryptoSymbol] || 0) < quantity)
    return false;

  const totalValue = currentPrice * quantity;
  const updatedCryptoAmounts = {
    ...wallet.cryptoAmounts,
    [cryptoSymbol]: wallet.cryptoAmounts[cryptoSymbol] - quantity,
  };
  const updatedBalance = wallet.balance + totalValue;
  const newTransaction: Transaction = {
    date: new Date().toISOString(),
    type: "sell",
    cryptoSymbol,
    amount: quantity,
    price: currentPrice,
  };
  const updatedWallet = {
    ...wallet,
    balance: updatedBalance,
    cryptoAmounts: updatedCryptoAmounts,
    transactions: [...wallet.transactions, newTransaction],
  };
  updateWallet(updatedWallet);
  return true;
};

export const sendCrypto = (
  fromUser: User,
  toEmail: string,
  cryptoSymbol: string,
  amount: number
): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
  const toUser = users.find((user) => user.email === toEmail);

  if (!toUser) return false;

  const fromWallet = getWallet(fromUser);
  const toWallet = getWallet(toUser);

  if (
    !fromWallet ||
    !toWallet ||
    (fromWallet.cryptoAmounts[cryptoSymbol] || 0) < amount
  )
    return false;

  // Update sender's wallet
  const updatedFromCryptoAmounts = {
    ...fromWallet.cryptoAmounts,
    [cryptoSymbol]: (fromWallet.cryptoAmounts[cryptoSymbol] || 0) - amount,
  };
  const fromTransaction: Transaction = {
    date: new Date().toISOString(),
    type: "send",
    cryptoSymbol,
    amount,
    price: 0, // Price not relevant for sending
  };
  const updatedFromWallet = {
    ...fromWallet,
    cryptoAmounts: updatedFromCryptoAmounts,
    transactions: [...fromWallet.transactions, fromTransaction],
  };

  // Update recipient's wallet
  const updatedToCryptoAmounts = {
    ...toWallet.cryptoAmounts,
    [cryptoSymbol]: (toWallet.cryptoAmounts[cryptoSymbol] || 0) + amount,
  };
  const toTransaction: Transaction = {
    date: new Date().toISOString(),
    type: "receive",
    cryptoSymbol,
    amount,
    price: 0, // Price not relevant for receiving
  };
  const updatedToWallet = {
    ...toWallet,
    cryptoAmounts: updatedToCryptoAmounts,
    transactions: [...toWallet.transactions, toTransaction],
  };

  updateWallet(updatedFromWallet);
  updateWallet(updatedToWallet);
  return true;
};

export const getAvailableCoins = (): string[] => {
  return ["BTC", "ETH"];
};

export const calculateTotalWalletValue = async (
  wallet: Wallet
): Promise<number> => {
  let total = wallet.balance;
  for (const [symbol, amount] of Object.entries(wallet.cryptoAmounts)) {
    const price = await fetchCryptoPriceFromAPI(symbol);
    if (price) {
      total += price * amount;
    }
  }
  return total;
};
