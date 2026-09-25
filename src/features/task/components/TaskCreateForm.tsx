import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { FormSelect } from "@/components/ui/FormSelect"
import { DateTimePicker } from "@/components/ui/DateTimePicker"
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/features/task/constants/taskOptions"
import type { FormSelectOption } from "@/components/ui/FormSelect"
import type { TaskCreateDto } from "@/features/task/services/taskService"
import type { TaskPriority, TaskStatus } from "@/features/task/types/taskEssential"

const CATEGORY_OPTIONS: readonly FormSelectOption[] = [{ value: "", label: "Sin categoría" }] as const

interface TaskCreateFormProps {
  onCreate: (dto: TaskCreateDto) => Promise<void> | void
  onCancel: () => void
  isSubmitting?: boolean
}

export function TaskCreateForm({ onCreate, onCancel, isSubmitting }: TaskCreateFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [category, setCategory] = useState("")
  const [deadline, setDeadline] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await onCreate({
      name: name.trim(),
      description: description.trim(),
      status: status ? (status as TaskStatus) : null,
      priority: priority ? (priority as TaskPriority) : null,
      deadline,
      category: category ? category : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="pr-1">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">Crear tarea</h3>
        <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
        <p className="text-[13px] leading-5 text-gray-500 dark:text-gray-400 mt-2">Completa la información para crear una nueva tarea.</p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 space-y-4">
        <Input label="Nombre" name="create-name" type="text" placeholder="Nombre de la tarea" value={name} onChange={setName} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="create-description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Descripción
          </label>
          <textarea
            id="create-description"
            name="create-description"
            placeholder="Descripción de la tarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[96px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 resize-y"
          />
        </div>
      </div>

      <div className="space-y-3">
        <FormSelect label="Categoría" id="create-category" value={category} options={CATEGORY_OPTIONS} onChange={setCategory} />
        <DateTimePicker label="Fecha límite" value={deadline} onChange={setDeadline} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormSelect
            label="Estado"
            id="create-status"
            value={status}
            options={STATUS_OPTIONS}
            onChange={(v) => setStatus(v)}
          />
          <FormSelect
            label="Prioridad"
            id="create-priority"
            value={priority}
            options={PRIORITY_OPTIONS}
            onChange={(v) => setPriority(v)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50">
          {isSubmitting ? "Creando..." : "Crear tarea"}
        </Button>
      </div>
    </form>
  )
}
