import { api } from "@/lib/api"

export interface CategoryCreateDto {
  name: string
  description: string
}

export interface CategoryResponseDto {
  id: number
  name: string
  description: string
  dateCreation: string | null
}

export interface PagedCategories {
  content: CategoryResponseDto[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

const get = <T>(url: string, params?: Record<string, unknown>) =>
  api.get<T>(url, { params }).then((r) => r.data)

const patch = (url: string, body?: unknown) =>
  api.patch<void>(url, body).then((r) => r.data)

export const createCategory = (dto: CategoryCreateDto) =>
  api.post<CategoryResponseDto>("/category/create", dto).then((r) => r.data)

export const getCategories = (page = 0) =>
  get<PagedCategories>("/category/all", { page })

export const getCategoryByName = (name: string) =>
  get<CategoryResponseDto[]>("/category/name", { name })

export const getCategoriesByDate = (dateInit: string, dateEnd: string) =>
  get<CategoryResponseDto[]>("/category/date", { dateInit, dateEnd })

export const updateCategoryName = (id: number, data: string) =>
  patch(`/category/update-name/${id}`, { data })

export const updateCategoryDescription = (id: number, data: string) =>
  patch(`/category/update-description/${id}`, { data })

export const deleteCategory = (id: number) =>
  api.delete<void>(`/category/delete/${id}`).then((r) => r.data)

export const getCategoryNames = () =>
  get<string[]>("/category/names")
