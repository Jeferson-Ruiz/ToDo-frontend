import { useNavigate } from "react-router-dom"
import { logout } from "@/features/auth/services/authService"
import { clearAuth } from "@/lib/authSession"

export function useLogout() {
  const navigate = useNavigate()

  return async () => {
    await logout().catch(() => undefined)
    clearAuth()
    navigate("/login", { replace: true })
  }
}
