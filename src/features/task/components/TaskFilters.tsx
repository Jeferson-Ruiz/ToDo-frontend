import { useState } from "react"
import { STATUS_OPTIONS, PRIORITY_OPTIONS, CATEGORY_OPTIONS } from "@/features/task/constants/taskOptions"
import type { TaskFilterValues } from "@/features/task/types/taskEssential"
import { Button } from "@/components/ui/Button"
import { FormSelect } from "@/components/ui/FormSelect"
import { DateTimePicker } from "@/components/ui/DateTimePicker"

interface TaskFiltersProps {
  value: TaskFilterValues
  onChange: (value: TaskFilterValues) => void
}

type DateRange = Pick<TaskFilterValues, "from" | "to">

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  const patch = (changes: Partial<TaskFilterValues>) => onChange({ ...value, ...changes })
  const [range, setRange] = useState<DateRange>({ from: value.from, to: value.to })

  const rangeReady = !!(range.from && range.to && range.from <= range.to)
  const handleApply = () => onChange({ ...value, from: range.from, to: range.to })

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
        options={CATEGORY_OPTIONS}
        onChange={(category) => patch({ category })}
        className="w-28"
      />
      <div className="ml-1 flex items-center gap-1.5 border-l border-gray-200 pl-2 dark:border-gray-800">
        <DateTimePicker
          size="sm"
          withTime={false}
          labelPosition="inline"
          label="Desde"
          name="filter-from"
          value={range.from}
          onChange={(from) => setRange((prev) => ({ ...prev, from }))}
          max={range.to ?? undefined}
          className="w-28"
        />
        <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500" aria-hidden>
          –
        </span>
        <DateTimePicker
          size="sm"
          withTime={false}
          labelPosition="inline"
          label="Hasta"
          name="filter-to"
          value={range.to}
          onChange={(to) => setRange((prev) => ({ ...prev, to }))}
          min={range.from ?? undefined}
          className="w-28"
        />
        <Button
          onClick={handleApply}
          disabled={!rangeReady}
          className="shrink-0 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Aplicar
        </Button>
      </div>
    </div>
  )
}