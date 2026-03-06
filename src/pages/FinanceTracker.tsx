import { useState, useEffect } from "react";
import { Wallet, Moon, Sun } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { AddTransaction } from "../components/AddTransaction";
import { TransactionList } from "../components/TransactionList";
import { BudgetCard } from "../components/BudgetCard";
import { SpendingChart } from "../components/SpendingChart";
import { EditBudgetDialog } from "../components/EditBudgetDialog";
import { Button } from "../components/ui/button";
import type { Transaction, Category } from "../types";
import {
  loadData,
  addTransaction,
  deleteTransaction,
  updateBudget,
} from "../lib/storage";
import {
  getCurrentMonth,
  filterByMonth,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateCategoryTotal,
} from "../lib/calculations";

export function FinanceTracker() {
  const [data, setData] = useState(() => loadData());
  const [currentMonth] = useState(getCurrentMonth());
  const [editingBudget, setEditingBudget] = useState<{
    category: Category;
    limit: number;
  } | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const monthTransactions = filterByMonth(data.transactions, currentMonth);
  const totalIncome = calculateTotalIncome(monthTransactions);
  const totalExpenses = calculateTotalExpenses(monthTransactions);
  const balance = calculateBalance(monthTransactions);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleAddTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    addTransaction(newTransaction);
    setData(loadData());
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    setData(loadData());
  };

  const handleUpdateBudget = (category: Category, limit: number) => {
    updateBudget(category, limit);
    setData(loadData());
    setEditingBudget(null);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base md:text-2xl font-bold">
                  Finance Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <AddTransaction onAdd={handleAddTransaction} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              title="Total Income"
              amount={totalIncome}
              type="income"
            />
            <StatsCard
              title="Total Expenses"
              amount={totalExpenses}
              type="expense"
            />
            <StatsCard title="Balance" amount={balance} type="balance" />
          </div>

          {/* Budget Cards */}
          <div>
            <h2 className="text-xl font-bold mb-4">Budget Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.budgets.map((budget) => (
                <BudgetCard
                  key={budget.category}
                  category={budget.category}
                  spent={calculateCategoryTotal(
                    monthTransactions,
                    budget.category,
                  )}
                  limit={budget.limit}
                  onEdit={(category, currentLimit) =>
                    setEditingBudget({ category, limit: currentLimit })
                  }
                />
              ))}
            </div>
          </div>

          {/* Visualization and Transactions */}
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SpendingChart transactions={monthTransactions} />
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <TransactionList
                  transactions={monthTransactions}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Budget Dialog */}
      <EditBudgetDialog
        isOpen={!!editingBudget}
        onClose={() => setEditingBudget(null)}
        category={editingBudget?.category || null}
        currentLimit={editingBudget?.limit || 0}
        onSave={handleUpdateBudget}
      />
    </div>
  );
}
