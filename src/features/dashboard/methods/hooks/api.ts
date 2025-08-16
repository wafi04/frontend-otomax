import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { MethodGrubResponse } from "../types/method";

export function useGetMethodsByGroub() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["methods-grub"],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<MethodGrubResponse[]>>(
        "/method/groub"
      );
      return req.data;
    },
    staleTime: 5 * 6000,
    gcTime: 60000,
  });

  return {
    data: data?.data,
    isLoading,
    error,
  };
}

export function useGetMethods() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["methods-all"],
    queryFn: async () => {
      const req = await api.get("/method/groub");
      return req.data;
    },
    staleTime: 5 * 6000,
    gcTime: 60000,
  });

  return {
    data,
    isLoading,
    error,
  };
}
