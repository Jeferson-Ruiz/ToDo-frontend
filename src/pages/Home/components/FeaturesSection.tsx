const FEATURES = [
  {
    title: "Categorías a tu medida",
    desc: "Nombres únicos por usuario, normalizados y organizados. Tu estructura, tus reglas.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 12a8 8 0 0 1-8 8" />
        <path d="M20 12a8 8 0 0 0-8-8" />
        <path d="M4 12a8 8 0 0 0 8 8" />
        <path d="M4 12a8 8 0 0 1 8-8" />
        <path d="M12 2v20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Tareas que se entienden",
    desc: "Prioridad, estado y vencimiento. Filtra por fecha, estado o prioridad en segundos.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />
      </svg>
    ),
  },
]

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-4 pb-16">
      <div className="mx-auto max-w-3xl grid md:grid-cols-2 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3 hover:shadow-lg hover:shadow-gray-900/5 dark:hover:shadow-black/20 transition-shadow"
          >
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900">
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
