import type { User, UserRole } from "@/types/user"

export const ROLE_STYLES: Record<UserRole, string> = {
  USER: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  ADMIN: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-900/50",
}

export const ENABLED_STYLES = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
  inactive: "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
}

export function fullName(user: User) {
  return `${user.name} ${user.lastName}`.trim()
}

export function roleLabel(role: UserRole) {
  return role === "ADMIN" ? "Administrador" : "Usuario"
}

export function enabledLabel(enabled: boolean) {
  return enabled ? "Activo" : "Inactivo"
}