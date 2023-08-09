import api from "../api";

interface ICreateAccount {
  nome: string,
  email: string,
  telefone: string,
  senha: string,
}

export const createAccount = async (data: ICreateAccount) => {
  try {
    return await api.post('/users', {...data})
  } catch (error) {
    Promise.reject(error)
  }
}