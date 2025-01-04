import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./pages/_layouts/AppLayout"
import { AuthLayout } from "./pages/_layouts/AuthLayout"
import { Dashboard } from "./pages/app/Dashboard"
import { SignIn } from "./pages/auth/SignIn"
import { NotFound } from "./pages/404"
import { Error } from "./pages/Error"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])
