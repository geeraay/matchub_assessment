import { PropsWithChildren, useEffect } from "react"
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import { useAuthState } from "../../contexts/AuthContext"
import FullPageLoader from "../FullPageLoader"

export default function Private(props: PropsWithChildren) {
  const { authenticated, loading } = useAuthState()
  let navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (!loading && !authenticated) {
      // Redirect route, you can point this to /login
      navigate("/auth/")
    }
  }, [loading, authenticated, navigate])

  if (loading || !authenticated) {
    return <FullPageLoader />
  }

  return <Outlet />
}
