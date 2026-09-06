import { useState } from "react"
import { Title } from "@/components/ui/Title"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export function RecoveryRequestForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log({ email })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700 text-center">
        <div className="flex items-center justify-center">
          <Title text="Correo enviado" />
        </div>
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400" aria-hidden>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Enviamos instrucciones a <strong className="text-gray-900 dark:text-white break-all">{email}</strong>. Revisa tu bandeja y spam. El enlace expira en 2 horas.
        </p>
        <Button onClick={() => setSent(false)}>Enviar de nuevo</Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700"
    >
      <div className="flex items-center justify-center">
        <Title text="Recuperar cuenta" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
      </p>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={setEmail}
      />
      <Button type="submit">Enviar instrucciones</Button>
    </form>
  )
}
