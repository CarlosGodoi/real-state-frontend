import axios from "axios";

const baseApi =
  process.env.NEXT_PUBLIC_BASE_API || "http://192.168.18.215:3334";

const NODE_ENV = process.env.NODE_ENV;

const baseFront =
  NODE_ENV == "production"
    ? process.env.NEXT_PUBLIC_BASE_FRONT_PROD
    : process.env.NEXT_PUBLIC_BASE_FRONT;

const api = axios.create({
  baseURL: baseApi,
});

export const apiFront = axios.create({
  baseURL: baseFront,
});

export default api;
