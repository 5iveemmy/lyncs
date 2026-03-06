import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "../lib/calculations";

interface StatsCardProps {
  title: string;
  amount: number;
  type: "income" | "expense" | "balance";
  className?: string;
}

export function StatsCard({ title, amount, type, className }: StatsCardProps) {
  const Icon =
    type === "income" ? TrendingUp : type === "expense" ? TrendingDown : Wallet;

  const colorClass =
    type === "income"
      ? "text-green-600 dark:text-green-400"
      : type === "expense"
        ? "text-red-600 dark:text-red-400"
        : amount >= 0
          ? "text-blue-600 dark:text-blue-400"
          : "text-red-600 dark:text-red-400";

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>
          {formatCurrency(Math.abs(amount))}
        </div>
      </CardContent>
    </Card>
  );
}
