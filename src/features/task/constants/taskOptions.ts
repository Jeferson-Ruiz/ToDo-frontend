import type { TaskFilterValues } from "@/features/task/types/taskEssential"

export const STATUS_OPTIONS = [
  { value: "", label: "Sin estado" },
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "PROCESO", label: "Proceso" },
  { value: "FINALIZADA", label: "Finalizada" },
] as const

export const PRIORITY_OPTIONS = [
  { value: "", label: "Sin prioridad" },
  { value: "BAJA", label: "Baja" },
  { value: "MEDIA", label: "Media" },
  { value: "ALTA", label: "Alta" },
] as const


export const CATEGORY_OPTIONS = [
  { value: "", label: "Todas" },
  { value: "Prueba", label: "prueba" },

] as const

export const EMPTY_TASK_FILTERS: TaskFilterValues = {
  status: "",
  priority: "",
  category: "",
  from: null,
  to: null,
}
