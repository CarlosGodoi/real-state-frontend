"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { defaultValues, resolver, FormData } from "../schema";
import { registerImmobile } from "@/services/immobiles/create";
import Loanding from "@/components/loading";
import { useAuthContext } from "@/context/authContext";
import { PageBack } from "@/components/pageBack";
import { upload } from "@/services/immobiles/upload";
import { DropzoneImage } from "@/components/dropzone";
import { toast } from "react-toastify";
import Container from "@/components/container";

export default function FormRegisterImmobile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [baseImage, setBaseImage] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);

  const [isFieldFilled, setIsFieldFilled] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  const UploadImage = async (files: File[]) => {
    setImages(files);
  };

  const role = "CORRETOR";

  const onSubmitCreateImmobile = async (data: FormData) => {
    setLoading(true);

    if (role && user.perfil) {
      registerImmobile({ ...data, images })
        .then((res) => {
          const imovelId = res?.data?.id;
          console.log(imovelId);

          if (imovelId) {
            upload(imovelId, images);
            toast("corretor criado com sucesso!", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
              position: "top-right",
              theme: "colored",
            });
          }
        })
        .catch(() => {
          console.error("Unauthorized");
          toast("Ocorreu erro ao tentar criar o imóvel", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
            position: "top-right",
            theme: "colored",
          });
        })
        .finally(() => setLoading(false));
    }
  };


  return (
    <Container>
      <>
        <div className="w-full flex p-3">
          <PageBack href="/immobiles" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmitCreateImmobile)}
          className="w-[60%] flex flex-col items-center gap-4 desktop:w-[90%] iphone_SE:gap-3 iphone_XR:w-[90%]">
          <h2 className="font-semibold text-4xl text-dark_blue mt-8">
            Cadastro de imóveis
          </h2>

          <div className="w-[90%] flex items-center gap-4 mt-6 iphone_XR:flex-col ipad:flex-col iphone_SE:mt-2">
            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
              data-te-input-wrapper-init>
              <Controller
                name="area"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                        setIsFieldFilled(!!e.target.value);
                      }}
                    />
                  );
                }}
              />
              <label
                htmlFor="area"
                className={`pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] text-neutral-500 transition-all duration-200 ease-out ${
                  isFieldFilled ? "-translate-y-[0.9rem] scale-[0.8]" : ""
                } peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-focus:bg-zinc-100
  peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                Área
              </label>
              {errors.area?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.area.message}
                </p>
              )}
            </div>

            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0"
              data-te-input-wrapper-init>
              <Controller
                name="quantidadeQuartos"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  );
                }}
              />
              <label
                htmlFor="Nº de quartos"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Nº de quartos
              </label>
              {errors.quantidadeQuartos?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.quantidadeQuartos.message}
                </p>
              )}
            </div>

            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-1"
              data-te-input-wrapper-init>
              <Controller
                name="preco"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  );
                }}
              />
              <label
                htmlFor="preco"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Preço
              </label>
              {errors.preco?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.preco.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-[90%] flex items-center gap-4 iphone_SE:w-full iphone_XR:w-full flex-col ipad:flex-col">
            <div className="w-full flex gap-4 justify-center items-center iphone_XR:flex-col">
              <select
                className="w-full h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none ipad:w-[90%]"
                {...register("tipoContrato")}>
                <option value="Tipo de Contrato" disabled>
                  Tipo de contrato
                </option>
                <option value="VENDA">VENDA</option>
                <option value="ALUGUEL">ALUGUEL</option>
              </select>
              {errors.tipoContrato?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.tipoContrato.message}
                </p>
              )}
              <select
                className="w-full h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none ipad:w-[90%]"
                {...register("status")}>
                <option value="Status Imóvel" disabled>
                  Status Imóvel
                </option>
                <option value="ALUGADO">ALUGADO</option>
                <option value="VENDIDO">VENDIDO</option>
                <option value="NEGOCIACAO">NEGOCIACAO</option>
                <option value="PENDENTE">PENDENTE</option>
              </select>
              {errors.status?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col justify-center items-center"></div>
          </div>

          <div className="w-[90%] flex items-center gap-4 iphone_XR:flex-col ipad:flex-col">
            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-1"
              data-te-input-wrapper-init>
              <input
                className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                id="rua"
                type="text"
                {...register("endereco.rua")}
              />
              <label
                htmlFor="rua"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Rua
              </label>
              {errors.endereco?.rua?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.endereco.rua.message}
                </p>
              )}
            </div>

            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-0 mt-0"
              data-te-input-wrapper-init>
              <input
                className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                id="bairro"
                type="text"
                {...register("endereco.bairro")}
              />
              <label
                htmlFor="bairro"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Bairro
              </label>
              {errors.endereco?.bairro?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.endereco.bairro.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-[90%] flex items-center gap-4 iphone_XR:flex-col ipad:flex-col iphone_SE:gap-2">
            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full"
              data-te-input-wrapper-init>
              <Controller
                name="endereco.numero"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  );
                }}
              />
              <label
                htmlFor="endereco.numero"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Número
              </label>
              {errors.area?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.area.message}
                </p>
              )}
            </div>

            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-1"
              data-te-input-wrapper-init>
              <input
                className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                id="cep"
                type="text"
                {...register("endereco.cep")}
              />
              <label
                htmlFor="cep"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                CEP
              </label>
              {errors.endereco?.cep?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.endereco.cep.message}
                </p>
              )}
            </div>

            <div
              className="w-full flex flex-col items-center relative mb-3 laptop:w-[90%] ipad:w-[90%] iphone_XR:w-full iphone_SE:mb-1"
              data-te-input-wrapper-init>
              <input
                className="peer block min-h-[auto] w-full h-12 rounded-lg border-2 border-zinc-300  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary focus:border-blue-300 focus:outline-none"
                id="cidade"
                type="text"
                {...register("endereco.cidade")}
              />
              <label
                htmlFor="cidade"
                className="pointer-events-none absolute bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]  peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
          peer-focus:bg-zinc-100
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                Cidade
              </label>
              {errors.endereco?.cidade?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.endereco.cidade.message}
                </p>
              )}
            </div>
          </div>

          <DropzoneImage
            id="images"
            name="images"
            type="file"
            onUploadImage={UploadImage}
            onSetBaseImage={setBaseImage}
          />

          <button
            type="submit"
            className="flex justify-center items-center w-96 h-12 border-2 rounded-lg bg-light_blue text-white mt-6 focus:border-blue-300 focus:outline-none iphone_XR:w-[90%] ipad:w-[90%]">
            {loading ? <Loanding /> : "Enviar"}
          </button>
        </form>
      </>
    </Container>
  );
}
