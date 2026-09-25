import type { TaskPriority, TaskStatus } from "@/features/task/types/taskEssential"

export interface TaskCreateDto {
  name: string
  description: string
  status: TaskStatus | null
  priority: TaskPriority | null
  deadline: string | null
  category: string | null
}