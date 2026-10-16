import axios from "axios"

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data?.message as string | undefined) ?? fallback
  }
  return fallback
}
