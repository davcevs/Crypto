// RegisterLogic.ts
import { v4 as uuidv4 } from "uuid";
import { User } from "./../Types/types";
import { Wallet } from "./../Helpers/Wallet";

export const createAccount = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  if (users.some((user) => user.email === email)) {
    return false;
  }

  const newUser: User = {
    id: uuidv4(),
    email,
    password,
    walletId: uuidv4(),
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Initialize wallet for the new user
  const initialWallet: Wallet = {
    userId: newUser.id,
    walletId: newUser.walletId,
    balance: 100000, // Starting with $100,000
    cryptoAmounts: {},
    transactions: [],
  };
  localStorage.setItem(
    `wallet_${newUser.walletId}`,
    JSON.stringify(initialWallet)
  );

  console.log(`User ID: ${newUser.id}, Wallet ID: ${newUser.walletId}`);

  return true;
};

export const signIn = (email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  return null;
};

export const getPreviousURL = (): string => {
  return localStorage.getItem("previousURL") || "/";
};

export const clearPreviousURL = (): void => {
  localStorage.removeItem("previousURL");
};
