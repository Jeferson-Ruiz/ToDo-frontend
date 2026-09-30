import type { UserRole } from "@/types/user"

export interface AdminUserCreateDto {
  name: string
  lastName: string
  username: string
  email: string
  role: UserRole
  password: string
}
