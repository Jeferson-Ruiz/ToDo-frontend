export type TaskStatus = "PENDIENTE" | "PROCESO" | "FINALIZADA"
export type TaskPriority = "BAJA" | "MEDIA" | "ALTA"

export interface TaskEssential {
  id?: string | number
  title: string
  description?: string | null
  category?: string | null
  deadline?: string | null
  dateCreation?: string | null
  status?: TaskStatus | null
  priority?: TaskPriority | null
}
