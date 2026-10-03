import { useId } from "react"

export interface FormSelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  label?: string
  value: string
  options: readonly FormSelectOption[]
  onChange: (value: string) => void
  id?: string
  name?: string
  disabled?: boolean
  className?: string
  size?: "sm" | "md"
}

const SIZES = {
  sm: "text-xs px-2.5 py-1.5 rounded-lg pr-7",
  md: "text-sm px-3.5 py-2.5 rounded-xl",
} as const

export function FormSelect({ label, value, options, onChange, id: propId, name, disabled, className = "w-full", size = "md" }: FormSelectProps) {
  const autoId = useId()
  const id = propId ?? autoId

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name ?? id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
        className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:light] dark:[color-scheme:dark] ${SIZES[size]} ${className}`}
      >
        {options.map((o) => (
          <option key={o.value || o.label} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
