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
