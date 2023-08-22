"use client";
import { IImmobiles } from "@/app/interfaces/GetImmobiles";
import Loanding from "@/components/loading";
import { PageBack } from "@/components/pageBack";
import { Search } from "@/components/search";
import { useRequest } from "@/context/apiRequestContext";
import useDebounce from "@/hooks/useDebounce";
import { deleteImmobileById } from "@/services/immobiles/delete";
import { getAllImmobiles } from "@/services/immobiles/getAll";
import { Bed, Ruler, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Releases() {
  const { apiRequest } = useRequest();
  const [allImmobiles, setAllImmobiles] = useState<IImmobiles[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState("");

  const router = useRouter();

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setLoading(true);
    getAllImmobiles()
      .then((res: { imoveis: IImmobiles[]; total: number }) => {
        setAllImmobiles(res.imoveis);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    (async () => {
      await apiRequest("get", "/api/immobiles", {
        params: {
          search: "",
        },
      });
    })();
  }, [apiRequest]);

  const handleSearch = async () => {
    await apiRequest("get", "/api/immobiles", {
      params: {
        search,
      },
    })
      .then((resp) => {
        setAllImmobiles(resp.data.imoveis);
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
          setAllImmobiles(resp.data.imoveis);
        })
        .catch((err) => console.log(err));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleDelete = async (id: string) => {
    const idSelected = allImmobiles.findIndex((item) => item.id === id);

    try {
      if (idSelected !== -1) {
        const newListImmobiles = allImmobiles.filter(
          (immobile) => immobile.id !== id
        );

        await deleteImmobileById(id);

        setAllImmobiles(newListImmobiles);
      } else {
        console.error("Imóvel não encontrado para exclusão.");
      }
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
    }
  };

  return (
    <>
      <div className="flex p-3">
        <PageBack href="/immobiles" />
      </div>
      <div className="w-full flex flex-col items-center pt-9 pb-6">
        <Search
          value={search}
          handleChange={({ target: { value } }) => {
            setSearch(value);
          }}
          onClick={handleSearch}
        />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-3 pt-4 pb-4 bg-zinc-100">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loanding />
          </div>
        ) : allImmobiles.length > 0 ? (
          allImmobiles.map((immobile) => {
            const srcImage = immobile.ImageImovel[0]?.path;

            return (
              <div
                key={immobile.id}
                className="w-[300px] flex flex-col justify-between items-center gap-2 border-2 bg-white rounded-md">
                <div
                  className="w-full h-44 bg-zinc-100 relative object-contain cursor-pointer"
                  onClick={() =>
                    router.push(`/immobiles/detailing/${immobile.id}`)
                  }>
                  {immobile.ImageImovel.length > 0 ? (
                    <Image src={srcImage} alt="Imagem do Imóvel" fill={true} />
                  ) : (
                    <p>Não há imagens</p>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center mt-2 gap-3">
                  <span>Nome do imóvel</span>
                  <p className="font-thin text-sm text-medium_secondary">
                    {immobile.endereco.bairro} - {immobile.endereco.cidade}
                  </p>
                  <div className="flex justify-around items-center gap-5 mt-4">
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
                  <button
                    type="submit"
                    className="w-full flex justify-end mr-3"
                    onClick={() => handleDelete(immobile.id)}>
                    <Trash size={25} className="text-white cursor-pointer" />
                  </button>
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
