const DEFAULT_TASKS = [
  { title: "Entregar informe trimestral", subtitle: "Trabajo · vence hoy 18:00" },
  { title: "Comprar regalo cumpleaños", subtitle: "Personal · mañana" },
  { title: "Repasar Spring Security", subtitle: "Estudio · 10/09" },
]

interface TaskListProps {
  tasks?: typeof DEFAULT_TASKS
}

export function TaskList({ tasks = DEFAULT_TASKS }: TaskListProps) {
  return (
    <div className="p-5 space-y-3">
      {tasks.map((task) => (
        <div
          key={task.title}
          className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60 px-4 py-3"
        >
          <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium leading-none truncate text-gray-900 dark:text-white">{task.title}</div>
            {task.subtitle && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.subtitle}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
