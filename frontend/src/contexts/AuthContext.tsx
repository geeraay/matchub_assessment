import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react"
import { User } from "../types/User"

type AuthState = {
  authenticated: boolean
  user: User | null
  loading: boolean
  token: string | null
}
type Action =
  | { type: "LOGIN"; payload: User | null }
  | { type: "POPULATE"; payload: User }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" }
  | { type: "LOADING" }
type Dispatch = React.Dispatch<Action>

const initialState = {
  authenticated: false,
  user: null,
  loading: true,
  token: null,
}
const StateContext = createContext<AuthState>(initialState)
const DispatchContext = createContext((type: Action) => {})

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      }
    case "LOGOUT":
      localStorage.removeItem("token")
      return {
        ...state,
        authenticated: false,
        user: null,
      }
    case "POPULATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      }
    case "LOADING":
      return {
        ...state,
        loading: true,
      }
    default:
      throw new Error("Unknown action type")
  }
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token === null || token === undefined) {
          return
        }
        if (
          Date.now() >=
          JSON.parse(window.atob(token.split(".")[1])).exp * 1000
        ) {
          return
        }
        const res = JSON.parse(localStorage.getItem("user") || "{}")

        dispatch({ type: "LOGIN", payload: res })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        localStorage.removeItem("token")
      } finally {
        dispatch({ type: "STOP_LOADING" })
      }
    }
    loadUser()
  }, [])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch: () => Dispatch = () =>
  useContext(DispatchContext)
