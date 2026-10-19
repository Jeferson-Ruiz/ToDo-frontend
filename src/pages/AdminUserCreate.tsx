import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { AdminUserCreateForm } from "@/features/admin/components/AdminUserCreateForm"
import { createUser } from "@/features/admin/services/adminUserService"
import type { AdminUserCreateDto } from "@/features/admin/services/adminUserService"
import { useAsyncAction } from "@/hooks/useAsyncAction"

export function AdminUserCreate() {
  const navigate = useNavigate()
  const createAction = useAsyncAction("Error al crear el usuario")

  const handleCreate = async (dto: AdminUserCreateDto) => {
    const ok = await createAction.run(() => createUser(dto))
    if (ok) navigate("/admin")
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Nuevo usuario</h2>
      </CardHeader>
      <CardContent>
        {createAction.error && <p className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2">{createAction.error}</p>}
        <AdminUserCreateForm onCreate={handleCreate} onCancel={() => navigate("/admin")} isSubmitting={createAction.loading} />
      </CardContent>
    </Card>
  )
}