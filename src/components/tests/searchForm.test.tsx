import { render } from "@testing-library/react"
import { vi } from "vitest"
import { SearchForm } from "../searchForm"
import userEvent from "@testing-library/user-event"

const onSearchFn = vi.fn()

describe("<SearchForm />", () => {
  beforeEach(() => {
    onSearchFn.mockClear()
  })

  it("should search button disabled when search input is empty", () => {
    const wrapper = render(<SearchForm onSearch={onSearchFn} />)

    const searchField = wrapper.getByPlaceholderText("Search for a pokemon")
    expect(searchField).toBeInTheDocument()

    const searchButton = wrapper.getByRole("button", {
      name: "Search"
    })
    expect(searchButton).toBeDisabled()
  })

  it("should search for a pokemon when click on search button", async () => {
    const wrapper = render(<SearchForm onSearch={onSearchFn} />)

    const user = userEvent.setup()

    const searchField = wrapper.getByPlaceholderText("Search for a pokemon")
    await user.type(searchField, "pikachu")

    const searchButton = wrapper.getByRole("button", {
      name: "Search"
    })
    expect(searchButton).toBeEnabled()

    await user.click(searchButton)
    expect(onSearchFn).toHaveBeenCalled()
    expect(onSearchFn).toHaveBeenCalledTimes(1)
  })
})
