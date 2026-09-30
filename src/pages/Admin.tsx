import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export function Admin() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Administración</h2>
        <Button
          onClick={() => navigate("/admin/users/create")}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Nuevo usuario
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-center py-8 text-gray-500 dark:text-gray-400">
        </p>
      </CardContent>
    </Card>
  )
}
