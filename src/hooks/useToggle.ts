import { useState, useCallback } from "react"

export function useToggle(initial = false) {
  const [visible, setVisible] = useState(initial)
  const toggle = useCallback(() => setVisible((v) => !v), [])
  return { visible, toggle, setVisible }
}
