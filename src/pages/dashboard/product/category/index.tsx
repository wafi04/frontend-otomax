"use client";

import { CategoryTable } from "@/features/dashboard/components/category/category-table";
import { useCategoryStore } from "@/features/dashboard/services/api";
import { CategoryData } from "@/features/dashboard/types/category";
import { useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/sidebar";
import { toast } from "sonner";
import { PaginationResponse } from "@/types/response";

export default function ManageCategory() {
  const {
    fetchCategories,
    categories,
    pagination,
    searchTerm,
    statusFilter,
    page,
    limit,
  } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
      } catch (error) {
        toast.error("Failed to load categories");
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [searchTerm, statusFilter, page, limit]);

  const handleEdit = (category: CategoryData) => {
    // Implement edit functionality
    toast.info(`Editing category: ${category.name}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log("Delete category:", id);
    // toast.info(`Deleting category with ID: ${id}`)
  };

  const handleView = (category: CategoryData) => {
    // Implement view functionality
    console.log("View category:", category);
    // toast.info(`Viewing category: ${category.name}`)
  };

  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="container mx-auto py-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Categories
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your product categories
            </p>
          </div>

          <CategoryTable
            categories={categories as CategoryData[]}
            pagination={pagination as PaginationResponse}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
