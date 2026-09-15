import { EditIcon } from "@/components/ui/icons/EditIcon"

interface UpdateButtonProps {
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  label?: string
  className?: string
}

export function UpdateButton({
  onClick,
  disabled,
  ariaLabel = "Actualizar",
  label = "Actualizar",
  className,
}: UpdateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      }
    >
      <EditIcon />
      {label}
    </button>
  )
}
