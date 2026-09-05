import { useNavigate } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { LoginForm } from "@/features/auth/components/LoginForm"

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.35]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-500/15 to-violet-500/20 blur-3xl" />
      </div>

      <Header onLoginClick={() => navigate("/login")} onCreateAccountClick={() => navigate("/register")} />

      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>

      <Footer/>
    </div>
  )
}
