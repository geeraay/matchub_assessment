import axios from "axios"
import { User } from "../types/User"
import authHeader from "./AuthHeader"

const API_URL = "http://localhost:3001/api/v1/users"

export const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() })
}

export const getUser = async (id: number) => {
  return axios
    .get(API_URL + "/" + id, { headers: authHeader() })
    .then((response) => {
      return response.data
    })
}

export const editUser = async (id: number, user: User) => {
  return axios
    .put(API_URL + "/" + id, user, { headers: authHeader() })
    .then((response) => {
      return response.data
    })
}

export const deleteUser = async (id: number) => {
  return axios
    .delete(API_URL + "/" + id, { headers: authHeader() })
    .then((response) => {
      return response.data
    })
}
