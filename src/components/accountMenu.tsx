import { ChevronDown, LogOut } from "lucide-react"
import { Dialog } from "./ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

export function AccountMenu() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [getUsername, setUsername] = useState("")

  function handleSignOut() {
    if (isAuthenticated) {
      localStorage.removeItem("user")
      navigate("/sign-in")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const getUser = localStorage.getItem("user")
      if (getUser) {
        const parseUser = JSON.parse(getUser)
        setUsername(parseUser.username)
      }
    }
  }, [isAuthenticated])

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {!getUsername ? <Skeleton className="h-4 w-10" /> : getUsername}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <button className="w-full" onClick={() => handleSignOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
