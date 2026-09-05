import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FeaturesSection } from "@/pages/Home/components/FeaturesSection"
import { MockHeader } from "@/components/common/MockHeader"
import { CategoryPills } from "@/components/common/CategoryPills"
import { TaskList } from "@/components/common/TaskList"

export function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.35]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-500/15 to-violet-500/20 blur-3xl" />
      </div>

      <Header
        onLoginClick={() => navigate("/login")}
        onCreateAccountClick={() => navigate("/register")}
      />

      <main className="flex-1 flex flex-col">
        <section className="mx-auto max-w-6xl w-full px-6 pt-10 pb-12 lg:pt-14 lg:pb-14 flex-1 flex items-center">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center w-full">
            {/* Left — redistribuido: centrado vertical para compensar contenido eliminado */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-7 py-2 lg:py-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                Activación por email
              </div>

              <h1 className="text-4xl lg:text-[44px] font-semibold tracking-[-0.03em] leading-[0.95] text-gray-900 dark:text-white">
                Organiza
                <br />
                <span className="text-gray-400 dark:text-gray-500">lo que importa.</span>
                <br />
                Sin ruido.
              </h1>

              <p className="max-w-[52ch] text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                ToDo es tu espacio privado para categorías y tareas. Crea, prioriza y
                completa con una cuenta segura, validación por email y aislamiento
                total por usuario. Simple, rápido y tuyo.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-600/20 transition"
                >
                  Empezar gratis
                </Button>
              </div>
            </div>

            {/* Right — product mock */}
            <div className="relative lg:pl-4">
              <div className="relative rounded-[24px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-gray-900/10 dark:shadow-black/30 overflow-hidden">
                <MockHeader />
                <CategoryPills />
                <TaskList />
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
      </main>

      <Footer
        brandName="ToDo"
        description="Hecho para enfocarte."
        tagline="Simple · Rápido · Tuyo"
      />
    </div>
  )
}
