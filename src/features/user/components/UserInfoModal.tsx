import { Modal } from "@/components/ui/Modal"
import { InfoRow } from "@/components/ui/InfoRow"
import type { User } from "@/types/user"

interface UserInfoModalProps {
  user: User | null
  open: boolean
  onClose: () => void
}

export function UserInfoModal({ user, open, onClose }: UserInfoModalProps) {
  if (!user) return null

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Información personal">
      <div className="space-y-5">
        <div className="pr-8">
          <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            Información personal
          </h3>
          <div
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500"
            aria-hidden
          />
        </div>

        <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
          <InfoRow
            label="Nombre"
            value={user.name}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />

          <InfoRow
            label="Correo"
            value={user.email}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
          />

          <InfoRow
            label="Rol"
            value={user.role}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            }
          />

          <InfoRow
            label="Fecha de creación"
            value={user.dateCreation ?? "—"}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
            }
          />
        </div>
      </div>
    </Modal>
  )
}
