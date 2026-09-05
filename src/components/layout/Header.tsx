import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"

interface HeaderProps {
  onLoginClick?: () => void
  onCreateAccountClick?: () => void
}

export function Header({ onLoginClick, onCreateAccountClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6 h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Ir al inicio">
          <div className="h-8 w-8 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 grid place-items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">ToDo</span>
        </Link>
        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoginClick}
            className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
          >
            Iniciar sesión
          </button>
          <Button
            onClick={onCreateAccountClick}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Crear cuenta
          </Button>
        </nav>
      </div>
    </header>
  )
}
