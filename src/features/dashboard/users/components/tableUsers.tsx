import React, { useState, useEffect, useCallback } from "react";
import { Save, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "../hooks/server";

interface UsersTableProps {
  users: User[];
  onUpdate?: (id: string | number, data: Partial<User>) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  isLoading?: boolean;
}

export default function UsersTable({
  users = [],
  onUpdate,
  onDelete,
  isLoading = false,
}: UsersTableProps) {
  const [formData, setFormData] = useState<User[]>([]);
  const [dirtyRows, setDirtyRows] = useState<Record<string | number, boolean>>(
    {}
  );
  const [expandedRows, setExpandedRows] = useState<
    Record<string | number, boolean>
  >({});

  useEffect(() => {
    setFormData([...users]);
    setDirtyRows({});
    setExpandedRows({});
  }, [users]);

  const handleInputChange = useCallback(
    (index: number, field: keyof User, value: any) => {
      setFormData((prev) => {
        const updated = [...prev];
        if (updated[index][field] === value) return prev;

        updated[index] = { ...updated[index], [field]: value };
        const rowId = updated[index].id;
        setDirtyRows((prevDirty) => ({
          ...prevDirty,
          [rowId]: true,
        }));
        return updated;
      });
    },
    []
  );

  const saveRow = async (user: User) => {
    if (onUpdate && user?.id && !String(user.id).startsWith("new_")) {
      try {
        await onUpdate(user.id, user);
        setDirtyRows((prev) => ({
          ...prev,
          [user.id]: false,
        }));
      } catch (error) {
        console.error("Save failed:", error);
      }
    }
  };

  const deleteRow = async (index: number) => {
    const user = formData[index];
    if (confirm(`Delete "${user.name}"?`)) {
      try {
        if (!String(user.id).startsWith("new_") && onDelete) {
          await onDelete(user.id);
        }
        setFormData((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const toggleExpand = (id: string | number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}

      {/* Header */}
      <div className="border rounded-t-lg">
        <div className="grid grid-cols-12 text-sm font-medium border-b">
          <div className="col-span-3 px-3 py-2">Name</div>
          <div className="col-span-2 px-3 py-2">Username</div>
          <div className="col-span-3 px-3 py-2">Roles</div>
          <div className="col-span-2 px-3 py-2">Email</div>
          <div className="col-span-2 px-3 py-2">Actions</div>
        </div>
      </div>

      {/* Body */}
      <div className="border border-t-0">
        {formData.map((user, index) => (
          <React.Fragment key={user.id}>
            <div className="grid grid-cols-12 items-center text-sm border-b">
              <div className="col-span-3 px-3 py-2">
                <Input
                  className="h-9"
                  value={user.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2 px-3 py-2">
                <p>{user.username}</p>
              </div>
              <div className="col-span-3 px-3 py-2">
                <Select
                  value={user.roles}
                  onValueChange={(value) =>
                    handleInputChange(index, "roles", value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 px-3 py-2">{user.email}</div>
              <div className="col-span-2 px-3 py-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleExpand(user.id)}
                >
                  {expandedRows[user.id] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteRow(index)}
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={
                    !dirtyRows[user.id] || String(user.id).startsWith("new_")
                  }
                  onClick={() => saveRow(user)}
                >
                  <Save size={16} />
                </Button>
              </div>
            </div>

            {expandedRows[user.id] && (
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-12 px-3 py-3">
                  <label className="block text-sm font-medium mb-1">
                    Details Users
                  </label>
                  <Textarea
                    className="w-full min-h-[120px]"
                    value={user.username}
                    onChange={(e) =>
                      handleInputChange(index, "username", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
