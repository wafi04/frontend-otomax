import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PaginationResponse } from "@/types/response";
import { CategoryData } from "../form/category";
import { CategoryTable } from "../components/category-table";
import { useCategoryStore } from "../hooks/api";
import { HeaderDashboard } from "@/components/custom/headerdashboard";

export default function ManageCategory() {
  const {
    fetchCategories,
    categories,
    pagination,
    searchTerm,
    statusFilter,
    page,
    limit,
    deleteCategory,
  } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [searchTerm, statusFilter, page, limit]);

  const handleDelete = (id: number) => {
    // Implement delete functionality
    deleteCategory(id);

    console.log("Delete category:", id);
    // toast.info(`Deleting category with ID: ${id}`)
  };

  const handleView = (category: CategoryData) => {
    // Implement view functionality
    console.log("View category:", category);
    // toast.info(`Viewing category: ${category.name}`)
  };

  return (
    <main className="p-6">
      <HeaderDashboard title="All Categories" />
      {categories && (
        <CategoryTable
          categories={categories as CategoryData[]}
          pagination={pagination as PaginationResponse}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}
    </main>
  );
}
