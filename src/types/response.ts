import { ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}
export interface ErrorResponse {
  statusCode: number;
  message?: string;
}

export type API_RESPONSE<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export type ApiPagination<T> = {
  data: {
    data: T;
    meta: PaginationResponse;
  };
  message: string;
  statusCode: number;
};

export type PaginationResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type CountResponse = {
  count: number;
};

export interface PaginationParams {
  limit?: string;
  page?: string;
}

export interface FilterAll extends PaginationParams {
  search?: string;
  type?: string;
  status?: string;
}
