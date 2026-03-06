import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import type { Category } from "../types";
import { formatCurrency, getBudgetStatus } from "../lib/calculations";

interface BudgetCardProps {
  category: Category;
  spent: number;
  limit: number;
  onEdit: (category: Category, currentLimit: number) => void;
}

export function BudgetCard({
  category,
  spent,
  limit,
  onEdit,
}: BudgetCardProps) {
  const { percentage, status } = getBudgetStatus(spent, limit);

  const remaining = limit - spent;

  const statusColors = {
    safe: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const badgeVariants = {
    safe: "default",
    warning: "secondary",
    danger: "destructive",
  } as const;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{category}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onEdit(category, limit)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className="font-medium">{formatCurrency(spent)}</span>
        </div>
        <div className="relative">
          <Progress value={Math.min(percentage, 100)} className="h-2" />
          <div
            className={`absolute top-0 left-0 h-2 rounded-full transition-all ${statusColors[status]}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Budget: {formatCurrency(limit)}
          </div>
          <Badge variant={badgeVariants[status]} className="text-xs">
            {remaining >= 0
              ? formatCurrency(remaining)
              : `-${formatCurrency(Math.abs(remaining))}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
