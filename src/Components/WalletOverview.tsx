// src/components/WalletOverview.tsx
import { Wallet } from "../Helpers/Wallet";

interface WalletOverviewProps {
  wallet: Wallet | null;
  walletValue: number;
  valueChange: number;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({
  wallet,
  walletValue,
  valueChange,
}) => {
  if (!wallet) {
    return <div>Loading wallet...</div>;
  }

  return (
    <div className="bg-gray-800 p-2 rounded text-white">
      <h2 className="text-lg font-bold mb-2">Wallet Overview</h2>
      <div className="space-y-2">
        <div>
          <span className="text-gray-400">Total Value:</span> $
          {walletValue.toFixed(2)}
        </div>
        <div>
          <span className="text-gray-400">24h Change:</span>{" "}
          <span
            className={valueChange >= 0 ? "text-green-500" : "text-red-500"}
          >
            {valueChange.toFixed(2)}%
          </span>
        </div>
        <div>
          <span className="text-gray-400">USD Balance:</span> $
          {wallet.balance.toFixed(2)}
        </div>
        <div>
          <h3 className="text-md font-bold">Crypto Holdings</h3>
          {Object.entries(wallet.cryptoAmounts).map(([crypto, amount]) => (
            <div key={crypto} className="flex justify-between">
              <span>{crypto}:</span>
              <span>{amount.toFixed(6)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;
