import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { TaskEssentialList } from "@/features/task/components/TaskEssentialList"
import type { TaskEssential } from "@/features/task/types/taskEssential"

const EXAMPLE_TASKS: TaskEssential[] = [
  {
    id: 1,
    title: "Entregar informe trimestral",
    description: "Preparar y enviar el informe trimestral de resultados a la dirección. Incluye gráficos y análisis de KPIs.",
    category: "Trabajo",
    deadline: "09/09/2026 18:00",
    dateCreation: "01/09/2026 09:00",
    status: "PROCESO",
    priority: "ALTA",
  },
]

interface TasksProps {
  tasks?: TaskEssential[]
}

export function Tasks({ tasks = EXAMPLE_TASKS }: TasksProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <Header showBrand={false} actions={[{ label: "Usuario", to: "/user" }]} />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-8">
        <TaskEssentialList tasks={tasks} />
      </main>
      <Footer />
    </div>
  )
}
