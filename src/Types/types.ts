// types.ts
export interface Coin {
  symbol: string;
  price: number;
  change24h: number;
  volume24h?: number;
  highPrice?: number;
  lowPrice?: number;
  marketCap?: number;
  prevPrice?: number;
  logo?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  walletId: string;
}
