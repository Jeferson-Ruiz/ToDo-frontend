import { useState, useCallback } from "react"

export function useSelection<T extends string | number>(initial: T[] = []) {
  const [selected, setSelected] = useState<Set<T>>(() => new Set(initial))

  const toggle = useCallback((id: T) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isSelected = useCallback((id: T) => selected.has(id), [selected])

  const clear = useCallback(() => setSelected(new Set()), [])

  return { selected, toggle, isSelected, setSelected, clear }
}
