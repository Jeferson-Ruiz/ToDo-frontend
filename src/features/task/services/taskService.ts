import { api } from "@/lib/api"
import type { TaskPriority, TaskStatus } from "@/features/task/types/taskEssential"

export interface TaskCreateDto {
  name: string
  description: string
  status: TaskStatus | null
  priority: TaskPriority | null
  deadline: string | null
  category: string | null
}

export interface TaskResponseDto {
  id: number
  name: string
  description: string
  status: TaskStatus | null
  deadline: string | null
  priority: TaskPriority | null
  category: string | null
  dateCreation: string | null
}

export interface PagedTasks {
  content: TaskResponseDto[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

const get = <T>(url: string, params?: Record<string, unknown>) =>
  api.get<T>(url, { params }).then((r) => r.data)

const patch = (url: string, body?: unknown) =>
  api.patch<void>(url, body).then((r) => r.data)

export const createTask = (dto: TaskCreateDto) =>
  api.post<TaskResponseDto>("/task/create", dto).then((r) => r.data)

export const getTasks = (page = 0) =>
  get<PagedTasks>("/task/all", { page })

export const getTasksByCategory = (category: string) =>
  get<TaskResponseDto[]>("/task/category", { category })

export const getTaskByName = (name: string) =>
  get<TaskResponseDto[]>("/task/name", { name })

export const getTasksByDate = (dateInit: string, dateEnd?: string) =>
  get<TaskResponseDto[]>("/task/date", dateEnd ? { dateInit, dateEnd } : { dateInit })

export const getTasksByStatus = (status: TaskStatus) =>
  get<TaskResponseDto[]>(`/task/status/${status}`)

export const getTasksByPriority = (priority: TaskPriority) =>
  get<TaskResponseDto[]>(`/task/priority/${priority}`)

const updateField = (id: number, field: string, body: unknown) =>
  patch(`/task/update/${field}/${id}`, body)

export const updateTaskName = (id: number, data: string) =>
  updateField(id, "name", { data })

export const updateTaskDescription = (id: number, description: string) =>
  updateField(id, "description", { description })

export const updateTaskStatus = (id: number, status: TaskStatus) =>
  updateField(id, "status", { status })

export const updateTaskDeadline = (id: number, date: string) =>
  updateField(id, "deadline", { date })

export const updateTaskPriority = (id: number, priority: TaskPriority) =>
  updateField(id, "priority", { priority })

export const updateTaskCategory = (id: number, data: string) =>
  updateField(id, "category-name", { data })

export const deleteTask = (id: number) =>
  api.delete<void>(`/task/delete/${id}`).then((r) => r.data)
