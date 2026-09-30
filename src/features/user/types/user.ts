export type UserRole = "USER" | "ADMIN"

export interface UserInfo {
  name: string
  email: string
  role: UserRole
  dateCreation?: string | null
}
