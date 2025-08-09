import React, { useState, useEffect, useCallback } from "react";
import { Plus, Save, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { ServiceData } from "../hooks/types";
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

interface ProductsTableProps {
  products: ServiceData[];
  onUpdate?: (id: string | number, data: Partial<ServiceData>) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductsTable({
  products = [],
  onUpdate,
  onDelete,
  isLoading = false,
}: ProductsTableProps) {
  const [formData, setFormData] = useState<ServiceData[]>([]);
  const [dirtyRows, setDirtyRows] = useState<Record<string | number, boolean>>(
    {}
  );
  const [expandedRows, setExpandedRows] = useState<
    Record<string | number, boolean>
  >({});

  useEffect(() => {
    setFormData([...products]);
    setDirtyRows({});
    setExpandedRows({});
  }, [products]);

  const handleInputChange = useCallback(
    (index: number, field: keyof ServiceData, value: any) => {
      setFormData((prev) => {
        const updated = [...prev];
        if (updated[index][field] === value) return prev;

        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
      setDirtyRows((prev) => ({
        ...prev,
        [formData[index].id]: true,
      }));
    },
    [formData]
  );

  const saveRow = async (product: ServiceData) => {
    if (onUpdate && product?.id && !String(product.id).startsWith("new_")) {
      try {
        await onUpdate(product.id, product);
        setDirtyRows((prev) => ({
          ...prev,
          [product.id]: false,
        }));
      } catch (error) {
        console.error("Save failed:", error);
      }
    }
  };



  const deleteRow = async (index: number) => {
    const product = formData[index];
    if (confirm(`Delete "${product.name}"?`)) {
      try {
        if (!String(product.id).startsWith("new_") && onDelete) {
          await onDelete(product.id);
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
      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 " />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}
      {/* Header */}
      <div className="border rounded-t-lg">
        <div className="grid grid-cols-12 text-sm font-medium border-b">
          <div className="col-span-3 px-3 py-2">Name</div>
          <div className="col-span-1 px-3 py-2">Price</div>
          <div className="col-span-4 px-3 py-2">Description</div>
          <div className="col-span-1 px-3 py-2">Status</div>
          <div className="col-span-1 px-3 py-2">Category</div>
          <div className="col-span-2 px-3 py-2">Actions</div>
        </div>
      </div>

      {/* Body */}
      <div className="border  border-t-0">
        {formData.map((product, index) => (
          <React.Fragment key={product.id}>
            <div className="grid grid-cols-12 items-center text-sm border-b ">
              {/* Name */}
              <div className="col-span-3 px-3 py-2">
                <Input
                  className="h-9"
                  value={product.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </div>

              {/* Price */}
              <div className="col-span-1 px-3 py-2">
                <Input
                  type="number"
                  className="h-9"
                  value={product.purchaseBuy}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "purchaseBuy",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              {/* Short Description */}
              <div className="col-span-4 px-3 py-2">
                <Input
                  className="h-9"
                  value={product.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
              </div>

              {/* Status */}
              <div className="col-span-1 px-3 py-2">
                <Select
                  value={product.status}
                  onValueChange={(value) =>
                    handleInputChange(index, "status", value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="col-span-1 px-3 py-2">
                <Input
                  type="number"
                  className="h-9"
                  value={product.categoryId}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "categoryId",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              {/* Actions */}
              <div className="col-span-2 px-3 py-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleExpand(product.id)}
                >
                  {expandedRows[product.id] ? (
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
                  disabled={!dirtyRows[product.id]}
                  onClick={() => saveRow(product)}
                >
                  <Save size={16} />
                </Button>
              </div>
            </div>

            {/* Expanded Row */}
            {expandedRows[product.id] && (
              <div className="grid grid-cols-12 border-b">
                <div className="col-span-12 px-3 py-3">
                  <label className="block text-sm font-medium mb-1">
                    Full Description
                  </label>
                  <Textarea
                    className="w-full min-h-[120px]"
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
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
