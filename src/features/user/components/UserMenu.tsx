import { useNavigate } from "react-router-dom"
import { useToggle } from "@/hooks/useToggle"
import { UserInfoModal } from "@/features/user/components/UserInfoModal"
import { UpdatePasswordModal } from "@/features/user/components/UpdatePasswordModal"
import type { User } from "@/types/user"

const EXAMPLE_USER: User = {
  id: 1,
  name: "Jeferson",
  lastName: "Ruiz",
  username: "jeferson.ruiz",
  email: "jeferson.ruiz@email.com",
  role: "USER",
  enabled: true,
  dateCreation: "01/09/2026 09:00",
}

const EXAMPLE_TOKEN = "eyJhbGciOiJIUzI1NiJ9.exAMPLE"

interface UserMenuProps {
  user?: User
  token?: string
  onPersonalInfo?: () => void
  onUpdatePassword?: () => void
  onLogout?: () => void
}

export function UserMenu({
  user = EXAMPLE_USER,
  token = EXAMPLE_TOKEN,
  onPersonalInfo,
  onUpdatePassword,
  onLogout,
}: UserMenuProps) {
  const navigate = useNavigate()
  const { visible: open, toggle, setVisible } = useToggle(false)
  const { visible: infoOpen, toggle: toggleInfo } = useToggle(false)
  const { visible: passwordOpen, toggle: togglePassword } = useToggle(false)

  const handlePersonalInfo = () => {
    setVisible(false)
    toggleInfo()
    onPersonalInfo?.()
  }

  const handleUpdatePassword = () => {
    setVisible(false)
    togglePassword()
    onUpdatePassword?.()
  }

  const handleAdmin = () => {
    setVisible(false)
    navigate("/admin")
  }

  const handleLogout = () => {
    setVisible(false)
    console.log({ userId: user.id, token })
    onLogout?.()
    navigate("/")
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
      >
        <span className="inline-flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Usuario
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full mt-2 w-56 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-900/10 dark:shadow-black/30 overflow-hidden z-20 py-1 right-0"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handlePersonalInfo}
            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Información personal
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={handleUpdatePassword}
            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Actualizar contraseña
          </button>

          <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" role="separator" />

          <button
            type="button"
            role="menuitem"
            onClick={handleAdmin}
            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            Administración
          </button>

          <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" role="separator" />

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}

      <UserInfoModal user={user} open={infoOpen} onClose={toggleInfo} />
      <UpdatePasswordModal
        userId={user.id}
        open={passwordOpen}
        onClose={togglePassword}
      />
    </div>
  )
}
