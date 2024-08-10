// TransactionHistory.tsx
import { Wallet, Transaction } from "../Helpers/Wallet";

interface TransactionHistoryProps {
  wallet: Wallet;
}

const TransactionHistory = ({ wallet }: TransactionHistoryProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded mt-4">
      <h3 className="text-xl  font-semibold mb-2 text-white">
        Transaction History
      </h3>
      <div className="max-h-60 overflow-y-auto">
        {wallet.transactions && wallet.transactions.length > 0 ? (
          wallet.transactions
            .slice()
            .reverse()
            .map((transaction: Transaction, index: number) => (
              <div key={index} className="mb-2 text-white">
                <p>{new Date(transaction.date).toLocaleString()}</p>
                <p>
                  {transaction.type.toUpperCase()} {transaction.amount}{" "}
                  {transaction.cryptoSymbol}
                </p>
                <p>Price: ${transaction.price.toFixed(2)}</p>
              </div>
            ))
        ) : (
          <p className="text-white">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
