import axios from 'axios'
const baseApi = process.env.NEXT_PUBLIC_BASE_API || "http://192.168.18.215:3334"
const baseFront = process.env.NEXT_PUBLIC_BASE_FRONT || "http://localhost:3000"

const api = axios.create({
  baseURL: baseApi
})

 export const apiFront = axios.create({
  baseURL:baseFront
})



export default api

