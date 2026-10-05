import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Category, CategoryFilterValues } from "@/features/category/types/category"
import { TaskSelectButton } from "@/components/ui/TaskSelectButton"
import { Button } from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import { Pagination } from "@/components/ui/Pagination"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { useSelection } from "@/hooks/useSelection"
import { usePagination } from "@/hooks/usePagination"
import { CategoryDetailModal } from "@/features/category/components/CategoryDetailModal"
import { DateRangeFilter } from "@/components/ui/DateRangeFilter"

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories: initialCategories }: CategoryListProps) {
  const navigate = useNavigate()
  const { toggle, isSelected } = useSelection<string | number>()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [detailCategory, setDetailCategory] = useState<Category | null>(null)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<CategoryFilterValues>({ from: null, to: null })

  const { page, totalPages, visibleItems: visibleCategories, setPage, resetPage } = usePagination(categories, 5)

  const handleSearch = (value: string) => {
    setQuery(value)
    resetPage()
  }

  const handleFiltersChange = (value: CategoryFilterValues) => {
    setFilters(value)
    resetPage()
  }

  const handleUpdate = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    setDetailCategory(updated)
  }

  const handleDelete = (toDelete: Category) => {
    setCategories((prev) => prev.filter((c) => c.id !== toDelete.id))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Categorías</h2>
              <div className="flex items-center gap-2">
                <SearchInput
                  value={query}
                  onChange={handleSearch}
                  label="Buscar categoría por nombre"
                  placeholder="Buscar categoría..."
                  className="w-40 sm:w-56"
                />
                <Button
                  onClick={() => navigate("/categories/create")}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Nueva categoría
                </Button>
              </div>
            </div>
            <DateRangeFilter value={filters} onChange={handleFiltersChange} namePrefix="category-filter" />
          </div>
        </CardHeader>
        <CardContent>
          {visibleCategories.length === 0 ? (
            <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">No hay categorías</p>
          ) : (
            <div className="space-y-3">
              {visibleCategories.map((category) => {
              const checked = category.id != null && isSelected(category.id)
              return (
                <div
                  key={category.id ?? category.name}
                  onDoubleClick={() => setDetailCategory(category)}
                  title="Doble click para ver detalle"
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-default select-none ${
                    checked
                      ? "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 shadow-sm"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md hover:shadow-gray-900/[0.04] dark:hover:shadow-black/20"
                  }`}
                >
                  <span onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
                    <TaskSelectButton
                      selected={checked}
                      onToggle={() => category.id != null && toggle(category.id)}
                      label={`Seleccionar categoría ${category.name}`}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold tracking-tight leading-none truncate text-gray-900 dark:text-white">
                      {category.name}
                    </div>
                    {category.description?.trim() && (
                      <div className="text-xs mt-1.5 truncate text-gray-500 dark:text-gray-400">{category.description}</div>
                    )}
                  </div>
                  <div className="ml-auto flex items-center shrink-0">
                    <div className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                      {category.dateCreation ?? "—"}
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </CardContent>
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </Card>
      <CategoryDetailModal
        category={detailCategory}
        open={!!detailCategory}
        onClose={() => setDetailCategory(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  )
}
