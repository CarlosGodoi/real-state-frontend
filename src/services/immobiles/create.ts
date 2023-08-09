import {apiFront as api} from "../api"

interface IAddress {
  rua: string,
  bairro: string,
  cidade: string,
  numero: number | null,
  cep: string,
}

interface ICreateImmobile {
  quantidadeQuartos: number | null,
  area: number | null,
  preco: number | null,
  tipoContrato: string,
  status: string,
  endereco: IAddress
  images:string[] | null
}

export const registerImmobile = async (data: ICreateImmobile) => {
  try {
    return api.post<ICreateImmobile>('/api/immobiles', data)
  } catch (error) {
    Promise.reject(error)
  }
}