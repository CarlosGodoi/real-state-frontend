"use client";

import { IImmobile, IImmobiles } from "@/app/interfaces/GetImmobiles";
import { PageBack } from "@/components/pageBack";
import { getAllImmobiles } from "@/services/immobiles/getAll";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { resolver, FormData, defaultValues } from "../[id]/schema";
import { StatusImovel, TipoContrato } from "@/utils/selectEnum";
import Loanding from "@/components/loading";
import { useAuthContext } from "@/context/authContext";
import { editImmobile } from "@/services/immobiles/edit";
import { useRouter } from "next/navigation";
import { getImmobileById } from "@/services/immobiles/getById";
import camera from "../../../../../../../public/assets/camera.svg";

interface IParams {
  params: {
    id: string;
  };
}

export default function DetailingImmobiles({ params }: IParams) {
  console.log(params.id);
  const [matchedImmobile, setMatchedImmobile] = useState<IImmobiles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const immobile = matchedImmobile.find((item) => item.id === params.id);
  const isAuthenticated = useAuthContext();
  const router = useRouter();
  const [imovel, setImovel] = useState<IImmobile>();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isDirty },
    control,
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  useEffect(() => {
    getImmobileById(params.id).then((resp) => {
      setImovel(resp?.data.imovel);
      if (resp) {
        console.log(resp.data.imovel);

        setValue("area", resp.data.imovel.area);
        setValue("quantidadeQuartos", resp.data.imovel.quantidadeQuartos);
        setValue("preco", resp?.data.imovel.preco);
        setValue("tipoContrato", resp?.data.imovel.tipoContrato);
        setValue("status", resp?.data.imovel.status);

        setValue("endereco.bairro", resp.data.imovel.endereco.bairro);
        setValue("endereco.rua", resp?.data.imovel.endereco.rua);
        setValue("endereco.numero", resp?.data.imovel.endereco.numero);
        setValue("endereco.cep", resp?.data.imovel.endereco.cep);
        setValue("endereco.cidade", resp?.data.imovel.endereco.cidade);
      }
    });
  }, [params.id, setValue]);

  const srcImg =
    imovel?.ImageImovel && imovel.ImageImovel[currentImageIndex]
      ? `http://localhost:3334/${imovel.ImageImovel[currentImageIndex].path}`
      : "";

  // const goToNextImage = () => {
  //   if (imovel?.ImageImovel) {
  //     let indexActual = imovel.ImageImovel.findIndex((el) => +el.id === id);

  //     if (indexActual !== -1) {
  //       let nextIndex = indexActual + 1;
  //       if (nextIndex >= imovel.ImageImovel.length) {
  //         nextIndex = 0; // Voltar para a primeira imagem se chegarmos ao final do array
  //       }
  //       // setCurrentImageIndex(imovel.ImageImovel[nextIndex]?.id);
  //       // console.log(
  //       //   "entrei aqui",
  //       //   imovel.ImageImovel && imovel.ImageImovel[nextIndex]?.id
  //       // );
  //       console.log("nextIndex:", nextIndex);
  //     }
  //   }
  // };

  // const goToPreviousImage = () => {
  //   setCurrentImageIndex(
  //     (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
  //   );
  // };

  const handleEdit = async ({ preco, tipoContrato, status }: FormData) => {
    setLoading(true);
    console.log("DATA=>", preco, tipoContrato, status);

    try {
      await editImmobile(params.id, { preco, tipoContrato, status });
      router.push("/immobiles/releases");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-zinc-50">
      <div className="w-full flex p-3">
        <PageBack href="/immobiles/releases" />
      </div>

      <div className="w-full flex flex-col items-center pt-10 pb-20">
        <h2 className="font-normal text-center text-4xl text-medium_blue mt-6">
          Detalhamento do imóvel
        </h2>
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loanding />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleEdit)}
            className="w-[50%] flex flex-col justify-between gap-3 pt-10 pb-10 laptop:flex-col iphone_XR:w-[90%] items-center">
            <div className="w-full flex justify-center items-center gap-3 mt-8 p-3 iphone_XR:w-[90%]">
              <ArrowLeft
                onClick={() => console.log("clicou")}
                className="rounded-full bg-light_blue text-white hover:bg-opacity-60"
                size={30}
              />
              <div className="flex w-[700px] h-[400px] justify-center items-center gap-2 relative object-contain">
                {imovel?.ImageImovel && imovel?.ImageImovel.length > 0 ? (
                  <Image src={srcImg} fill={true} alt={`Imagem do imóvel`} />
                ) : (
                  <div className="w-[700px] h-[400px] flex justify-center items-center border-2">
                    <Image
                      src={camera}
                      alt="Imagem de uma câmera fotografica"
                      width={70}
                      height={70}
                    />
                  </div>
                )}
              </div>
              <ArrowRight
                onClick={() => console.log("clicou")}
                className="rounded-full bg-light_blue text-white hover:bg-opacity-60"
                size={30}
              />
            </div>
            <div className="w-full flex flex-col gap-3 iphone_SE:items-center iphone_XR:items-center laptop:w-[90%]">
              <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label>Área</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("area")}
                    disabled
                    name="area"
                    type="text"
                  />
                </div>
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="quantidadeQuartos">N.º de quartos</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("quantidadeQuartos")}
                    disabled
                    name="quantidadeQuartos"
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
                <Controller
                  name="preco"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                        <label>Preço</label>
                        <input
                          className="rounded-lg"
                          {...register("preco")}
                          type="number"
                          {...field}
                          value={field.value ?? 0}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </div>
                    );
                  }}
                />
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="tipoContrato">Contrato</label>
                  <select
                    className="rounded-lg"
                    {...register("tipoContrato")}
                    name="tipoContrato">
                    {Object.values(TipoContrato).map((contrato) => (
                      <option key={contrato} value={contrato}>
                        {contrato}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="STATUS">Status</label>
                  <select
                    className="rounded-lg"
                    {...register("status")}
                    name="status">
                    {Object.values(StatusImovel).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("endereco.bairro")}
                    disabled
                    name="bairro"
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="rua">Rua</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("endereco.rua")}
                    disabled
                    name="rua"
                    type="text"
                  />
                </div>
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="numero">Número</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("endereco.numero")}
                    disabled
                    name="numero"
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="CEP">CEP</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("endereco.cep")}
                    disabled
                    name="cep"
                    type="text"
                  />
                </div>
                <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    className="rounded-lg disabled:bg-zinc-200 text-zinc-500"
                    {...register("endereco.cidade")}
                    disabled
                    name="cidade"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-5 iphone_SE:w-full items-center">
                <button
                  type="submit"
                  className="w-96 h-11 bg-light_blue text-white mt-6 rounded-lg iphone_SE:w-[90%]">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
