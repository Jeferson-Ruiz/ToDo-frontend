import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { DeleteButton } from "@/components/ui/DeleteButton"
import { UpdateButton } from "@/components/ui/UpdateButton"
import type { Category } from "@/features/category/types/category"
import { CategoryEditForm } from "@/features/category/components/CategoryEditForm"

interface CategoryDetailModalProps {
  category: Category | null
  open: boolean
  onClose: () => void
  onUpdate?: (category: Category) => void
  onDelete?: (category: Category) => void
}

export function CategoryDetailModal({
  category,
  open,
  onClose,
  onUpdate,
  onDelete,
}: CategoryDetailModalProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const startEditing = () => setIsEditing(true)
  const stopEditing = () => setIsEditing(false)

  if (!category) return null

  const handleClose = () => {
    stopEditing()
    onClose()
  }

  const handleSave = (updated: Category) => {
    onUpdate?.(updated)
    stopEditing()
  }

  const handleConfirmDelete = () => {
    setConfirmOpen(false)
    if (category) onDelete?.(category)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel={category.name}>
      {isEditing ? (
        <CategoryEditForm
          key={category.id ?? category.name}
          category={category}
          onCancel={stopEditing}
          onSave={handleSave}
        />
      ) : (
        <div className="space-y-5">
          <div className="pr-8">
            <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-1">
              Descripción
            </p>
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {category.description?.trim() ? category.description : "Sin descripción"}
            </p>
          </div>

          <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
                  Fecha creación
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{category.dateCreation ?? "—"}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <UpdateButton onClick={startEditing} ariaLabel={`Actualizar ${category.name}`} />
            <DeleteButton onClick={() => setConfirmOpen(true)} ariaLabel={`Eliminar ${category.name}`} />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar categoría?"
        description={`${category.name}`}
      />
    </Modal>
  )
}
