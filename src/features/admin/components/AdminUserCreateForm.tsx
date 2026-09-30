import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { FormSelect } from "@/components/ui/FormSelect"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons/EyeIcon"
import { useToggle } from "@/hooks/useToggle"
import { ROLE_OPTIONS } from "@/types/user"
import type { AdminUserCreateDto } from "@/features/admin/services/adminUserService"
import type { UserRole } from "@/types/user"

interface AdminUserCreateFormProps {
  onCreate: (dto: AdminUserCreateDto) => Promise<void> | void
  onCancel: () => void
  isSubmitting?: boolean
}

export function AdminUserCreateForm({ onCreate, onCancel, isSubmitting }: AdminUserCreateFormProps) {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("USER")
  const { visible, toggle } = useToggle(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await onCreate({
      name: name.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      email: email.trim(),
      role,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="pr-1">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          Crear usuario
        </h3>
        <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
        <p className="text-[13px] leading-5 text-gray-500 dark:text-gray-400 mt-2">
          El usuario creado queda activo y puede iniciar sesión con estas credenciales.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nombre"
            name="create-user-name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={setName}
          />
          <Input
            label="Apellido"
            name="create-user-lastname"
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={setLastName}
          />
        </div>
        <Input
          label="Username"
          name="create-user-username"
          type="text"
          placeholder="3-20 caracteres"
          value={username}
          onChange={setUsername}
        />
        <Input
          label="Email"
          name="create-user-email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={setEmail}
        />
      </div>

      <div className="space-y-3">
        <FormSelect label="Rol" id="create-user-role" value={role} options={ROLE_OPTIONS} onChange={(v) => setRole(v as UserRole)} />
        <Input
          label="Contraseña"
          name="create-user-password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          rightElement={
            <button
              type="button"
              onClick={toggle}
              aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="h-7 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {visible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Creando..." : "Crear usuario"}
        </Button>
      </div>
    </form>
  )
}
