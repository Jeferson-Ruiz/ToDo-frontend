import { SearchIcon, ClearIcon } from "@/components/ui/icons/SearchIcon"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  label = "Buscar",
  className,
}: SearchInputProps) {
  return (
    <div className={`relative min-w-0 shrink ${className ?? "w-44 sm:w-56"}`}>
      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={`w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ${
          value ? "pr-7 pl-8" : "pl-8"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  )
}
