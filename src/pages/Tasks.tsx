/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { TaskEssentialList } from "@/features/task/components/TaskEssentialList"
import { fetchTasks } from "@/features/task/services/fetchTasks"
import { getCategoryNames } from "@/features/category/services/categoryService"
import { getApiErrorMessage } from "@/lib/apiError"
import type { TaskEssential, TaskFilterValues } from "@/features/task/types/taskEssential"
import type { FormSelectOption } from "@/components/ui/FormSelect"
import { EMPTY_TASK_FILTERS } from "@/features/task/constants/taskOptions"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

export function Tasks() {
  const [tasks, setTasks] = useState<TaskEssential[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<TaskFilterValues>(EMPTY_TASK_FILTERS)
  const [categoryOptions, setCategoryOptions] = useState<readonly FormSelectOption[]>([{ value: "", label: "Todas" }])
  const debouncedQuery = useDebouncedValue(query, 400)
  const search = debouncedQuery.trim()

  useEffect(() => {
    let cancelled = false
    getCategoryNames()
      .then((names) => {
        if (cancelled) return
        setCategoryOptions([
          { value: "", label: "Todas" },
          ...names.map((name) => ({ value: name, label: name })),
        ])
      })
      .catch(() => {
        if (cancelled) return
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchTasks({ search, filters, page })
      .then(({ content, totalPages }) => {
        if (cancelled) return
        setTasks(content)
        setTotalPages(totalPages)
      })
      .catch((err) => {
        if (cancelled) return
        setError(getApiErrorMessage(err, "Error al cargar las tareas"))
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
    setFilters(EMPTY_TASK_FILTERS)
    setPage(1)
  }

  const handleFiltersChange = (next: TaskFilterValues) => {
    setFilters(next)
    setQuery("")
    setPage(1)
  }

  return (
    <TaskEssentialList
      tasks={tasks}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      loading={loading}
      error={error}
      query={query}
      filters={filters}
      onSearchChange={handleSearchChange}
      onFiltersChange={handleFiltersChange}
      categoryOptions={categoryOptions}
    />
  )
}
