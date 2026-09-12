import { SelectIcon } from "@/components/ui/icons/SelectIcon"

interface TaskSelectButtonProps {
  selected?: boolean
  onToggle?: () => void
  label?: string
}

export function TaskSelectButton({ selected = false, onToggle, label = "Seleccionar tarea" }: TaskSelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={label}
      className={`h-5 w-5 shrink-0 grid place-items-center rounded-full border-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-900 ${
        selected
          ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500"
          : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-transparent"
      }`}
    >
      <SelectIcon selected={selected} />
    </button>
  )
}
