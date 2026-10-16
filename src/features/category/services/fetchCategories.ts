import {
  getCategories,
  getCategoriesByDate,
  getCategoryByName,
} from "@/features/category/services/categoryService"
import type { Category, CategoryFilterValues } from "@/features/category/types/category"

export interface FetchCategoriesParams {
  search: string
  filters: CategoryFilterValues
  page: number
}

export interface FetchCategoriesResult {
  content: Category[]
  totalPages: number
}

async function list(promise: Promise<Category[]>): Promise<FetchCategoriesResult> {
  const dtos = await promise
  return { content: dtos, totalPages: 1 }
}

// El backend acepta un solo filtro por request, por eso las ramas son excluyentes.
export async function fetchCategories({ search, filters, page }: FetchCategoriesParams): Promise<FetchCategoriesResult> {
  if (search) return list(getCategoryByName(search))
  if (filters.from && filters.to) return list(getCategoriesByDate(filters.from, filters.to))

  const paged = await getCategories(page - 1)
  return { content: paged.content, totalPages: Math.max(1, paged.totalPages) }
}
