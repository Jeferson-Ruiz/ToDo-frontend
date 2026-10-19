import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Title } from "@/components/ui/Title"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useToggle } from "@/hooks/useToggle"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons/EyeIcon"
import { login } from "@/features/auth/services/authService"
import { saveAuth } from "@/lib/authSession"
import axios from "axios"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { visible, toggle } = useToggle(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const data = await login({ email, password })
      saveAuth(data)
      navigate("/tasks")
    } catch (err) {
      if (axios.isAxiosError(err)) setError((err.response?.data?.message as string | undefined) ?? "Error al iniciar sesión")
      else setError("Error al iniciar sesión")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700"
    >
        <div className="flex items-center justify-center">
          <Title text="Iniciar sesión" />
        </div>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Password"
          name="password"
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
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Entrando..." : "Entrar"}</Button>
        {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
        >
          ¿Olvidaste tu contraseña?
        </Link>
    </form>
  )
}
