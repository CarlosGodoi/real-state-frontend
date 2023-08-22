// import { apiFront as api } from "../api";
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
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    Promise.reject(error);
  }
};
