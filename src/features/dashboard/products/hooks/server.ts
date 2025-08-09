import { api } from "@/lib/axios";
import {
  API_RESPONSE,
  ApiPagination,
  PaginationResponse,
} from "@/types/response";
import { create } from "zustand";
import { CreateService, ServiceData } from "./types";

export type useProductsStoreType = {
  product: ServiceData[];
  isLoading: boolean;
  error: string | null;

  createProduct : (req :CreateService)  => Promise<void>
  pagination: PaginationResponse | null;
  fetchAllProducts: () => Promise<void>;
};
export const useProductsStore = create<useProductsStoreType>((set, get) => ({
  isLoading: false,
  product: [],
  error: null,
  pagination: null,

  createProduct: async (req: CreateService) => {
    try {
      const { error } = get();
      const res = await api.post<API_RESPONSE<ServiceData>>("/products", req);
      const result = res.data;

      if (result.statusCode === 201) {
        set((state) => ({
          product: state.product
            ? [result.data, ...state.product]
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
  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const req = await api.get<ApiPagination<ServiceData[]>>("/products");
      if (req.data.statusCode === 200) {
        set({
          product: req.data.data,
          pagination: req.data.pagination,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
