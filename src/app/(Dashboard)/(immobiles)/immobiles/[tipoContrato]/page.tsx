"use client";

import { IImmobiles } from "@/app/interfaces/GetImmobiles";
import Loanding from "@/components/loading";
import { Search } from "@/components/search";
import { useRequest } from "@/context/apiRequestContext";
import useDebounce from "@/hooks/useDebounce";
import { ArrowLeft, Bed, Ruler, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import camera from "../../../../../../public/assets/camera.svg";

interface IParams {
  params: {
    tipoContrato: string;
  };
}

export default function Page({ params }: IParams) {
  const [resultTabImmobiles, setResultTabImmobiles] = useState<IImmobiles[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { apiRequest } = useRequest();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await apiRequest("get", "/api/immobiles", {
        params: { tipoContrato: params.tipoContrato },
      })
        .then(({ data }) => {
          if (data) setResultTabImmobiles(data.imoveis);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tipoContrato]);

  const handleSearch = async () => {
    await apiRequest("get", "/api/immobiles", {
      params: {
        search: { tipoContrato: params.tipoContrato },
      },
    })
      .then((resp) => {
        setResultTabImmobiles(resp.data.imoveis);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    (async () => {
      await apiRequest("get", "/api/immobiles", {
        params: {
          search: debouncedSearch,
        },
      })
        .then((resp) => {
          setResultTabImmobiles(resp.data.imoveis);
        })
        .catch((err) => console.log(err));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <div className="flex p-3">
        <Link
          href={"/immobiles"}
          className="flex items-center gap-1 border-b-2 border-medium_secondary mt-2">
          <ArrowLeft size={20} className="text-dark_blue" />
          <p className="text-dark_blue">Voltar</p>
        </Link>
      </div>
      <div className="w-full flex justify-center pt-9 pb-6">
        <Search
          value={search}
          handleChange={({ target: { value } }) => setSearch(value)}
          onClick={handleSearch}
        />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-3 pt-4 pb-4 bg-zinc-100 m-auto relative">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loanding />
          </div>
        ) : resultTabImmobiles.length > 0 ? (
          resultTabImmobiles.map((immobile) => {
            const srcImage = immobile.ImageImovel[0]?.path;

            return (
              <div
                key={immobile.id}
                className="w-[300px] flex flex-col justify-between items-center gap-2 border-2 bg-white rounded-md ">
                <div className="w-full flex justify-center items-center h-44 bg-zinc-100 relative object-contain">
                  {immobile.ImageImovel.length > 0 ? (
                    <Image src={srcImage} alt="Imagem do Imóvel" fill={true} />
                  ) : (
                    <div className="w-full h-44 flex justify-center items-center">
                      <Image
                        src={camera}
                        alt="Imagem de uma câmera fotografica"
                        width={70}
                        height={70}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center mt-2 gap-3">
                  <span>Nome do imóvel</span>
                  <p className="font-thin text-sm text-medium_secondary">
                    {immobile.endereco.bairro} - {immobile.endereco.cidade}
                  </p>
                  <div className="flex justify-between items-center gap-5 mt-4">
                    <div className="flex flex-col items-center gap-2">
                      <p>Status</p>
                      <span className="font-body text-xs">
                        {immobile.tipoContrato}
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Ruler size={25} />
                      <span className="font-body">{immobile.area}m2</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Bed size={25} />
                      <span className="font-body">
                        {immobile.quantidadeQuartos}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-1 pt-2 pb-2 bg-zinc-900 border-2">
                  <div className="w-full flex justify-end mr-3">
                    <Trash
                      size={25}
                      className="text-white font-bold cursor-pointer"
                      onClick={() => console.log("clicou")}
                    />
                  </div>
                  <p className="font-normal text-sm text-white">A partir de:</p>
                  <span className="font-body text-white">
                    R${immobile.preco}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p>Não há imóveis</p>
        )}
      </div>
    </>
  );
}
