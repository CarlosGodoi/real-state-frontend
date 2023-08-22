"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resolver, FormData, defaultValues } from "../schema";
import Loanding from "@/components/loading";
import { registerBroker } from "@/services/user/registerBroker";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import informError from "@/utils/error";
import { useAuthContext } from "@/context/authContext";
import Container from "@/components/container";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { PageBack } from "@/components/pageBack";

export default function RegisterBroker() {
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = useAuthContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  const onSubmitCreateAccount = async (data: FormData) => {
    setLoading(true);
    const userPerfil = isAuthenticated.user.perfil.toString();
    if (userPerfil === "CORRETOR") {
      registerBroker(data)
        .then((res) => {
          if (res) {
            toast("corretor criado com sucesso!", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
              position: "top-right",
              theme: "colored",
            });
            router.push("/immobiles");
          }
        })
        .catch(informError("Não foi possível cadastrar na plataforma."))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Container>
      <div className="w-full flex p-3">
        <PageBack href="/immobiles" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmitCreateAccount)}
        className="w-3/5 h-screen flex flex-col justify-center items-center gap-4 iphone_XR:w-full ipad:w-full">
        <h2 className="font-semibold text-4xl text-medium_blue mb-6">
          Cadastre seu corretor
        </h2>
        <input
          className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
          type="text"
          placeholder="Nome"
          {...register("nome")}
        />
        {errors.nome?.message && (
          <p className="text-xs text-red-500">{errors.nome.message}</p>
        )}
        <input
          className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        <input
          className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
          type="tel"
          placeholder="Telefone"
          {...register("telefone")}
        />
        {errors.telefone?.message && (
          <p className="text-xs text-red-500">{errors.telefone.message}</p>
        )}
        <input
          className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
          type="text"
          placeholder="Perfil"
          {...register("perfil")}
        />
        {errors.perfil?.message && (
          <p className="text-xs text-red-500">{errors.perfil.message}</p>
        )}
        <input
          className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
          type="password"
          placeholder="Senha"
          {...register("senha")}
        />
        {errors.senha?.message && (
          <p className="text-xs text-red-500">{errors.senha.message}</p>
        )}
        <button
          type="submit"
          className="flex justify-center items-center w-3/5 h-12 border-2 rounded-lg bg-light_blue text-white mt-5 focus:border-blue-700 focus:outline-none"
          disabled={!isDirty}>
          {loading ? <Loanding /> : "Enviar"}
        </button>
      </form>
    </Container>
  );
}
