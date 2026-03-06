import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Transaction, Category } from "../types";
import { calculateCategoryTotal } from "../lib/calculations";

interface SpendingChartProps {
  transactions: Transaction[];
}

const expenseCategories: Category[] = [
  "Housing",
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
];

const categoryColors: Record<Category, string> = {
  Housing: "bg-blue-500",
  Food: "bg-green-500",
  Transportation: "bg-purple-500",
  Entertainment: "bg-pink-500",
  Utilities: "bg-yellow-500",
  Income: "bg-emerald-500",
};

export function SpendingChart({ transactions }: SpendingChartProps) {
  const categoryData = expenseCategories.map((category) => ({
    category,
    amount: calculateCategoryTotal(transactions, category),
  }));

  const maxAmount = Math.max(...categoryData.map((d) => d.amount), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categoryData.map(({ category, amount }) => {
          const percentage = (amount / maxAmount) * 100;

          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category}</span>
                <span className="text-muted-foreground">
                  ${amount.toFixed(0)}
                </span>
              </div>
              <div className="relative h-8 bg-secondary rounded-md overflow-hidden">
                <div
                  className={`h-full ${categoryColors[category]} transition-all duration-500 ease-out flex items-center justify-end px-3`}
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 15 && (
                    <span className="text-xs font-medium text-white">
                      {percentage.toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
