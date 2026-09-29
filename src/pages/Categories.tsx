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
  return <CategoryList categories={categories} />
}
