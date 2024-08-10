// OrderForm.tsx
import React, { useState } from "react";
import { buyCrypto, sellCrypto } from "../Logic/WalletLogic";
import { User } from "../Types/types";
import { Wallet } from "../Helpers/Wallet";

interface OrderFormProps {
  symbol: string;
  currentUser: User;
  onOrderPlaced: () => void;
  wallet: Wallet | null;
}

const OrderForm = ({
  symbol,
  currentUser,
  onOrderPlaced,
  wallet,
}: OrderFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseFloat(amount);
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!wallet) {
      alert("Wallet not found");
      return;
    }

    let success = false;
    if (orderType === "buy") {
      success = await buyCrypto(currentUser, symbol, quantity);
    } else {
      success = await sellCrypto(currentUser, symbol, quantity);
    }

    if (success) {
      alert(`${orderType.toUpperCase()} order placed successfully`);
      setAmount("");
      onOrderPlaced();
    } else {
      alert(`Failed to place ${orderType} order`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded">
      <h3 className="text-xl font-semibold mb-2">Place Order</h3>
      <div className="mb-4">
        <label className="block mb-2">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as "buy" | "sell")}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Enter amount"
        />
      </div>
      <button
        type="submit"
        className={`w-full p-2 rounded ${
          orderType === "buy" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {orderType.toUpperCase()} {symbol}
      </button>
    </form>
  );
};

export default OrderForm;
