/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { TaskEssential, TaskFilterValues } from "@/features/task/types/taskEssential"
import type { FormSelectOption } from "@/components/ui/FormSelect"
import { TaskSelectButton } from "@/components/ui/TaskSelectButton"
import { Button } from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import { Pagination } from "@/components/ui/Pagination"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { useSelection } from "@/hooks/useSelection"
import { TaskDetailModal } from "@/features/task/components/TaskDetailModal"
import { TaskFilters } from "@/features/task/components/TaskFilters"
import {
  deleteTask,
} from "@/features/task/services/taskService"
import { updateChangedFields } from "@/features/task/services/updateTask"
import { STATUS_STYLES, PRIORITY_STYLES, capitalize } from "@/features/task/utils/taskStyles"

interface TaskEssentialListProps {
  tasks: TaskEssential[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
  error?: string | null
  query: string
  filters: TaskFilterValues
  onSearchChange: (value: string) => void
  onFiltersChange: (value: TaskFilterValues) => void
  categoryOptions?: readonly FormSelectOption[]
}

export function TaskEssentialList({ tasks: initialTasks, page, totalPages, onPageChange, loading = false, error = null, query, filters, onSearchChange, onFiltersChange, categoryOptions }: TaskEssentialListProps) {
  const navigate = useNavigate()
  const { toggle, isSelected } = useSelection<string | number>()
  const [tasks, setTasks] = useState<TaskEssential[]>(initialTasks)
  const [detailTask, setDetailTask] = useState<TaskEssential | null>(null)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const handleUpdate = async (updated: TaskEssential) => {
    if (detailTask?.id != null && updated.id != null) {
      await updateChangedFields(detailTask, updated)
    }
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setDetailTask(updated)
  }

  const handleDelete = async (id: string | number) => {
    await deleteTask(Number(id))
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setDetailTask(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Tareas</h2>
              <div className="flex items-center gap-2">
                <SearchInput
                  value={query}
                  onChange={onSearchChange}
                  label="Buscar tarea por nombre"
                  placeholder="Buscar tarea..."
                  className="w-40 sm:w-56"
                />
                <Button
                  onClick={() => navigate("/tasks/create")}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Nueva tarea
                </Button>
              </div>
            </div>
            <TaskFilters value={filters} onChange={onFiltersChange} categoryOptions={categoryOptions} />
          </div>
        </CardHeader>
        {/* futuro contenido*/}
        <CardContent>
          {loading ? (
            <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">
              Cargando tareas...
            </p>
          ) : error ? (
            <p className="text-sm text-center py-8 text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">
              No hay tareas
            </p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => {
                const checked = task.id != null && isSelected(task.id)
                return (
                  <div
                    key={task.id ?? task.name}
                    onDoubleClick={() => setDetailTask(task)}
                    title="Doble click para ver detalle"
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-default select-none ${
                      checked
                        ? "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 shadow-sm"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md hover:shadow-gray-900/[0.04] dark:hover:shadow-black/20"
                    }`}
                  >
                    <span
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={(e) => e.stopPropagation()}
                    >
                      <TaskSelectButton selected={checked} onToggle={() => task.id != null && toggle(task.id)} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-bold tracking-tight leading-none truncate text-gray-900 dark:text-white">
                        {task.name}
                      </div>
                      {(task.category ?? task.deadline) && (
                        <div className="text-xs mt-1.5 truncate flex items-center gap-1.5">
                          {task.category && (
                            <span className="font-bold text-blue-600 dark:text-blue-400">{task.category}</span>
                          )}
                          {task.category && task.deadline && (
                            <span className="text-gray-300 dark:text-gray-600">·</span>
                          )}
                          {task.deadline && (
                            <span className="text-gray-500 dark:text-gray-400">{task.deadline}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-auto flex items-center gap-2 shrink-0">
                      <div className="w-[105px] flex justify-center">
                        {task.status ? (
                          <span className={`inline-flex justify-center min-w-[92px] rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide ${STATUS_STYLES[task.status]}`}>
                            {capitalize(task.status)}
                          </span>
                        ) : (
                          <span className="min-w-[92px]" aria-hidden />
                        )}
                      </div>
                      <div className="w-[78px] flex justify-center">
                        {task.priority ? (
                          <span className={`inline-flex justify-center min-w-[68px] rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide ${PRIORITY_STYLES[task.priority]}`}>
                            {capitalize(task.priority)}
                          </span>
                        ) : (
                          <span className="min-w-[68px]" aria-hidden />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
        {/* paginador en la parte inferior; arriba quedan filtros + busqueda */}
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        </div>
      </Card>
      <TaskDetailModal task={detailTask} open={!!detailTask} onClose={() => setDetailTask(null)} onUpdate={handleUpdate} onDelete={handleDelete} categoryOptions={categoryOptions} />
    </>
  )
}
