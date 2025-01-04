import { Helmet } from "react-helmet-async"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInFormSchema = z.object({
  username: z.string().min(1, "Enter a valid username"),
  password: z.string().min(1, "Enter a valid password")
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema)
  })

  function handleSignIn(data: SignInForm) {
    console.log("data: ", data)
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8 w-full">
        <div className="flex w-full md:w-[350px] flex-col justify-center gap-6 m-auto">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access the dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Search for your favorite pokemons
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Your username</Label>
              <Input
                id="username"
                type="text"
                {...register("username")}
                data-error={errors.username ? true : false}
                className="data-[error=true]:border-red-500"
              />
              {errors.username && (
                <span
                  data-testid="error-message"
                  className="text-red-600 text-sm font-semibold"
                >
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Your password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                data-error={errors.password ? true : false}
                className="data-[error=true]:border-red-500"
              />
              {errors.password && (
                <span
                  data-testid="error-message"
                  className="text-red-600 text-sm font-semibold"
                >
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
