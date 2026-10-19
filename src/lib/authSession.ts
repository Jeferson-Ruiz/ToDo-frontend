const AUTH_KEYS = ["token", "role", "email"] as const

export interface AuthSession {
  token: string
  role: string
  email: string
}

export function getAuth() {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  }
}

export function saveAuth(session: AuthSession) {
  localStorage.setItem("token", session.token)
  localStorage.setItem("role", session.role)
  localStorage.setItem("email", session.email)
}

export function clearAuth() {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key))
}
