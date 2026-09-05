interface CategoryPillsProps {
  pills?: string[]
}

const DEFAULT_PILLS = ["Todas", "Trabajo · 4", "Personal · 2", "Estudio · 2"]

const PILL_COLORS = [
  "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent",
  "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-900/40",
  "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-900/40",
  "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-900/40",
]

export function CategoryPills({ pills = DEFAULT_PILLS }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 px-5 pt-4 overflow-x-auto scrollbar-none">
      {pills.map((label, i) => (
        <span
          key={label}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${PILL_COLORS[i % PILL_COLORS.length]}`}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
