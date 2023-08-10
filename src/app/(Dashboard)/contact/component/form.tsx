'use client'

import Container from "@/components/container";
import { useForm } from "react-hook-form";
import { FormData, resolver, defaultValues } from "../schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loanding from "@/components/loading";

export const FormContact: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const {   handleSubmit,
    register,
    reset,
    formState: { errors},
  } = useForm<FormData>({
    resolver, defaultValues
  })  

  const handleSubmitForm = async (data: FormData) => {
    console.log(data);
    setLoading(true)
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
      reset()
      toast('corretor criado com sucesso!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-right',
        theme: 'colored',
      });
      router.push('/immobiles');
      
    } catch (error) {
      toast('Ocorreu um erro ao enviar o formulário', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-right',
        theme: 'colored',
      });      
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <div className="w-full flex flex-col items-center mt-14 mb-10 iphone_SE:mt-5">
        <h2 className="font-serif text-3xl text-medium_blue iphone_SE:w-full text-center mt-8">
          Como podemos lhe ajudar?
        </h2>
        <div className="w-1/2 flex justify-center items-center iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <select className="w-[60%] h-14 border-dark_secondary rounded-xl mt-9 iphone_SE:mt-6"  {...register('assunto')} name="assunto">
            <option disabled value="...">
              ...
            </option>
            <option value="LOCAÇÃO">Locação</option>
            <option value="VENDA">Venda</option>
            <option value="ADMINISTRATIVO">Administrativo</option>
          </select>
          {errors.assunto?.message && (
              <p className="text-xs text-red-500 mt-2">
                {errors.assunto.message}
              </p>
            )}
        </div>
        <div className="w-full flex flex-col items-center gap-4 mt-20 iphone_SE:mt-8 iphone_XR:mt-8">
          <span className="w-[70%] font-thin border-2 border-b-zinc-100 opacity-50"></span>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="w-2/4 flex flex-col items-center mt-6 gap-4 laptop:w-[90%] iphone_SE:w-[90%] iphone_XR:w-[90%]">
            <div className="w-full flex gap-3 iphone_SE:w-[90%] iphone_SE:flex-col iphone_XR:flex-col">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="Nome" className="font-thin text-medium_blue">
                  Nome
                </label>
                <input
                  className="h-14 border-dark_secondary rounded-xl"
                  type="text"
                  {...register('nome')}
                  name="nome"
                />
            {errors.nome?.message && (
              <p className="text-xs text-red-500 mt-2">
                {errors.nome.message}
              </p>
            )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="font-thin text-medium_blue">
                  E-mail
                </label>
                <input
                  className="h-14 border-dark_secondary rounded-xl"
                  type="text"
                  {...register('email')}
                  name="email"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 iphone_SE:w-[90%]">
              <label htmlFor="mensagem" className="font-thin text-medium_blue ">
                Mensagem
              </label>
              <textarea
                className="h-40 border-dark_secondary rounded-xl"
                maxLength={300}
                {...register('mensagem')}
              />
            </div>
            <button type="submit" className="flex justify-center items-center w-60 h-12 bg-light_blue text-white rounded-lg mt-6 iphone_SE:mt-3">
              {loading ? <Loanding /> : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};
