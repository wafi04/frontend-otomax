import { create } from 'zustand'
import type { CategoryData } from '../types/category'
import { api } from '@/lib/axios'
import type { API_RESPONSE, ApiPagination, PaginationResponse } from '@/types/response'

interface CategoryStore {
  categories: CategoryData[] | null
  loading: boolean
  error: string | null
  pagination: PaginationResponse | null

  searchTerm: string
  statusFilter: string
  page: number
  limit: number

  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void

  fetchCategories: () => Promise<void>
  clearCategories: () => void
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: null,
  pagination: null,
  loading: false,
  error: null,

  searchTerm: '',
  statusFilter: '',
  page: 1,
  limit: 10,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  fetchCategories: async () => {
    const { searchTerm, statusFilter, page, limit } = get()

    set({ loading: true, error: null })

    const params = new URLSearchParams()

    if (searchTerm.trim()) params.append('search', searchTerm)
    if (statusFilter) params.append('status', statusFilter)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    try {
      const res = await api.get<ApiPagination<CategoryData[]>>(`/categories?${params.toString()}`)
      const result = res.data

      if (result.statusCode === 200) {
        set({
          categories: result.data,
          pagination: result.pagination,
        })
      } else {
        set({ error: result.message || 'Failed to fetch categories' })
      }
    } catch (err: any) {
      set({ error: err.message || 'Unknown error' })
    } finally {
      set({ loading: false })
    }
  },

  clearCategories: () =>
    set({
      categories: null,
      pagination: null,
      error: null,
    }),
}))
