import apiFront from "../api";

interface IRgisterBroker {
  nome: string;
  email: string;
  telefone: string;
  perfil: string;
  senha: string;
}

export const registerBroker = async (data: IRgisterBroker) => {
  try {
    return await apiFront.post("/users", { ...data });
  } catch (error) {
    Promise.reject(error);
  }
};
