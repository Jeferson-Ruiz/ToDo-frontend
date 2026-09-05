interface MockHeaderProps {
  initials?: string
  title?: string
  subtitle?: string
  badgeText?: string
}

export function MockHeader({
  initials = "JD",
  title = "Mis tareas",
  subtitle = "3 categorías · 8 tareas",
  badgeText = "Al día",
}: MockHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-900 dark:bg-white grid place-items-center text-white dark:text-gray-900 text-xs font-semibold">
          {initials}
        </div>
        <div>
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
        </div>
      </div>
      <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50 px-2.5 py-1 text-xs font-medium">
        {badgeText}
      </span>
    </div>
  )
}
