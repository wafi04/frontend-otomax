import { useState, useEffect } from "react";
import { User, useUserActions, UpdateUserRequest } from "../hooks/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { FormUpdateUser } from "./form";

interface DialogEditUserProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogEditUser({
  user,
  open,
  onOpenChange,
}: DialogEditUserProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit User
          </DialogTitle>
          <DialogDescription>
            Update user information and permissions. Changes will be saved
            immediately.
          </DialogDescription>
        </DialogHeader>
        <FormUpdateUser
          user={user}
          // onSuccess={() => onOpenChange(false)} // Close dialog setelah berhasil update
        />
      </DialogContent>
    </Dialog>
  );
}
