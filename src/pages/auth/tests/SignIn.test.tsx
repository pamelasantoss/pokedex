import { cleanup } from "@testing-library/react"
import { SignIn } from "../SignIn"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../../testHelper"
import { vi } from "vitest"
import * as reactRouterDom from "react-router-dom"

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {})

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

  it("should display an alert if the credentials are incorrect", async () => {
    const wrapper = renderWithProviders(<SignIn />, {
      initialEntries: ["/sign-in"]
    })

    const user = userEvent.setup()

    const usernameField = wrapper.getByRole("textbox", {
      name: "Your username"
    })
    await user.type(usernameField, "admin")

    const passwordField = wrapper.getByLabelText("Your password")
    await user.type(passwordField, "123")

    const submitButton = wrapper.getByRole("button", { name: "Sign in" })
    await user.click(submitButton)

    expect(alertMock).toHaveBeenCalledWith("Wrong credentials!")
  })

  it("should not display an alert if the credentials are correct", async () => {
    const navigate = vi.fn()
    vi.spyOn(reactRouterDom, "useNavigate").mockReturnValue(navigate)

    const wrapper = renderWithProviders(<SignIn />, {
      initialEntries: ["/sign-in"]
    })

    const user = userEvent.setup()

    const usernameField = wrapper.getByRole("textbox", {
      name: "Your username"
    })
    await user.type(usernameField, "admin")

    const passwordField = wrapper.getByLabelText("Your password")
    await user.type(passwordField, "admin")

    const submitButton = wrapper.getByRole("button", { name: "Sign in" })
    await user.click(submitButton)

    expect(navigate).toHaveBeenCalledWith("/")
  })
})
