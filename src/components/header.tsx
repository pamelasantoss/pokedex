import { Origami } from "lucide-react"
import { AccountMenu } from "./accountMenu"

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Origami className="h-5 w-5" />
          <span className="font-semibold">Pokedex</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
