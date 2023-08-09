import api from "../api";

interface IRgisterBroker {
  nome: string,
  email: string,
  telefone: string,
  perfil: string,
  senha: string,
}

export const registerBroker = async (data: IRgisterBroker) => {
  try {
    return await api.post('/users', {...data})
  } catch (error) {
    Promise.reject(error)
  }
}