interface InputProps {
  label: string
  name: string
  type?: "text" | "email" | "password"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  rightElement?: React.ReactNode
}

export function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  rightElement,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ${rightElement ? "pr-20" : ""}`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
}
