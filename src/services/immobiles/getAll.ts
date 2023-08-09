import { apiFront } from '../api'

export const getAllImmobiles = async (data?:{take:number,skip:number,search?:string,filter?:string}) => {
  try {
    let urlApi = "api/immobiles"
    const params = { ...data } as any;
    const urlSearch = new URLSearchParams(params).toString();
    if(data) urlApi+=`?${urlSearch}`
   const res = await apiFront.get(urlApi)
    
   return Promise.resolve(res.data)
  } catch (error) {
    Promise.reject(error)
  }
}