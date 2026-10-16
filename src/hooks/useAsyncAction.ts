import { useCallback, useRef, useState } from "react"
import { getApiErrorMessage } from "@/lib/apiError"

export function useAsyncAction(fallbackMessage: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const busy = useRef(false)

  const clearError = useCallback(() => setError(null), [])

  const run = useCallback(
    async (action: () => Promise<unknown> | unknown): Promise<boolean> => {
      if (busy.current) return false
      busy.current = true
      setLoading(true)
      setError(null)
      try {
        await action()
        return true
      } catch (err) {
        setError(getApiErrorMessage(err, fallbackMessage))
        return false
      } finally {
        busy.current = false
        setLoading(false)
      }
    },
    [fallbackMessage],
  )

  return { loading, error, setError, clearError, run }
}
