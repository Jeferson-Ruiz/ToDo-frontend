import { Link } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Title } from "@/components/ui/Title"

export function ActivationSuccess() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.35]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-500/15 to-violet-500/20 blur-3xl" />
      </div>

      <Header actions={[{ label: "Iniciar sesión", to: "/login" }, { label: "Crear cuenta", to: "/register" }]} />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col gap-4 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-none border dark:border-gray-700 text-center">
          <div className="flex items-center justify-center">
            <Title text="Cuenta activada" />
          </div>
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400" aria-hidden>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tu cuenta fue activada correctamente. Ya puedes iniciar sesión y empezar a usar TODO.
          </p>
          <Link
            to="/login"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
          >
            Iniciar sesión
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
