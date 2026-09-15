import { Modal } from "@/components/ui/Modal"
import { DeleteButton } from "@/components/ui/DeleteButton"
import { UpdateButton } from "@/components/ui/UpdateButton"
import type { TaskEssential } from "@/features/task/types/taskEssential"
import { STATUS_STYLES, PRIORITY_STYLES, capitalize } from "@/features/task/utils/taskStyles"

interface TaskDetailModalProps {
  task: TaskEssential | null
  open: boolean
  onClose: () => void
  onDelete?: (task: TaskEssential) => void
  onUpdate?: (task: TaskEssential) => void
}

export function TaskDetailModal({ task, open, onClose, onDelete, onUpdate }: TaskDetailModalProps) {
  if (!task) return null

  return (
    <Modal open={open} onClose={onClose} ariaLabel={task.title}>
      <div className="space-y-5">
        <div className="pr-8">
          <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            {task.title}
          </h3>
          <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
          <div className="mt-3 flex flex-wrap gap-2">
            {task.status ? (
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${STATUS_STYLES[task.status]}`}>
                {capitalize(task.status)}
              </span>
            ) : (
              <span className="inline-flex rounded-full border border-dashed border-gray-300 dark:border-gray-700 px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                Sin estado
              </span>
            )}
            {task.priority ? (
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${PRIORITY_STYLES[task.priority]}`}>
                {capitalize(task.priority)}
              </span>
            ) : (
              <span className="inline-flex rounded-full border border-dashed border-gray-300 dark:border-gray-700 px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                Sin prioridad
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-1">
            Descripción
          </p>
          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
            {task.description?.trim() ? task.description : "Sin descripción"}
          </p>
        </div>

        <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M20 12V8H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v4" />
                <path d="M20 12a2 2 0 0 0-2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h12" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Categoría</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {task.category?.trim() ? task.category : "Sin categoría"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <path d="M9 16l2 2 4-4" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Fecha creación</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{task.dateCreation ?? "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Fecha límite</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{task.deadline ?? "Sin fecha límite"}</p>
            </div>
          </div>
        </div>


      </div>
    </Modal>
  )
}
