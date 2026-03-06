export type TransactionType = "income" | "expense";

export type Category =
  | "Housing"
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Income";

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  type: TransactionType;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface FinanceData {
  transactions: Transaction[];
  budgets: Budget[];
}
