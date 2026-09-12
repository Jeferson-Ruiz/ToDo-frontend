interface SelectIconProps {
  selected?: boolean
}

export function SelectIcon({ selected = false }: SelectIconProps) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={selected ? "opacity-100" : "opacity-0"}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}