import { render, screen } from "@testing-library/react"
import { App } from "./App"

describe("<App />", () => {
  it("should display Hello World as a title", () => {
    render(<App />)

    const getTitle = screen.getByText("Hello world!")
    expect(getTitle).toBeInTheDocument()
  })
})
