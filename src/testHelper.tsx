import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { HelmetProvider } from "react-helmet-async"
import { MemoryRouter } from "react-router-dom"

export const renderWithProviders = (
  children: ReactNode,
  { initialEntries = ["/"], ...options }
) => {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </HelmetProvider>,
    options
  )
}
