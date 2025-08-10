import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceData } from "../hooks/types";
import { FormProduct } from "../hooks/form";

interface DialogCreateCategoryProps {
  initialData?: ServiceData;
  open: boolean;
  onClose: () => void;
}

export function DialogCreateProduct({
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
        <FormProduct />
      </DialogContent>
    </Dialog>
  );
}

