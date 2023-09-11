"use client";
import Image from "next/image";
import img_ap1 from "../../../../../public/assets/buildings-1.svg";
import img_ap2 from "../../../../../public/assets/skyscrapers.svg";
import img_ap3 from "../../../../../public/assets/buildings-2.svg";
import camera from "../../../../../public/assets/camera.svg";
import { useEffect, useState } from "react";
import { IImmobiles } from "@/app/interfaces/GetImmobiles";
import { getAllImmobiles } from "@/services/immobiles/getAll";
import { Carousel } from "flowbite-react";
import { useImmobilesContext } from "@/context/ImmobilesContext";
import { useRouter } from "next/navigation";
import { AnimatedTitle } from "./component/animatedTitle";
import { AnimatedText } from "./component/animatedText";

interface ICarouselItem {
  id: string;
  srcImage: string;
}

const CarouselItem = ({ id, srcImage }: ICarouselItem) => {
  return (
    <div className="flex justify-center items-center">
      <Image
        key={id}
        src={srcImage}
        alt={`Imagem ${id}`}
        width={600}
        height={300}
      />
    </div>
  );
};

export default function Immobiles() {
  const [immobiles, setImmobiles] = useState<IImmobiles[]>([]);
  const { handleTab, tab } = useImmobilesContext();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      await getAllImmobiles().then(
        (res: { imoveis: IImmobiles[]; total: number }) => {
          if (res) {
            setImmobiles(res?.imoveis);
          }
        }
      );
    })();
  }, []);

  console.log(immobiles);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-home_bg bg-no-repeat bg-cover iphone_XR:h-[90%] iphone_SE:w-full pt-28 pb-28">
        <h2 className="font-serif text-6xl text-white mb-10 iphone_XR:text-4xl text-center">
          Encontre seu Imóvel
        </h2>
        <div className="w-[40%] flex items-center justify-center bg-white rounded-xl laptop:w-[75%] ipad:w-[60%] iphone_XR:w-[80%] iphone_SE:w-[90%]">
          {tab.map(({ active, label, value }, index) => {
            return (
              <button
                key={index}
                type="button"
                className={`${
                  active
                    ? "bg-zinc-900 text-white rounded-e-xl"
                    : "bg-white text-zinc-900"
                } w-[50%] h-11 rounded-s-xl rounded-e-xl iphone_XR:w-[90%] iphone_SE:w-full`}
                onClick={() => {
                  handleTab(label, value);
                  router.push(`/immobiles/${value}`);
                }}>
                {label}
              </button>
            );
          })}
        </div>
        <div className="w-[40%] flex items-center justify-center mt-6 iphone_SE:w-full iphone_XR:w-full">
          <button
            type="button"
            className="w-[50%] h-8 rounded-full font-medium text-zinc-900 bg-dark_secondary hover:bg-medium_green desktop:w-[70%] laptop:w-[80%] iphone_SE:w-[70%] iphone_XR:w-[60%]"
            onClick={() => router.push("/immobiles/releases")}>
            Confira nossos lançamentos
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-zinc-100 gap-4 p-12 iphone_XR:p-0">
        <h2 className="text-4xl font-serif text-blue-950 mt-5 iphone_XR:text-2xl">
          Viva a experiência Real State
        </h2>

        <div className="w-4/5 flex justify-center items-center gap-5 pt-8 pb-8 desktop:flex-wrap">
          <div className="w-80 flex flex-col justify-center items-center gap-3 p-4">
            <Image
              className="text-blue-900"
              src={img_ap1}
              alt="Imagem de apartamento"
              width={100}
              height={100}
            />
            <h3 className="font-thin text-lg text-zinc-700">Segurança</h3>
            <span className="w-3/5 border-b-2 border-zinc-500"></span>
            <p className="font-extralight text-center text-sm text-zinc-500">
              Transparência em todas as nossas transações, ética e
              profissionalismo de nossa equipe, resultam em maior segurança para
              realização de seus investimentos.
            </p>
          </div>
          <div className="w-80 flex flex-col justify-center items-center gap-3 p-4">
            <Image
              className="text-blue-900"
              src={img_ap2}
              alt="Imagem de apartamento"
              width={100}
              height={100}
            />
            <h3 className="font-thin text-lg text-zinc-700">Alto Padrão</h3>
            <span className="w-3/5 border-b-2 border-zinc-500"></span>
            <p className="font-extralight text-center text-sm text-zinc-500">
              Nosso foco está no alto padrão. Prezamos pela alta eficiência e
              qualidade de nosso atendimento, proporcionando não só preço, mas
              uma experiência diferenciada.
            </p>
          </div>
          <div className="w-80 flex flex-col justify-center items-center gap-3 p-4">
            <Image
              className="text-blue-900"
              src={img_ap3}
              alt="Imagem de apartamento"
              width={100}
              height={100}
            />
            <h3 className="font-thin text-lg text-zinc-700">
              Gestão Imóbiliaria
            </h3>
            <span className="w-3/5 border-b-2 border-zinc-500"></span>
            <p className="font-extralight text-center text-sm text-zinc-500">
              Acreditamos na construção de vantagens através de investimento
              mobiliário, para que seja possível gerir de maneira sustentável
              seu patrimônio.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-medium_secondary gap-4 pt-[120px] pb-[120px]">
        <div className="mb-4">
          <h2 className="font-sans text-4xl text-zinc-100">
            Imóveis de alto padrão
          </h2>
        </div>
        <Carousel className="w-[50%] iphone_XR:w-[90%]">
          {immobiles?.length > 0 ? (
            immobiles
              .filter((el) => el.ImageImovel.length > 0)
              .map(({ ImageImovel, id }) => {
                const srcImage = ImageImovel[0].path as string;
                return <CarouselItem id={id} srcImage={srcImage} key={id} />;
              })
          ) : (
            <p>Não há imagem</p>
          )}
        </Carousel>
      </div>
      <div className="w-full pt-[120px] pb-[140px] flex flex-col items-center bg-zinc-100">
        <AnimatedTitle />
        <AnimatedText />
      </div>
    </>
  );
}
