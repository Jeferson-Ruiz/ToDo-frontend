import type { TaskEssential } from "@/features/task/types/taskEssential"
import {
  updateTaskCategory,
  updateTaskDeadline,
  updateTaskDescription,
  updateTaskName,
  updateTaskPriority,
  updateTaskStatus,
} from "@/features/task/services/taskService"

export async function updateChangedFields(current: TaskEssential, updated: TaskEssential): Promise<void> {
  if (current.id == null || updated.id == null) return
  const id = Number(updated.id)

  const same = (a: unknown, b: unknown) => (a ?? "") === (b ?? "")
  const updates: Promise<unknown>[] = []

  if (updated.name !== current.name && updated.name.trim()) {
    updates.push(updateTaskName(id, updated.name.trim()))
  }
  if (!same(updated.description?.trim(), current.description?.trim())) {
    updates.push(updateTaskDescription(id, updated.description?.trim() ?? ""))
  }
  if (updated.status !== current.status && updated.status != null) {
    updates.push(updateTaskStatus(id, updated.status))
  }
  if (updated.priority !== current.priority && updated.priority != null) {
    updates.push(updateTaskPriority(id, updated.priority))
  }
  if (updated.deadline !== current.deadline && updated.deadline != null) {
    updates.push(updateTaskDeadline(id, updated.deadline))
  }
  if (!same(updated.category, current.category) && updated.category) {
    updates.push(updateTaskCategory(id, updated.category))
  }

  await Promise.all(updates)
}
