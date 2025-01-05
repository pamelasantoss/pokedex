import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pokedex" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
