import { api } from "@/lib/axios";
import { Category } from "@/types/category";
import { API_RESPONSE } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCategory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category[]>>("/category");
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });
  return {
    data,
    isLoading,
    error,
  };
}

export function useGetCategoryById(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category>>(`/category/${id}`);
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });
  return {
    data,
    isLoading,
    error,
  };
}

export function useGetCategoryByType(type: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", type],
    queryFn: async () => {
      const data = await api.get<API_RESPONSE<Category[]>>(
        `/category/type/${type}`
      );
      return data.data;
    },
    staleTime: 5 * 6000,
    gcTime: 5 * 6000,
  });
  return {
    data,
    isLoading,
    error,
  };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      payload: Omit<Category, "id" | "created_at" | "updated_at" | "sort_order">
    ) => api.post<API_RESPONSE<Category>>("/category", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<Category> }) =>
      api.put<API_RESPONSE<Category>>(`/category/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<API_RESPONSE<Category>>(`/category/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
