import { getUsers, getUsersByDate, getUsersByRole } from "@/features/admin/services/adminUserService"
import type { UserResponseDto } from "@/features/admin/services/adminUserService"
import type { User, UserRole } from "@/types/user"

export interface AdminUserFilterValues {
  role: UserRole | ""
  from: string | null
  to: string | null
}

export interface FetchUsersParams {
  filters: AdminUserFilterValues
  page: number
}

export interface FetchUsersResult {
  content: User[]
  totalPages: number
}

function toUser(dto: UserResponseDto): User {
  return {
    id: dto.id,
    name: dto.name,
    lastName: dto.lastName,
    email: dto.email,
    username: dto.username,
    role: dto.role,
    enabled: dto.enable,
    dateCreation: dto.registrationDte,
  }
}

async function list(promise: Promise<UserResponseDto[]>): Promise<FetchUsersResult> {
  const dtos = await promise
  return { content: dtos.map(toUser), totalPages: 1 }
}

// El backend acepta un solo filtro por request, por eso las ramas son excluyentes.
// La busqueda por nombre se queda en el cliente: /admin/name exige coincidencia exacta.
export async function fetchUsers({ filters, page }: FetchUsersParams): Promise<FetchUsersResult> {
  if (filters.role) return list(getUsersByRole(filters.role as UserRole))
  if (filters.from && filters.to) return list(getUsersByDate(filters.from, filters.to))

  const paged = await getUsers(page - 1)
  return { content: paged.content.map(toUser), totalPages: Math.max(1, paged.totalPages) }
}