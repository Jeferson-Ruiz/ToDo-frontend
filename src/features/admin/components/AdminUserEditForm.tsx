/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import type { User, UserRole } from "@/types/user"
import { ROLE_OPTIONS } from "@/types/user"
import { Button } from "@/components/ui/Button"
import { UpdateButton } from "@/components/ui/UpdateButton"
import { FormSelect } from "@/components/ui/FormSelect"
import type { FormSelectOption } from "@/components/ui/FormSelect"

const ENABLED_OPTIONS: readonly FormSelectOption[] = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
] as const

interface AdminUserEditFormProps {
  user: User
  onCancel: () => void
  onSave: (updated: User) => void
}

export function AdminUserEditForm({ user, onCancel, onSave }: AdminUserEditFormProps) {
  const [role, setRole] = useState<UserRole>(user.role)
  const [enabled, setEnabled] = useState<boolean>(user.enabled)

  useEffect(() => {
    setRole(user.role)
    setEnabled(user.enabled)
  }, [user])

  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSave({ ...user, role, enabled })
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="pr-8">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          Editar usuario
        </h3>
        <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
        <p className="text-[13px] leading-5 text-gray-500 dark:text-gray-400 mt-2">
          Actualiza el rol y el estado, y guarda los cambios.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormSelect
            label="Rol"
            id="edit-user-role"
            value={role}
            options={ROLE_OPTIONS}
            onChange={(v) => setRole(v as UserRole)}
          />
          <FormSelect
            label="Estado"
            id="edit-user-enabled"
            value={String(enabled)}
            options={ENABLED_OPTIONS}
            onChange={(v) => setEnabled(v === "true")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          Cancelar
        </Button>
        <UpdateButton type="submit" label="Guardar" ariaLabel="Guardar cambios" />
      </div>
    </form>
  )
}