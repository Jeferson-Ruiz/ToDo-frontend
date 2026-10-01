import { Modal } from "@/components/ui/Modal"
import { InfoRow } from "@/components/ui/InfoRow"
import { MailIcon, UserIcon, ShieldIcon, DateIcon } from "@/components/ui/icons/UserIcons"
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
          <InfoRow label="Nombre" value={user.name} icon={<UserIcon />} />
          <InfoRow label="Correo" value={user.email} icon={<MailIcon />} />
          <InfoRow label="Rol" value={user.role} icon={<ShieldIcon />} />
          <InfoRow
            label="Fecha de creación"
            value={user.dateCreation ?? "—"}
            icon={<DateIcon />}
          />
        </div>
      </div>
    </Modal>
  )
}
