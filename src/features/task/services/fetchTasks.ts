import {
  getTaskByName,
  getTasks,
  getTasksByCategory,
  getTasksByDate,
  getTasksByPriority,
  getTasksByStatus,
} from "@/features/task/services/taskService"
import type { TaskResponseDto } from "@/features/task/services/taskService"
import type { TaskEssential, TaskFilterValues, TaskPriority, TaskStatus } from "@/features/task/types/taskEssential"

export interface FetchTasksParams {
  search: string
  filters: TaskFilterValues
  page: number
}

export interface FetchTasksResult {
  content: TaskEssential[]
  totalPages: number
}

function toTaskEssential(dto: TaskResponseDto): TaskEssential {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    category: dto.category,
    deadline: dto.deadline,
    dateCreation: dto.dateCreation,
    status: dto.status,
    priority: dto.priority,
  }
}

async function list(promise: Promise<TaskResponseDto[]>): Promise<FetchTasksResult> {
  const dtos = await promise
  return { content: dtos.map(toTaskEssential), totalPages: 1 }
}

// El backend acepta un solo filtro por request, por eso las ramas son excluyentes.
export async function fetchTasks({ search, filters, page }: FetchTasksParams): Promise<FetchTasksResult> {
  if (search) return list(getTaskByName(search))
  if (filters.status) return list(getTasksByStatus(filters.status as TaskStatus))
  if (filters.priority) return list(getTasksByPriority(filters.priority as TaskPriority))
  if (filters.category) return list(getTasksByCategory(filters.category))
  if (filters.from && filters.to) return list(getTasksByDate(filters.from, filters.to))

  const paged = await getTasks(page - 1)
  return { content: paged.content.map(toTaskEssential), totalPages: Math.max(1, paged.totalPages) }
}
