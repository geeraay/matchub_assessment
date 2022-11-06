import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthDispatch } from "../../../contexts/AuthContext"

export default function Logout() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }, [dispatch, navigate])
  return <div>Logout</div>
}
