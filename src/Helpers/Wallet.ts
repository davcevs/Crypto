// Helpers/Wallet.ts
export interface Wallet {
  userId: string;
  walletId: string;
  balance: number;
  cryptoAmounts: { [key: string]: number };
  transactions: Transaction[];
}

export interface Transaction {
  date: string;
  type: string;
  cryptoSymbol: string;
  amount: number;
  price: number;
}
