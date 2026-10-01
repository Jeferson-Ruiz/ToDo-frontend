import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { InfoRow } from "@/components/ui/InfoRow"
import { UpdateButton } from "@/components/ui/UpdateButton"
import type { User } from "@/types/user"
import { AdminUserEditForm } from "@/features/admin/components/AdminUserEditForm"
import {
  MailIcon,
  UserIcon,
  ShieldIcon,
  StatusIcon,
  DateIcon,
} from "@/components/ui/icons/UserIcons"
import {
  ROLE_STYLES,
  ENABLED_STYLES,
  fullName,
  roleLabel,
  enabledLabel,
} from "@/features/admin/utils/userStyles"

interface AdminUserDetailModalProps {
  user: User | null
  open: boolean
  onClose: () => void
  onUpdate?: (user: User) => void
}

export function AdminUserDetailModal({ user, open, onClose, onUpdate }: AdminUserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const startEditing = () => setIsEditing(true)
  const stopEditing = () => setIsEditing(false)

  if (!user) return null

  const name = fullName(user)

  const handleClose = () => {
    stopEditing()
    onClose()
  }

  const handleSave = (updated: User) => {
    onUpdate?.(updated)
    stopEditing()
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel={name}>
      {isEditing ? (
        <AdminUserEditForm
          key={user.id ?? user.username}
          user={user}
          onCancel={stopEditing}
          onSave={handleSave}
        />
      ) : (
        <div className="space-y-5">
          <div className="pr-8">
            <h3 className="text-[22px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
              {name}
            </h3>
            <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-500" aria-hidden />
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${ROLE_STYLES[user.role]}`}
              >
                {roleLabel(user.role)}
              </span>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${
                  user.enabled ? ENABLED_STYLES.active : ENABLED_STYLES.inactive
                }`}
              >
                {enabledLabel(user.enabled)}
              </span>
            </div>
          </div>

          <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <InfoRow label="Correo" value={user.email} icon={<MailIcon />} />
            <InfoRow label="Username" value={user.username} icon={<UserIcon />} />
            <InfoRow label="Rol" value={roleLabel(user.role)} icon={<ShieldIcon />} />
            <InfoRow label="Estado" value={enabledLabel(user.enabled)} icon={<StatusIcon />} />
            <InfoRow label="Fecha de creación" value={user.dateCreation ?? "—"} icon={<DateIcon />} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <UpdateButton onClick={startEditing} ariaLabel={`Actualizar ${name}`} />
          </div>
        </div>
      )}
    </Modal>
  )
}