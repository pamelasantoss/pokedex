import { useEffect, useState } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const getUser = localStorage.getItem("user")

    if (!getUser) {
      return
    }

    setIsAuthenticated(true)
  }, [])

  return {
    isAuthenticated
  }
}
