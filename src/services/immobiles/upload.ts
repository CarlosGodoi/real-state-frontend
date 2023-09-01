// import { apiFront as api } from "../api";
import { getCookie } from "cookies-next";
import api from "../api";

interface IUploadImage {
  images: File[];
}

export const upload = async (imovelId: string, data: File[]) => {
  const formData = new FormData();

  data.forEach((image) => {
    formData.append("image", image);
  });

  try {
    return api.post<IUploadImage>(`/imovel/images/${imovelId}`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie("token")?.toString()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    Promise.reject(error);
  }
};
