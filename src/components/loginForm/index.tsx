"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { resolver, defaultValues, FormData } from "./schema";
import Loanding from "../loading";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import Container from "../container";
import { toast } from "react-toastify";

export default function FormLogin() {
  const { signIn } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFieldFilled, setIsFieldFilled] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  const onSubmitForm = async ({ email, senha }: FormData) => {
    setLoading(true);
    const { status } = await signIn({ email, senha }).finally(() =>
      setLoading(false)
    );

    if (status) {
      toast("Login realizado!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "top-right",
        theme: "colored",
      });
      router.push("/immobiles");
    } else {
      toast("Usuário ou senha inválidos!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-4/5 flex flex-col justify-center items-center gap-4 ipad:w-full">
        <h2 className="font-semibold text-5xl text-dark_blue mb-6">Login</h2>

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
          className="flex justify-center items-center w-3/5 h-12 border-2 rounded-lg bg-light_blue font-medium text-white mt-5 focus:border-blue-300 focus:outline-none"
          disabled={!isDirty}>
          {loading ? <Loanding /> : "Entrar"}
        </button>
      </form>
    </Container>
  );
}
