import { StatusImovel } from "@/utils/selectEnum";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IAddress {
  rua: string;
  bairro: string;
  cidade: string;
  numero: number;
  cep: string;
}

interface IImage {
  path: string | StaticImport;
}

interface IImmobiles {
  id: string;
  tipoContrato: "VENDA" | "ALUGUEL";
  quantidadeQuartos: number;
  area: number;
  preco: number;
  status: StatusImovel;
  createdAt: Date;
  endereco: IAddress;
  ImageImovel: IImage[];
}

export type { IImmobiles };
