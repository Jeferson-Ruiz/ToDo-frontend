import { useState } from "react"
import { Title } from "../../../components/ui/Title"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useToggle } from "../../../hooks/useToggle"
import { EyeIcon, EyeOffIcon } from "../../../components/ui/icons/EyeIcon"

export function Logout() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { visible, toggle } = useToggle(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
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
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  )
}
