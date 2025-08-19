import { api } from "@/lib/axios";
import { Category } from "@/types/category";
import { API_RESPONSE } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

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
