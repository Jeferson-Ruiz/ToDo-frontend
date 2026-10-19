import type { User } from "@/types/user"
import {
  updateUserEnabled,
  updateUserRole,
} from "@/features/admin/services/adminUserService"

export async function updateChangedFields(current: User, updated: User): Promise<void> {
  const id = Number(updated.id)
  if (!Number.isFinite(id)) return

  const updates: Promise<unknown>[] = []

  if (updated.role !== current.role && updated.role) {
    updates.push(updateUserRole(id, updated.role))
  }
  if (updated.enabled !== current.enabled) {
    updates.push(updateUserEnabled(id, updated.enabled))
  }

  await Promise.all(updates)
}