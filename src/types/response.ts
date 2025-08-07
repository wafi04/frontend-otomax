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
  data: T;
    message: string;
  statusCode: number;
  pagination: PaginationResponse;
};

export type PaginationResponse = {
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
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
