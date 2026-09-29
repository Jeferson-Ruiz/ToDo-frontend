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
  return <TaskEssentialList tasks={tasks} />
}
