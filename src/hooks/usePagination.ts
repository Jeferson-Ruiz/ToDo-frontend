import { useState, useCallback } from "react"

// Paginación local: corta la lista que ya tienes con slice.
// Cuando el backend pagine (`?page&size` + `totalPages` en la respuesta),
// `visibleItems`/`totalPages` vendrán del fetch y `setPage` pedirá la página.
// `Pagination` no cambia.
export function usePagination<T>(items: T[], pageSize = 5) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const resetPage = useCallback(() => setPage(1), [])

  return { page: currentPage, totalPages, visibleItems, setPage, resetPage }
}
