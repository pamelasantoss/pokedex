import { cleanup } from "@testing-library/react"
import { SignIn } from "../SignIn"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../testHelper"

describe("<SignIn />", () => {
  afterEach(() => {
    cleanup()
  })

  it("should render the sign in form with clean fields", () => {
    const wrapper = renderWithProviders(<SignIn />, {
      initialEntries: ["/sign-in"]
    })

    const usernameField = wrapper.getByRole("textbox", {
      name: "Your username"
    })
    expect(usernameField).toHaveValue("")

    const passwordField = wrapper.getByLabelText("Your password")
    expect(passwordField).toHaveValue("")

    const submitButton = wrapper.getByRole("button", { name: "Sign in" })
    expect(submitButton).toBeInTheDocument()
  })

  it("should display error messages after submit an empty form", async () => {
    const wrapper = renderWithProviders(<SignIn />, {
      initialEntries: ["/sign-in"]
    })

    const user = userEvent.setup()

    const submitButton = wrapper.getByRole("button", { name: "Sign in" })
    await user.click(submitButton)

    const errorMessages = wrapper.getAllByTestId("error-message")
    expect(errorMessages).toHaveLength(2)
  })
})
