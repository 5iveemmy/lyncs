import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Category } from "../types";

interface EditBudgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  currentLimit: number;
  onSave: (category: Category, limit: number) => void;
}

export function EditBudgetDialog({
  isOpen,
  onClose,
  category,
  currentLimit,
  onSave,
}: EditBudgetDialogProps) {
  const [limit, setLimit] = useState(currentLimit.toString());

  useEffect(() => {
    setLimit(currentLimit.toString());
  }, [currentLimit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    const newLimit = parseFloat(limit);
    if (newLimit > 0) {
      onSave(category, newLimit);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-96">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              Update the monthly budget limit for {category}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="limit">Monthly Limit</Label>
              <Input
                id="limit"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
