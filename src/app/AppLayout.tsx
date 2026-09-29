import { Outlet } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { UserMenu } from "@/features/user/components/UserMenu"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col selection:bg-blue-600/20">
      <Header showBrand={false} userMenu={<UserMenu />} />
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
