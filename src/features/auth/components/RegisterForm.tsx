import { useState } from "react"
import { Title } from "@/components/ui/Title"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useToggle } from "@/hooks/useToggle"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons/EyeIcon"
import { register } from "@/features/auth/services/authService"
import type { RegisterDto } from "@/features/auth/services/authService"
import axios from "axios"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { visible, toggle } = useToggle(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError(null)
    setOk(null)
    setIsSubmitting(true)
    try {
      const dto: RegisterDto = { name, lastName, email, username, password }
      const msg = await register(dto)
      setOk(msg)
    } catch (err) {
      if (axios.isAxiosError(err)) setError((err.response?.data?.message as string | undefined) ?? "Error al registrarse")
      else setError("Error al registrarse")
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
        <Title text="Crear cuenta" />
      </div>
      <Input label="Nombre" name="name" type="text" placeholder="Tu nombre" value={name} onChange={setName} />
      <Input
        label="Apellido"
        name="lastName"
        type="text"
        placeholder="Tu apellido"
        value={lastName}
        onChange={setLastName}
      />
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="3-20 caracteres"
        value={username}
        onChange={setUsername}
      />
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
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Registrando..." : "Registrarse"}</Button>
      {ok && <p>{ok}</p>}
      {error && <p>{error}</p>}
    </form>
  )
}
