import { Footer } from "@/components/layout/Footer"
import { CategoryList } from "@/features/category/components/CategoryList"
import type { Category } from "@/features/category/types/category"

const EXAMPLE_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Trabajo",
    description: "Tareas relacionadas con proyectos laborales y reuniones de equipo.",
    dateCreation: "01/09/2026 09:00",
  }
]

interface CategoriesProps {
  categories?: Category[]
}

export function Categories({ categories = EXAMPLE_CATEGORIES }: CategoriesProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-8">
        <CategoryList categories={categories} />
      </main>
      <Footer />
    </div>
  )
}
