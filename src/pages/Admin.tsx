import type { User } from "@/types/user"
import { AdminUserList } from "@/features/admin/components/AdminUserList"

const EXAMPLE_USERS: User[] = [
  {
    id: 1,
    name: "Jeferson",
    lastName: "Ruiz",
    username: "jeferson.ruiz",
    email: "jeferson.ruiz@email.com",
    role: "ADMIN",
    enabled: true,
    dateCreation: "01/09/2026 09:00",
  },
  {
    id: 2,
    name: "Ana",
    lastName: "Torres",
    username: "ana.torres",
    email: "ana.torres@email.com",
    role: "USER",
    enabled: true,
    dateCreation: "04/09/2026 11:20",
  }
]

interface AdminProps {
  users?: User[]
}

export function Admin({ users = EXAMPLE_USERS }: AdminProps) {
  return <AdminUserList users={users} />
}