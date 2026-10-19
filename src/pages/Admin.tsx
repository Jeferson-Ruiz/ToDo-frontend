/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { AdminUserList } from "@/features/admin/components/AdminUserList"
import { fetchUsers } from "@/features/admin/services/fetchUsers"
import type { AdminUserFilterValues } from "@/features/admin/services/fetchUsers"
import { getApiErrorMessage } from "@/lib/apiError"
import type { User } from "@/types/user"

const EMPTY_USER_FILTERS: AdminUserFilterValues = { role: "", from: null, to: null }

export function Admin() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<AdminUserFilterValues>(EMPTY_USER_FILTERS)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchUsers({ filters, page })
      .then(({ content, totalPages }) => {
        if (cancelled) return
        setUsers(content)
        setTotalPages(totalPages)
      })
      .catch((err) => {
        if (cancelled) return
        setError(getApiErrorMessage(err, "Error al cargar los usuarios"))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [filters, page])

  const handleFiltersChange = (next: AdminUserFilterValues) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <AdminUserList
      users={users}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      loading={loading}
      error={error}
      filters={filters}
      onFiltersChange={handleFiltersChange}
    />
  )
}