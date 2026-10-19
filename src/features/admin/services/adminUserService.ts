import { api } from "@/lib/api"
import type { UserRole } from "@/types/user"

export interface AdminUserCreateDto {
  name: string
  lastName: string
  username: string
  email: string
  role: UserRole
  password: string
}

// El id viaja en la respuesta pero no se muestra: solo se usa como clave de la fila,
// seleccion y cuerpo de los PATCH.
export interface UserResponseDto {
  id: number
  name: string
  lastName: string
  email: string
  username: string
  role: UserRole
  enable: boolean
  registrationDte: string | null
}

export interface PagedUsers {
  content: UserResponseDto[]
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

export const createUser = (dto: AdminUserCreateDto) =>
  api.post<UserResponseDto>("/admin/create", dto).then((r) => r.data)

export const getUsers = (page = 0) =>
  get<PagedUsers>("/admin/all", { page })

export const getUsersByRole = (role: UserRole) =>
  get<UserResponseDto[]>(`/admin/role/${role}`)

export const getUsersByDate = (init: string, finish: string) =>
  get<UserResponseDto[]>("/admin/date", { init, finish })

export const updateUserRole = (id: number, role: UserRole) =>
  patch("/admin/update-role", { id, role })

export const updateUserEnabled = (id: number, enable: boolean) =>
  patch("/admin/update-enable", { id, enable })