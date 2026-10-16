import type { Category } from "@/features/category/types/category"
import {
  updateCategoryDescription,
  updateCategoryName,
} from "@/features/category/services/categoryService"

export async function updateCategory(current: Category, updated: Category): Promise<void> {
  if (current.id == null || updated.id == null) return
  const id = Number(updated.id)

  const updates: Promise<unknown>[] = []

  if (updated.name !== current.name && updated.name.trim()) {
    updates.push(updateCategoryName(id, updated.name.trim()))
  }
  const prevDescription = (current.description ?? "").trim()
  const nextDescription = (updated.description ?? "").trim()
  if (nextDescription && nextDescription !== prevDescription) {
    updates.push(updateCategoryDescription(id, nextDescription))
  }

  await Promise.all(updates)
}
