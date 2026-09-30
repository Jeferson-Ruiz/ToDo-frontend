import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { AdminUserCreateForm } from "@/features/admin/components/AdminUserCreateForm"
import type { AdminUserCreateDto } from "@/features/admin/services/adminUserService"

export function AdminUserCreate() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (dto: AdminUserCreateDto) => {
    setError(null)
    setIsSubmitting(true)
    try {
      console.log(dto)
      navigate("/admin")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear el usuario"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Nuevo usuario</h2>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2">
            {error}
          </p>
        )}
        <AdminUserCreateForm onCreate={handleCreate} onCancel={() => navigate("/admin")} isSubmitting={isSubmitting} />
      </CardContent>
    </Card>
  )
}
