import { Link } from "react-router-dom"
import { BrandLogo } from "@/components/ui/BrandLogo"

export type HeaderAction = {
  label: string
  to?: string
  href?: string
}

interface HeaderProps {
  actions?: HeaderAction[]
  brandAsLink?: boolean
  brandTo?: string
  showBrand?: boolean
}

export function Header({ actions = [], brandAsLink = true, brandTo = "/", showBrand = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6 h-[64px] flex items-center justify-between">
        {showBrand ? <BrandLogo asLink={brandAsLink} to={brandTo} /> : <div aria-hidden />}
        <nav className="flex items-center gap-2">
          {actions.map((action, i) => {
            const isLast = i === actions.length - 1
            const cls = isLast
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              : "hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"

            if (action.href) {
              return (
                <a key={`${action.label}-${i}`} href={action.href} target="_blank" rel="noreferrer" className={cls}>
                  {action.label}
                </a>
              )
            }

            return (
              <Link key={`${action.label}-${i}`} to={action.to ?? "#"} className={cls}>
                {action.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
