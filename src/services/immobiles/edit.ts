import { apiFront as api } from "../api";

interface IEditImmobile {
  preco: number | null;
  tipoContrato: string;
  status: string;
}

export const editImmobile = async (imovelId: string, data: IEditImmobile) => {
  try {
    return api.put<IEditImmobile>(`/api/immobiles/${imovelId}`, {
      preco: data.preco,
      tipoContrato: data.tipoContrato,
      status: data.status,
    });
  } catch (error) {
    Promise.reject(error);
  }
};
