import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FromCategory } from "../form/form";
import { ReactNode } from "react";
import { useCategoryStore } from "../hooks/api";
import { Button } from "@/components/ui/button";
import { CategoryData } from "../form/category";

interface DialogCreateCategoryProps {
  initialData?: CategoryData;
  open: boolean;
  onClose: () => void;
}

export function DialogCreateCategory({
  initialData,
  open,
  onClose,
}: DialogCreateCategoryProps) {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Add Category</DialogDescription>
        </DialogHeader>
        <FromCategory initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}

export function DeleteDialogCategory({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const { deleteCategory } = useCategoryStore();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteCategory(id);
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
