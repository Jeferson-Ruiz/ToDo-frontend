/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { CategoryList } from "@/features/category/components/CategoryList"
import { fetchCategories } from "@/features/category/services/fetchCategories"
import { getApiErrorMessage } from "@/lib/apiError"
import type { Category, CategoryFilterValues } from "@/features/category/types/category"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

const EMPTY_CATEGORY_FILTERS: CategoryFilterValues = { from: null, to: null }

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<CategoryFilterValues>(EMPTY_CATEGORY_FILTERS)
  const debouncedQuery = useDebouncedValue(query, 400)
  const search = debouncedQuery.trim()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchCategories({ search, filters, page })
      .then(({ content, totalPages }) => {
        if (cancelled) return
        setCategories(content)
        setTotalPages(totalPages)
      })
      .catch((err) => {
        if (cancelled) return
        setError(getApiErrorMessage(err, "Error al cargar las categorías"))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [search, filters, page])

  const handleSearchChange = (value: string) => {
    setQuery(value)
    setFilters(EMPTY_CATEGORY_FILTERS)
    setPage(1)
  }

  const handleFiltersChange = (next: CategoryFilterValues) => {
    setFilters(next)
    setQuery("")
    setPage(1)
  }

  return (
    <CategoryList
      categories={categories}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      loading={loading}
      error={error}
      query={query}
      filters={filters}
      onSearchChange={handleSearchChange}
      onFiltersChange={handleFiltersChange}
    />
  )
}
