import { useState } from "react"
import type { TaskEssential } from "@/features/task/types/taskEssential"
import { TaskSelectButton } from "@/components/ui/TaskSelectButton"
import { useSelection } from "@/hooks/useSelection"
import { TaskDetailModal } from "@/features/task/components/TaskDetailModal"
import { STATUS_STYLES, PRIORITY_STYLES, capitalize } from "@/features/task/utils/taskStyles"

interface TaskEssentialListProps {
  tasks: TaskEssential[]
}

export function TaskEssentialList({ tasks: initialTasks }: TaskEssentialListProps) {
  const { toggle, isSelected } = useSelection<string | number>()
  const [tasks, setTasks] = useState<TaskEssential[]>(initialTasks)
  const [detailTask, setDetailTask] = useState<TaskEssential | null>(null)

  const handleUpdate = (updated: TaskEssential) => {
    setTasks((prev) => prev.map((t) => (t.id != null && updated.id != null ? (t.id === updated.id ? updated : t) : t.title === updated.title ? updated : t)))
    setDetailTask(updated)
  }

  if (tasks.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No hay tareas</p>
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => {
          const checked = task.id != null && isSelected(task.id)
          return (
            <div
              key={task.id ?? task.title}
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
              {task.title}
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
      <TaskDetailModal task={detailTask} open={!!detailTask} onClose={() => setDetailTask(null)} onUpdate={handleUpdate} />
    </>
  )
}
