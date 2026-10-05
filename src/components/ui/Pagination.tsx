import { Button } from "@/components/ui/Button"

// Paginador presentacional y reutilizable: no sabe nada de los datos que
// pagina. `page`/`totalPages` los calcula quien lo usa y `onChange` avisa el
// cambio (hoy: slice local + setPage; mañana: `totalPages` desde la respuesta
// del backend y fetch de página). Sin estado interno, sin lógica de negocio.
interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  className?: string
}

const PAGE_BUTTON_CLASS =
  "inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-blue-400 dark:hover:bg-blue-950/30"

export function Pagination({ page, totalPages, onChange, className = "" }: PaginationProps) {
  return (
    <nav aria-label="Paginación" className={`flex items-center justify-center gap-3 ${className}`}>
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={PAGE_BUTTON_CLASS}
      >
        Anterior
      </Button>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
        Página {page} de {totalPages}
      </span>
      <Button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={PAGE_BUTTON_CLASS}
      >
        Siguiente
      </Button>
    </nav>
  )
}
