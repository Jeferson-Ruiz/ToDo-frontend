import { STATUS_OPTIONS, PRIORITY_OPTIONS, EMPTY_TASK_FILTERS } from "@/features/task/constants/taskOptions"
import type { TaskFilterValues } from "@/features/task/types/taskEssential"
import type { FormSelectOption } from "@/components/ui/FormSelect"
import { FormSelect } from "@/components/ui/FormSelect"
import { DateRangeFilter } from "@/components/ui/DateRangeFilter"

interface TaskFiltersProps {
  value: TaskFilterValues
  onChange: (value: TaskFilterValues) => void
  categoryOptions?: readonly FormSelectOption[]
}

const DEFAULT_CATEGORY_OPTIONS: readonly FormSelectOption[] = [{ value: "", label: "Todas" }]

export function TaskFilters({ value, onChange, categoryOptions }: TaskFiltersProps) {
  const categories = categoryOptions && categoryOptions.length ? categoryOptions : DEFAULT_CATEGORY_OPTIONS
  const patch = (changes: Partial<TaskFilterValues>) => onChange({ ...EMPTY_TASK_FILTERS, ...changes })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FormSelect
        size="sm"
        label="Estado"
        value={value.status}
        options={STATUS_OPTIONS}
        onChange={(status) => patch({ status })}
        className="w-28"
      />
      <FormSelect
        size="sm"
        label="Prioridad"
        value={value.priority}
        options={PRIORITY_OPTIONS}
        onChange={(priority) => patch({ priority })}
        className="w-32"
      />
      <FormSelect
        size="sm"
        label="Categoría"
        value={value.category}
        options={categories}
        onChange={(category) => patch({ category })}
        className="w-28"
      />
      <DateRangeFilter
        value={{ from: value.from, to: value.to }}
        onChange={({ from, to }) => patch({ from, to })}
        namePrefix="filter"
      />
    </div>
  )
}