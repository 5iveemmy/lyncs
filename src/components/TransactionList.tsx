import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Transaction } from "../types";
import { formatCurrency, formatDate } from "../lib/calculations";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Housing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Food: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Transportation:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Entertainment:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Utilities:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Income:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
};

export function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first transaction to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="space-y-2">
      {sortedTransactions.map((transaction) => (
        <Card
          key={transaction.id}
          className="group hover:shadow-md transition-shadow"
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="secondary"
                  className={`${categoryColors[transaction.category]} border-0`}
                >
                  {transaction.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
              <p className="font-medium truncate">{transaction.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`text-lg font-bold ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(transaction.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
