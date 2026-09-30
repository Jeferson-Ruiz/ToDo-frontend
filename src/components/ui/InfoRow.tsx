interface InfoRowProps {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
}

export function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      {icon && (
        <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 break-words">{value}</p>
      </div>
    </div>
  )
}
