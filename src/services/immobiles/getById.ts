import { apiFront } from "../api";

export const getImmobileById = async (id: string) => {
  try {
    return apiFront.get(`/api/immobiles/${id}`);
  } catch (error) {
    Promise.reject(error);
  }
};
