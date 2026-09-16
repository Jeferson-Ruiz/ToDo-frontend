import { useEffect } from "react"
import { DeleteButton } from "@/components/ui/DeleteButton"
import { Button } from "@/components/ui/Button"

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "¿Eliminar tarea?",
  description = "Esta acción no se puede deshacer.",
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Sin backdrop oscuro: TaskDetailModal ya oscurece el fondo (bg-black/40). Evita doble capa. Solo capa transparente para cerrar al clicar fuera */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl px-6 py-6 animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            {cancelLabel}
          </Button>
          <DeleteButton onClick={onConfirm} label={confirmLabel} ariaLabel={confirmLabel} />
        </div>
      </div>
    </div>
  )
}
