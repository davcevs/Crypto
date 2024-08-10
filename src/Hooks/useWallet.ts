// Hooks/useWallet.ts
import { useState, useEffect } from "react";
import { Wallet } from "../Helpers/Wallet";
import { User } from "../Types/types";
import {
  getWallet,
  initializeWallet,
  updateWallet,
  fetchCryptoPriceFromAPI,
} from "../Logic/WalletLogic";

export const useWallet = (currentUser: User) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [walletValue, setWalletValue] = useState<number>(0);
  const [valueChange, setValueChange] = useState<number>(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        let walletData = getWallet(currentUser);
        if (!walletData) {
          walletData = initializeWallet(currentUser);
        }
        setWallet(walletData);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
    const interval = setInterval(fetchWalletData, 5000);

    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const calculateWalletValue = async () => {
      try {
        if (wallet) {
          let total = wallet.balance;
          for (const [symbol, amount] of Object.entries(wallet.cryptoAmounts)) {
            const price = await fetchCryptoPriceFromAPI(symbol);
            if (price) {
              total += price * amount;
            }
          }
          setWalletValue((prevValue) => {
            const change =
              prevValue === 0 ? 0 : ((total - prevValue) / prevValue) * 100;
            setValueChange(change);
            return total;
          });
        }
      } catch (error) {
        console.error("Error calculating wallet value:", error);
      }
    };

    calculateWalletValue();
    const interval = setInterval(calculateWalletValue, 5000);

    return () => clearInterval(interval);
  }, [wallet]);

  const updateWalletState = (newWallet: Wallet) => {
    try {
      setWallet(newWallet);
      updateWallet(newWallet);
    } catch (error) {
      console.error("Error updating wallet state:", error);
    }
  };

  return { wallet, walletValue, valueChange, updateWalletState };
};
