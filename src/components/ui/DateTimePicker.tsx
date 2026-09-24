/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useId, useState } from "react"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

interface DateTimePickerProps {
  label: string
  value: string | null
  onChange: (value: string | null) => void
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  timeStep?: number
}

function split(value: string | null): { date: string; time: string } {
  if (!value) return { date: "", time: "" }
  const parsed = value.includes("T") ? dayjs(value) : value.includes("/") ? dayjs(value, "DD/MM/YYYY HH:mm") : dayjs(value)
  if (!parsed.isValid()) return { date: "", time: "" }
  return { date: parsed.format("YYYY-MM-DD"), time: parsed.format("HH:mm") }
}

function combine(date: string, time: string): string | null {
  if (!date) return null
  const t = time || "00:00"
  const parsed = dayjs(`${date} ${t}`, "YYYY-MM-DD HH:mm", true)
  if (!parsed.isValid()) return null
  return parsed.format("YYYY-MM-DDTHH:mm:00")
}

export function DateTimePicker({
  label,
  value,
  onChange,
  id: propId,
  name,
  disabled,
  required,
  timeStep = 15,
}: DateTimePickerProps) {
  const autoId = useId()
  const id = propId ?? autoId
  const { date: propDate, time: propTime } = split(value)
  const [date, setDate] = useState(propDate)
  const [time, setTime] = useState(propTime)

  useEffect(() => {
    if (value !== null) {
      setDate(propDate)
      setTime(propTime)
    } else {
      setDate("")
      setTime("")
    }
  }, [value, propDate, propTime])

  const handleDateChange = (newDate: string) => {
    setDate(newDate)
    if (!newDate) {
      setTime("")
      onChange(null)
      return
    }
    onChange(combine(newDate, time))
  }

  const handleTimeChange = (newTime: string) => {
    if (!date) return
    setTime(newTime)
    onChange(combine(date, newTime))
  }

  const inputClassName =
    "w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:light] dark:[color-scheme:dark]"

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`${id}-date`} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} <span className="font-normal text-gray-500 dark:text-gray-400">(opcional)</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        <input
          id={`${id}-date`}
          name={name ? `${name}-date` : `${id}-date`}
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={inputClassName}
        />
        <input
          id={`${id}-time`}
          name={name ? `${name}-time` : `${id}-time`}
          type="time"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={disabled || !date}
          required={required}
          step={timeStep * 60}
          className={inputClassName}
        />
      </div>
    </div>
  )
}
