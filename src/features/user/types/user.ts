export type UserRole = "USER" | "ADMIN"

export interface UserInfo {
  id: number
  name: string
  email: string
  role: UserRole
  dateCreation?: string | null
}
