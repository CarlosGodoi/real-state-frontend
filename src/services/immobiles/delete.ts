import {apiFront as api} from "../api"


export const deleteImmobileById = async (id: string) => {
  try {
    return api.delete(`/api/immobiles/releases/${id}`)
  } catch (error) {
    Promise.reject(error)
  }
}