import { useState } from "react"
import { Link } from "react-router-dom"
import { Title } from "@/components/ui/Title"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useToggle } from "@/hooks/useToggle"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons/EyeIcon"
import { resetPassword } from "@/features/auth/services/authService"
import { getApiErrorMessage } from "@/lib/apiError"

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { visible, toggle } = useToggle(false)

  const eyeButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
      className="h-7 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  )

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError(null)
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }
    if (newPassword !== repeatPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
    setIsSubmitting(true)
    try {
      const data = await resetPassword(token, newPassword, repeatPassword)
      setSuccess(data.message ?? "Contraseña actualizada correctamente")
    } catch (err) {
      setError(getApiErrorMessage(err, "No se pudo actualizar la contraseña"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700 text-center">
        <div className="flex items-center justify-center">
          <Title text="Contraseña actualizada" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{success}</p>
        <Link
          to="/login"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
        >
          Iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700"
    >
      <div className="flex items-center justify-center">
        <Title text="Restablecer contraseña" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Ingresa tu nueva contraseña.
      </p>
      <Input
        label="Nueva contraseña"
        name="new-password"
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        value={newPassword}
        onChange={setNewPassword}
        rightElement={eyeButton}
      />
      <Input
        label="Repetir contraseña"
        name="repeat-password"
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        value={repeatPassword}
        onChange={setRepeatPassword}
        rightElement={eyeButton}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar"}</Button>
    </form>
  )
}