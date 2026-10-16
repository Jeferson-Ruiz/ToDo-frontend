import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { TaskCreateForm } from "@/features/task/components/TaskCreateForm"
import { createTask } from "@/features/task/services/taskService"
import type { TaskCreateDto } from "@/features/task/services/taskService"
import { useAsyncAction } from "@/hooks/useAsyncAction"

export function TaskCreate() {
  const navigate = useNavigate()
  const createAction = useAsyncAction("Error al crear la tarea")

  const handleCreate = async (dto: TaskCreateDto) => {
    const ok = await createAction.run(() => createTask(dto))
    if (ok) navigate("/tasks")
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Nueva tarea</h2>
      </CardHeader>
      <CardContent>
        {createAction.error && <p className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2">{createAction.error}</p>}
        <TaskCreateForm onCreate={handleCreate} onCancel={() => navigate("/tasks")} isSubmitting={createAction.loading} />
      </CardContent>
    </Card>
  )
}
