import type { FinanceData, Transaction, Category } from "../types";

const STORAGE_KEY = "lyncs-finance-data";

const defaultData: FinanceData = {
  transactions: [],
  budgets: [
    { category: "Housing", limit: 1500 },
    { category: "Food", limit: 600 },
    { category: "Transportation", limit: 300 },
    { category: "Entertainment", limit: 200 },
    { category: "Utilities", limit: 150 },
  ],
};

export const loadData = (): FinanceData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
  return defaultData;
};

export const saveData = (data: FinanceData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const addTransaction = (transaction: Transaction): void => {
  const data = loadData();
  data.transactions.push(transaction);
  saveData(data);
};

export const deleteTransaction = (id: string): void => {
  const data = loadData();
  data.transactions = data.transactions.filter((t) => t.id !== id);
  saveData(data);
};

export const updateBudget = (category: Category, limit: number): void => {
  const data = loadData();
  const budgetIndex = data.budgets.findIndex((b) => b.category === category);
  if (budgetIndex !== -1) {
    data.budgets[budgetIndex].limit = limit;
  } else {
    data.budgets.push({ category, limit });
  }
  saveData(data);
};
