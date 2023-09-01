import { apiFront } from "../api";
import { getCookie } from "cookies-next";
import api from "../api";

interface IAddress {
  rua: string;
  bairro: string;
  cidade: string;
  numero: number | null;
  cep: string;
}

interface ICreateImmobile {
  quantidadeQuartos: number | null;
  area: number | null;
  preco: number | null;
  tipoContrato: string;
  status: string;
  endereco: IAddress;
  images?: File[];
}

export const registerImmobile = async (data: ICreateImmobile) => {
  try {
    const parseData = data;

    delete parseData.images;
    const response = await apiFront.post("/api/immobiles", parseData);

    if (data.images && data.images.length) {
      const id = response.data.id as string;

      const formData = new FormData();

      data.images?.forEach((el) => {
        formData.append("files", el);
      });

      return await api.post(`imoveis/images/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")?.toString()}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
