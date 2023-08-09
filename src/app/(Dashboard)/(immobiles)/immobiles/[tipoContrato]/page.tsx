'use client';

import { IImmobiles } from '@/app/interfaces/GetImmobiles';
import Loanding from '@/components/loading';
import { Search } from '@/components/search';
import { useImmobilesContext } from '@/context/ImmobilesContext';
import { useRequest } from '@/context/apiRequestContext';
import { ArrowLeft, Bed, Ruler } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IParams {
  params: {
    tipoContrato: string;
  };
}

export default function Page({ params }: IParams) {
  const { searchImmobiles, handleSearch } = useImmobilesContext();
  const [resultTabImmobiles, setResultTabImmobiles] = useState<IImmobiles[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { apiRequest } = useRequest();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await apiRequest('get', '/api/immobiles', {
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
  console.log('Imoveis=>', resultTabImmobiles);

  return (
    <>
      <div className="flex p-3">
        <Link
          href={'/immobiles'}
          className="flex items-center gap-1 border-b-2 border-medium_secondary mt-2"
        >
          <ArrowLeft size={20} className="text-dark_blue" />
          <p className="text-dark_blue">Voltar</p>
        </Link>
      </div>
      <div className="w-full flex justify-center pt-9 pb-6">
        <Search
          value=""
          handleChange={({ target: { value } }) => handleSearch(value)}
          onClick={() => console.log('clicou')}
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
                className="w-[300px] flex flex-col justify-between items-center gap-2 border-2 bg-white rounded-md "
              >
                <div className="w-full flex justify-center items-center h-44 bg-zinc-100 relative object-contain">
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
