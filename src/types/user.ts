export const ROLE_OPTIONS = [
  { value: "USER", label: "Usuario" },
  { value: "ADMIN", label: "Administrador" },
] as const

export type UserRole = (typeof ROLE_OPTIONS)[number]["value"]

export interface User {
  id: string | number
  name: string
  lastName: string
  username: string
  email: string
  role: UserRole
  enabled: boolean
  dateCreation?: string | null
}
