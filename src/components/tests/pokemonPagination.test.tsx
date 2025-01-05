import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render } from "@testing-library/react"
import { PokemonPagination } from "../pokemonPagination"

const onPaginationFn = vi.fn()

describe("<PokemonPagination />", () => {
  beforeEach(() => {
    onPaginationFn.mockClear()
  })

  it("should be able to navigate to the next page", async () => {
    const wrapper = render(
      <PokemonPagination
        totalCount={200}
        pageIndex={1}
        perPage={10}
        onPageChange={onPaginationFn}
      />
    )

    const user = userEvent.setup()

    const nextPageButton = wrapper.getByRole("button", {
      name: "Next"
    })

    await user.click(nextPageButton)
    expect(onPaginationFn).toHaveBeenCalled()
    expect(onPaginationFn).toHaveBeenCalledWith(11)
  })

  it("should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <PokemonPagination
        totalCount={200}
        pageIndex={10}
        perPage={10}
        onPageChange={onPaginationFn}
      />
    )

    const user = userEvent.setup()

    const previousPageButton = wrapper.getByRole("button", {
      name: "Previous"
    })

    await user.click(previousPageButton)
    expect(onPaginationFn).toHaveBeenCalled()
    expect(onPaginationFn).toHaveBeenCalledWith(0)
  })
})
