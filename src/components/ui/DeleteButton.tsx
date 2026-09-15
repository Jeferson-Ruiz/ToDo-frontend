import { DeleteIcon } from "@/components/ui/icons/DeleteIcon"

interface DeleteButtonProps {
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  label?: string
  className?: string
}

export function DeleteButton({
  onClick,
  disabled,
  ariaLabel = "Eliminar",
  label = "Eliminar",
  className,
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      }
    >
      <DeleteIcon />
      {label}
    </button>
  )
}
