import { Link } from "react-router-dom"

interface BrandLogoProps {
  asLink?: boolean
  to?: string
  className?: string
}

export function BrandLogo({ asLink = true, to = "/", className }: BrandLogoProps) {
  const content = (
    <>
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
    </>
  )

  const baseClass = `flex items-center gap-3 ${asLink ? "hover:opacity-80 transition-opacity" : ""} ${className ?? ""}`

  if (asLink) {
    return (
      <Link to={to} className={baseClass} aria-label="Ir al inicio">
        {content}
      </Link>
    )
  }

  return <div className={baseClass}>{content}</div>
}
