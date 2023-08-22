import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editImmobileSchema = z
  .object({
    quantidadeQuartos: z.number().nullable(),
    area: z.number().nullable(),
    preco: z.number().nullable(),
    tipoContrato: z.enum(["VENDA", "ALUGUEL"]),
    status: z.enum(["NEGOCIACAO", "VENDIDO", "ALUGADO", "PENDENTE"]),
    images: z.array(z.string()).nullable(),
    endereco: z.object({
      rua: z.string().trim().min(1, { message: "Rua é obrigatório." }),
      bairro: z.string().trim().min(1, { message: "Rua é obrigatório." }),
      cidade: z.string().trim().min(1, { message: "Rua é obrigatório." }),
      numero: z.number().nullable(),
      cep: z.string(),
    }),
  })
  .required();

export const resolver = zodResolver(editImmobileSchema);

export type FormData = z.infer<typeof editImmobileSchema>;

export const defaultValues: FormData = {
  quantidadeQuartos: null,
  area: null,
  preco: null,
  tipoContrato: "ALUGUEL",
  status: "PENDENTE",
  images: ([] as string[]) || null,
  endereco: {
    rua: "",
    bairro: "",
    cidade: "",
    numero: null,
    cep: "",
  },
};
