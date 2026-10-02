import { NavLink } from "react-router-dom"
import { UserMenu } from "@/features/user/components/UserMenu"

const MODULES = [
  { label: "Tareas", to: "/tasks" },
  { label: "Categorías", to: "/categories" },
]

const ACTIVE_CLASS =
  "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium transition-colors"
const IDLE_CLASS =
  "inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-full transition-colors"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6 h-[64px] flex items-center gap-3">
        <nav aria-label="Módulos" className="flex items-center gap-2">
          {MODULES.map((module) => (
            <NavLink key={module.to} to={module.to} className={({ isActive }) => (isActive ? ACTIVE_CLASS : IDLE_CLASS)}>
              {module.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}