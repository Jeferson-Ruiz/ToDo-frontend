import { api } from "@/lib/api"

export async function updatePassword(id: number | string, oldPassword: string, newPassword: string) {
  await api.patch("/user/update-password", { id, oldPassword, newPassword })
}
