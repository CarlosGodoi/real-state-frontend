"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [isFieldFilled, setIsFieldFilled] = useState(false);
  const isAuthenticated = useAuthContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    control,
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  const onSubmitCreateAccount = async (data: FormData) => {
    setLoading(true);
    const userPerfil = isAuthenticated.user.perfil.toString();
    console.log("PERFIL=>", userPerfil);

    if (userPerfil !== "CORRETOR" && userPerfil !== "ADMIN") {
      toast("corretor criado com sucesso!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "top-right",
        theme: "colored",
      });
    }
    registerBroker(data)
      .then((res) => {
        console.log("RESP=>", res?.data);

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
      .catch(() => informError("Ocorreu um erro ao tentar cadastrar os dados!"))
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <div className="w-full flex p-3">
        <PageBack href="/immobiles" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmitCreateAccount)}
        className="w-1/2 h-screen flex flex-col justify-center items-center gap-4 iphone_XR:w-full ipad:w-full">
        <h2 className="font-semibold text-4xl text-medium_blue mb-6">
          Cadastre seu corretor
        </h2>
        <div
          className="w-4/5 flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
          data-te-input-wrapper-init>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setIsFieldFilled(!!e.target.value);
                  }}
                />
              );
            }}
          />
          <label
            htmlFor="nome"
            className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
              isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
            } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
            Nome
          </label>
          {errors.nome?.message && (
            <p className="text-xs text-red-500 mt-2">{errors.nome.message}</p>
          )}
        </div>

        <div
          className="w-4/5 flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
          data-te-input-wrapper-init>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                  type="email"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setIsFieldFilled(!!e.target.value);
                  }}
                />
              );
            }}
          />
          <label
            htmlFor="email"
            className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
              isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
            } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
            E-mail
          </label>
          {errors.email?.message && (
            <p className="text-xs text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div
          className="w-4/5 flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
          data-te-input-wrapper-init>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                  type="tel"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setIsFieldFilled(!!e.target.value);
                  }}
                />
              );
            }}
          />
          <label
            htmlFor="telefone"
            className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
              isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
            } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
            Telefone
          </label>
          {errors.telefone?.message && (
            <p className="text-xs text-red-500 mt-2">
              {errors.telefone.message}
            </p>
          )}
        </div>

        <div
          className="w-4/5 flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
          data-te-input-wrapper-init>
          <Controller
            name="perfil"
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setIsFieldFilled(!!e.target.value);
                  }}
                />
              );
            }}
          />
          <label
            htmlFor="perfil"
            className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
              isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
            } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
            Perfil
          </label>
          {errors.perfil?.message && (
            <p className="text-xs text-red-500 mt-2">{errors.perfil.message}</p>
          )}
        </div>

        <div
          className="w-4/5 flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
          data-te-input-wrapper-init>
          <Controller
            name="senha"
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                  type="password"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setIsFieldFilled(!!e.target.value);
                  }}
                />
              );
            }}
          />
          <label
            htmlFor="senha"
            className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
              isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
            } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
            Senha
          </label>
          {errors.senha?.message && (
            <p className="text-xs text-red-500 mt-2">{errors.senha.message}</p>
          )}
        </div>

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
