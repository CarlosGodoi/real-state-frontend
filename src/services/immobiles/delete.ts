import { apiFront } from "../api";

export const deleteImmobileById = async (id: string) => {
  try {
    return apiFront.delete(`/api/immobiles/${id}`);
  } catch (error) {
    Promise.reject(error);
  }
};
