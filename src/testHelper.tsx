import { QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { HelmetProvider } from "react-helmet-async"
import { MemoryRouter } from "react-router-dom"
import { queryClient } from "./lib/react-query"

export const renderWithProviders = (
  children: ReactNode,
  { initialEntries = ["/"], ...options }
) => {
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
    options
  )
}
