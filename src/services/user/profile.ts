import {apiFront} from "../api";

export const profile = async (id: string) => {
  try {
    return await apiFront.get(`/usuario/`,{params: {id}})
  } catch (error) {
    Promise.reject(error)
  }
}