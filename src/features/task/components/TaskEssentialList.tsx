import type { TaskEssential, TaskStatus, TaskPriority } from "@/features/task/types/taskEssential"
import { TaskSelectButton } from "@/components/ui/TaskSelectButton"
import { useSelection } from "@/hooks/useSelection"

const STATUS_STYLES: Record<TaskStatus, string> = {
  PENDIENTE: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  PROCESO: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
  FINALIZADA: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  BAJA: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/50",
  MEDIA: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
  ALTA: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50",
}

function capitalize(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase()
}

interface TaskEssentialListProps {
  tasks: TaskEssential[]
}

export function TaskEssentialList({ tasks }: TaskEssentialListProps) {
  const { toggle, isSelected } = useSelection<string | number>()

  if (tasks.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No hay tareas</p>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const checked = task.id != null && isSelected(task.id)
        return (
          <div
            key={task.id ?? task.title}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] ${
              checked
                ? "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 shadow-sm"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md hover:shadow-gray-900/[0.04] dark:hover:shadow-black/20"
            }`}
          >
            <TaskSelectButton selected={checked} onToggle={() => task.id != null && toggle(task.id)} />
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
  )
}
