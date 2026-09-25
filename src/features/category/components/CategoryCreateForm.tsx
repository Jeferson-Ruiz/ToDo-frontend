import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import type { CategoryCreateDto } from "@/features/category/services/categoryService"

interface CategoryCreateFormProps {
  onCreate: (dto: CategoryCreateDto) => Promise<void> | void
  onCancel: () => void
  isSubmitting?: boolean
}

export function CategoryCreateForm({ onCreate, onCancel, isSubmitting }: CategoryCreateFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await onCreate({
      name: name.trim(),
      description: description.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="pr-1">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          Crear categoría
        </h3>
        <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
        <p className="text-[13px] leading-5 text-gray-500 dark:text-gray-400 mt-2">
          Completa la información para crear una nueva categoría.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 space-y-4">
        <Input
          label="Nombre"
          name="create-category-name"
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={setName}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="create-category-description"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Descripción
          </label>
          <textarea
            id="create-category-description"
            name="create-category-description"
            placeholder="Descripción de la categoría"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[96px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 rounded-xl px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 resize-y"
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Creando..." : "Crear categoría"}
        </Button>
      </div>
    </form>
  )
}
