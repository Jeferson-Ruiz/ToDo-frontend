import { Modal } from "@/components/ui/Modal"
import { UpdatePasswordForm } from "@/features/user/components/UpdatePasswordForm"

interface UpdatePasswordModalProps {
  userId: string | number
  open: boolean
  onClose: () => void
}

export function UpdatePasswordModal({ userId, open, onClose }: UpdatePasswordModalProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Actualizar contraseña">
      <UpdatePasswordForm userId={userId} onCancel={onClose} />
    </Modal>
  )
}
