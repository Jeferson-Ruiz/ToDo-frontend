import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { CategoryCreateForm } from "@/features/category/components/CategoryCreateForm"
import { createCategory } from "@/features/category/services/categoryService"
import type { CategoryCreateDto } from "@/features/category/services/categoryService"
import { useAsyncAction } from "@/hooks/useAsyncAction"

export function CategoryCreate() {
  const navigate = useNavigate()
  const createAction = useAsyncAction("Error al crear la categoría")

  const handleCreate = async (dto: CategoryCreateDto) => {
    const ok = await createAction.run(() => createCategory(dto))
    if (ok) navigate("/categories")
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Nueva categoría</h2>
      </CardHeader>
      <CardContent>
        {createAction.error && <p className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2">{createAction.error}</p>}
        <CategoryCreateForm onCreate={handleCreate} onCancel={() => navigate("/categories")} isSubmitting={createAction.loading} />
      </CardContent>
    </Card>
  )
}
