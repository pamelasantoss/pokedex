import { Origami } from "lucide-react"
import { Outlet } from "react-router-dom"
import { useMobile } from "../../hooks/useMobile"

export function AuthLayout() {
  const { isMobile } = useMobile()

  return (
    <div className="grid min-h-screen md:grid-cols-2 antialiased">
      <div className="flex max-h-20 py-5 md:h-full md:max-h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Origami className="h-5 w-5" />
          <span className="font-semibold">Pokedex</span>
        </div>
        {!isMobile && (
          <footer className="text-sm">
            Pokemon search &copy; Pokedex - {new Date().getFullYear()}
          </footer>
        )}
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />

        {isMobile && (
          <footer className="text-sm">
            Pokemon search &copy; Pokedex - {new Date().getFullYear()}
          </footer>
        )}
      </div>
    </div>
  )
}
