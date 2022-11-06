import axios from "axios"
import { User } from "../types/User"

const API_URL = "http://localhost:3001/api/v1/auth/"

export const register = (user: User) => {
  return axios.post(API_URL + "signup", user)
}

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      return response.data
    })
}
