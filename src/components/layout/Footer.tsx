interface FooterProps {
  year?: number
  brandName?: string
  description?: string
  tagline?: string
}

export function Footer({
  year = new Date().getFullYear(),
  brandName = "ToDo",
  description = "Hecho para enfocarte.",
  tagline = "Simple · Rápido · Tuyo",
}: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {year} {brandName} — {description}
        </span>
        <span className="hidden sm:inline">{tagline}</span>
      </div>
    </footer>
  )
}