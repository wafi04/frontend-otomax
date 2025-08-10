import { create } from "zustand";
import { api } from "@/lib/axios";
import type {
  API_RESPONSE,
  ApiPagination,
  PaginationResponse,
} from "@/types/response";
import { CategoryData, CreateCategoryInput } from "../form/category";

interface CategoryStore {
  categories: CategoryData[] | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationResponse | null;

  searchTerm: string;
  statusFilter: string;
  page: number;
  limit: number;

  // 🟢 State untuk dialog edit
  isEditDialogOpen: boolean;
  editCategory: CategoryData | null;

  // Setters untuk dialog edit
  openEditDialog: (category: CategoryData) => void;
  closeEditDialog: () => void;

  // Category setters
  setSearchTerm: (term: string) => void;
  setCategories: (data: CategoryData[]) => void;
  setStatusFilter: (status: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  // Actions
  createCategory: (data: CreateCategoryInput) => void;
  deleteCategory: (id: number) => void;
  updateCategory: (id: number, data: Partial<CreateCategoryInput>) => void;
  fetchCategories: () => Promise<void>;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: null,
  pagination: null,
  loading: false,
  error: null,

  searchTerm: "",
  statusFilter: "",
  page: 1,
  limit: 10,

  // 🔵 Default edit dialog state
  isEditDialogOpen: false,
  editCategory: null,

  // 🔵 Edit dialog handlers
  openEditDialog: (category) =>
    set({
      isEditDialogOpen: true,
      editCategory: category,
    }),

  closeEditDialog: () =>
    set({
      isEditDialogOpen: false,
      editCategory: null,
    }),

  // 🔵 Category setters
  setCategories: (data) => set({ categories: data }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  createCategory: async (data: CreateCategoryInput) => {
    try {
      const res = await api.post<API_RESPONSE<CategoryData>>(
        "/categories",
        data
      );
      const result = res.data;

      if (result.statusCode === 201) {
        set((state) => ({
          categories: state.categories
            ? [result.data, ...state.categories]
            : [result.data],
        }));
      } else {
        set({ error: result.message || "Failed to create category" });
      }
    } catch (error: any) {
      set({
        error:
          error.message || "Unknown error occurred while creating category",
      });
    }
  },

  deleteCategory: async (id: number) => {
    try {
      const res = await api.delete<API_RESPONSE<null>>(`/categories/${id}`);
      const result = res.data;

      if (result.statusCode === 200) {
        set((state) => ({
          categories: state.categories
            ? state.categories.filter((cat) => cat.id !== id)
            : [],
        }));
      } else {
        set({ error: result.message || "Failed to delete category" });
      }
    } catch (error: any) {
      set({ error: error.message || "Unknown error occurred while deleting" });
    }
  },

  updateCategory: async (id: number, data: Partial<CreateCategoryInput>) => {
    try {
      const res = await api.put<API_RESPONSE<CategoryData>>(
        `/categories/${id}`,
        data
      );
      const result = res.data;

      if (result.statusCode === 200) {
        set((state) => ({
          categories: state.categories
            ? state.categories.map((cat) =>
                cat.id === id ? { ...cat, ...result.data } : cat
              )
            : [],
        }));
        // 🔵 Tutup dialog setelah update berhasil
        set({ isEditDialogOpen: false, editCategory: null });
      } else {
        set({ error: result.message || "Failed to update category" });
      }
    } catch (error: any) {
      set({
        error: error.message || "Unknown error occurred while updating",
      });
    }
  },

  fetchCategories: async () => {
    const { searchTerm, statusFilter, page, limit } = get();

    set({ loading: true, error: null });

    const params = new URLSearchParams();

    if (searchTerm.trim()) params.append("search", searchTerm);
    if (statusFilter) params.append("status", statusFilter);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    try {
      const res = await api.get<ApiPagination<CategoryData[]>>(
        `/categories?${params.toString()}`
      );
      const result = res.data;
      console.log(result);

      if (result.statusCode === 200) {
        set({
          categories: result.data,
          pagination: result.pagination,
        });
      } else {
        set({ error: result.message || "Failed to fetch categories" });
      }
    } catch (err: any) {
      set({ error: err.message || "Unknown error" });
    } finally {
      set({ loading: false });
    }
  },

  clearCategories: () =>
    set({
      categories: null,
      pagination: null,
      error: null,
    }),
}));
