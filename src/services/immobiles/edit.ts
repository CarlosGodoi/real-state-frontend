import { apiFront } from "../api";

interface IEditImmobile {
  preco: number | null;
  tipoContrato: string;
  status: string;
}

export const editImmobile = async (imovelId: string, data: IEditImmobile) => {
  try {
    return apiFront.put<IEditImmobile>(`/api/immobiles/${imovelId}`, {
      preco: data.preco,
      tipoContrato: data.tipoContrato,
      status: data.status,
    });
  } catch (error) {
    Promise.reject(error);
  }
};
