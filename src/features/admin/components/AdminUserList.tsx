/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { User } from "@/types/user"
import { ROLE_OPTIONS } from "@/types/user"
import { TaskSelectButton } from "@/components/ui/TaskSelectButton"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { SearchInput } from "@/components/ui/SearchInput"
import { FormSelect } from "@/components/ui/FormSelect"
import { Pagination } from "@/components/ui/Pagination"
import { DateRangeFilter } from "@/components/ui/DateRangeFilter"
import { useSelection } from "@/hooks/useSelection"
import { AdminUserDetailModal } from "@/features/admin/components/AdminUserDetailModal"
import { updateChangedFields } from "@/features/admin/services/updateUser"
import type { AdminUserFilterValues } from "@/features/admin/services/fetchUsers"
import {
  ROLE_STYLES,
  ENABLED_STYLES,
  fullName,
  roleLabel,
  enabledLabel,
} from "@/features/admin/utils/userStyles"

interface AdminUserListProps {
  users: User[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
  error?: string | null
  filters: AdminUserFilterValues
  onFiltersChange: (value: AdminUserFilterValues) => void
}

const ROLE_FILTER_OPTIONS = [{ value: "", label: "Todos" }, ...ROLE_OPTIONS]

export function AdminUserList({ users: initialUsers, page, totalPages, onPageChange, loading = false, error = null, filters, onFiltersChange }: AdminUserListProps) {
  const navigate = useNavigate()
  const { toggle, isSelected } = useSelection<string | number>()
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [detailUser, setDetailUser] = useState<User | null>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  // La busqueda sigue siendo local sobre la pagina cargada: /admin/name exige
  // coincidencia exacta de nombre y devuelve un solo usuario.
  const normalizedQuery = query.trim().toLowerCase()
  const visibleUsers = normalizedQuery
    ? users.filter((u) => fullName(u).toLowerCase().includes(normalizedQuery))
    : users

  // Los filtros van al servidor y la pagina se resetea en el page (onFiltersChange).
  const handleSearch = (value: string) => {
    setQuery(value)
    onFiltersChange({ ...filters, role: "", from: null, to: null })
  }

  const handleFiltersChange = (value: AdminUserFilterValues) => {
    setQuery("")
    onFiltersChange(value)
  }

  const handleRoleChange = (value: string) => {
    handleFiltersChange({ ...filters, role: value as AdminUserFilterValues["role"], from: null, to: null })
  }

  const handleDateRangeChange = (value: { from: string | null; to: string | null }) => {
    handleFiltersChange({ ...filters, role: "", from: value.from, to: value.to })
  }

  const handleUpdate = async (updated: User) => {
    if (detailUser) await updateChangedFields(detailUser, updated)
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    setDetailUser(updated)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Usuarios</h2>
              <div className="flex items-center gap-2">
                <SearchInput
                  value={query}
                  onChange={handleSearch}
                  label="Buscar usuario por nombre"
                  placeholder="Buscar usuario..."
                  className="w-40 sm:w-56"
                />
                <Button
                  onClick={() => navigate("/admin/users/create")}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Nuevo usuario
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <FormSelect
                size="sm"
                label="Rol"
                value={filters.role}
                options={ROLE_FILTER_OPTIONS}
                onChange={handleRoleChange}
                className="w-32"
              />
              <DateRangeFilter
                value={{ from: filters.from, to: filters.to }}
                onChange={handleDateRangeChange}
                namePrefix="admin-filter"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">
              Cargando usuarios...
            </p>
          ) : error ? (
            <p className="text-sm text-center py-8 text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : visibleUsers.length === 0 ? (
            <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">No hay usuarios</p>
          ) : (
            <div className="space-y-3">
              {visibleUsers.map((user) => {
              const name = fullName(user)
              const checked = isSelected(user.id)
              return (
                <div
                  key={user.id}
                  onDoubleClick={() => setDetailUser(user)}
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
                      onToggle={() => toggle(user.id)}
                      label={`Seleccionar usuario ${name}`}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold tracking-tight leading-none truncate text-gray-900 dark:text-white">
                      {name}
                    </div>
                    <div className="text-xs mt-1.5 truncate text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 shrink-0">
                    <div className="w-[120px] flex justify-center">
                      <span
                        className={`inline-flex justify-center min-w-[110px] rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide ${ROLE_STYLES[user.role]}`}
                      >
                        {roleLabel(user.role)}
                      </span>
                    </div>
                    <div className="w-[80px] flex justify-center">
                      <span
                        className={`inline-flex justify-center min-w-[70px] rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide ${
                          user.enabled ? ENABLED_STYLES.active : ENABLED_STYLES.inactive
                        }`}
                      >
                        {enabledLabel(user.enabled)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </CardContent>
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        </div>
      </Card>
      <AdminUserDetailModal
        user={detailUser}
        open={!!detailUser}
        onClose={() => setDetailUser(null)}
        onUpdate={handleUpdate}
      />
    </>
  )
}