import { Navigate, Outlet } from "react-router-dom"
import { getAuth } from "@/lib/authSession"

interface ProtectedRouteProps {
  role?: "ADMIN"
}

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { token, role: currentRole } = getAuth()

  if (!token) return <Navigate to="/login" replace />
  if (role && currentRole !== role) return <Navigate to="/tasks" replace />

  return <Outlet />
}
