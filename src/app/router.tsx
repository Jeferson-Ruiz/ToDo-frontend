import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "@/app/AppLayout"
import { Home } from "@/pages/Home"
import { Login } from "@/pages/Login"
import { Register } from "@/pages/Register"
import { ForgotPassword } from "@/pages/ForgotPassword"
import { Tasks } from "@/pages/Tasks"
import { TaskCreate } from "@/pages/TaskCreate"
import { Categories } from "@/pages/Categories"
import { CategoryCreate } from "@/pages/CategoryCreate"
import { Admin } from "@/pages/Admin"
import { AdminUserCreate } from "@/pages/AdminUserCreate"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    element: <AppLayout />,
    children: [
      { path: "/tasks", element: <Tasks /> },
      { path: "/tasks/create", element: <TaskCreate /> },
      { path: "/categories", element: <Categories /> },
      { path: "/categories/create", element: <CategoryCreate /> },
      { path: "/admin", element: <Admin /> },
      { path: "/admin/users/create", element: <AdminUserCreate /> },
    ],
  },
])
