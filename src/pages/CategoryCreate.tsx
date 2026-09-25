import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { CategoryCreateForm } from "@/features/category/components/CategoryCreateForm"
import type { CategoryCreateDto } from "@/features/category/services/categoryService"

export function CategoryCreate() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (dto: CategoryCreateDto) => {
    setError(null)
    setIsSubmitting(true)
    try {
      console.log(dto)
      navigate("/categories")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear la categoría"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <Header showBrand={false} actions={[{ label: "Categorías", to: "/categories" }]} />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-8">
        <Card>
          <CardHeader>
            <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Nueva categoría</h2>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2">
                {error}
              </p>
            )}
            <CategoryCreateForm onCreate={handleCreate} onCancel={() => navigate("/categories")} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
