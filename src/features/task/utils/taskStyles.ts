import type { TaskStatus, TaskPriority } from "@/features/task/types/taskEssential"

export const STATUS_STYLES: Record<TaskStatus, string> = {
  PENDIENTE: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  PROCESO: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
  FINALIZADA: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
}

export const PRIORITY_STYLES: Record<TaskPriority, string> = {
  BAJA: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/50",
  MEDIA: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
  ALTA: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50",
}

export function capitalize(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase()
}
