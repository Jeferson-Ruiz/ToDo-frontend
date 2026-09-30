import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { UpdateButton } from "@/components/ui/UpdateButton"
import { useToggle } from "@/hooks/useToggle"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons/EyeIcon"

interface UpdatePasswordFormProps {
  userId: string | number
  onCancel: () => void
}

export function UpdatePasswordForm({ userId, onCancel }: UpdatePasswordFormProps) {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const { visible, toggle } = useToggle(false)

  const eyeButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={visible ? "Ocultar contraseñas" : "Mostrar contraseñas"}
      className="h-7 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  )

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log({ userId, newPassword })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="pr-8">
        <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
          Actualizar contraseña
        </h3>
        <div
          className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500"
          aria-hidden
        />
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 space-y-4">
        <Input
          label="Contraseña actual"
          name="old-password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={oldPassword}
          onChange={setOldPassword}
          rightElement={eyeButton}
        />

        <Input
          label="Contraseña nueva"
          name="new-password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={newPassword}
          onChange={setNewPassword}
          rightElement={eyeButton}
        />

        <Input
          label="Repetir contraseña nueva"
          name="repeat-password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={repeatPassword}
          onChange={setRepeatPassword}
          rightElement={eyeButton}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          Cancelar
        </Button>
        <UpdateButton type="submit" label="Guardar" ariaLabel="Guardar contraseña" />
      </div>
    </form>
  )
}
