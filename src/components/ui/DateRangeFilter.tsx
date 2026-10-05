import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { DateTimePicker } from "@/components/ui/DateTimePicker"

export interface DateRangeValues {
  from: string | null
  to: string | null
}

interface DateRangeFilterProps {
  value: DateRangeValues
  onChange: (value: DateRangeValues) => void
  namePrefix?: string
}

// Filtro presentacional de rango por fecha de creación.
// No filtra nada local ni hace fetch; el backend aplicará from/to.
export function DateRangeFilter({ value, onChange, namePrefix = "filter" }: DateRangeFilterProps) {
  const [range, setRange] = useState<DateRangeValues>({ from: value.from, to: value.to })

  const rangeReady = !!(range.from && range.to && range.from <= range.to)
  const handleApply = () => onChange({ from: range.from, to: range.to })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="ml-1 flex items-center gap-1.5 border-l border-gray-200 pl-2 dark:border-gray-800">
        <DateTimePicker
          size="sm"
          withTime={false}
          labelPosition="inline"
          label="Desde"
          name={`${namePrefix}-from`}
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
          name={`${namePrefix}-to`}
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
