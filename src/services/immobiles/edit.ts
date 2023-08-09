import {apiFront as api} from "../api"

interface ICreateImmobile {
  id: string,
  preco: number | null,
  tipoContrato: string,
  status: string,
}

export const registerImmobile = async (data: ICreateImmobile) => {
  try {
    return api.post<ICreateImmobile>(`/api/immobiles/${data.id}`, data)
  } catch (error) {
    Promise.reject(error)
  }
}