/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import type { TaskEssential, TaskPriority, TaskStatus } from "@/features/task/types/taskEssential"
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/features/task/constants/taskOptions"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { UpdateButton } from "@/components/ui/UpdateButton"
import { FormSelect } from "@/components/ui/FormSelect"
import type { FormSelectOption } from "@/components/ui/FormSelect"

const CATEGORY_OPTIONS: readonly FormSelectOption[] = [{ value: "", label: "Sin categoría" }] as const

interface TaskEditFormProps {
  task: TaskEssential
  onCancel: () => void
  onSave: (updated: TaskEssential) => void
}

export function TaskEditForm({ task, onCancel, onSave }: TaskEditFormProps) {
  const [draft, setDraft] = useState<TaskEssential>(task)

  useEffect(() => {
    setDraft(task)
  }, [task])

  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSave({ ...task, ...draft })
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="pr-8">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          Editar tarea
        </h3>
        <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
        <p className="text-[13px] leading-5 text-gray-500 dark:text-gray-400 mt-2">
          Actualiza la información y guarda los cambios.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 space-y-4">
        <Input
          label="Título"
          name="edit-title"
          type="text"
          placeholder="Título de la tarea"
          value={draft.title}
          onChange={(v) => setDraft((p) => ({ ...p, title: v }))}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="edit-description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Descripción
          </label>
          <textarea
            id="edit-description"
            name="edit-description"
            placeholder="Descripción de la tarea"
            value={draft.description ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
            className="w-full min-h-[96px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 resize-y"
          />
        </div>

        {draft.dateCreation && (
          <p className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-gray-700/60 pt-3">
            Creada: <span className="font-medium text-gray-700 dark:text-gray-300">{draft.dateCreation}</span>
            <span className="text-gray-400 dark:text-gray-500"> · no editable</span>
          </p>
        )}
      </div>

      <div className="space-y-3">
        <FormSelect
          label="Categoría"
          id="edit-category"
          value={draft.category ?? ""}
          options={CATEGORY_OPTIONS}
          onChange={(v) => setDraft((p) => ({ ...p, category: v ? v : null }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormSelect
            label="Estado"
            id="edit-status"
            value={draft.status ?? ""}
            options={STATUS_OPTIONS}
            onChange={(v) => {
              const val = v as TaskStatus | ""
              setDraft((p) => ({ ...p, status: val ? val : null }))
            }}
          />
          <FormSelect
            label="Prioridad"
            id="edit-priority"
            value={draft.priority ?? ""}
            options={PRIORITY_OPTIONS}
            onChange={(v) => {
              const val = v as TaskPriority | ""
              setDraft((p) => ({ ...p, priority: val ? val : null }))
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          Cancelar
        </Button>
        <UpdateButton type="submit" label="Guardar" ariaLabel="Guardar cambios" />
      </div>
    </form>
  )
}
