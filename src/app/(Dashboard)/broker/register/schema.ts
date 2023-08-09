import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
  
  const brokerSchema = z.object({
    nome: z.string().trim().min(1, { message: 'E-mail é obrigatório' }),
    email: z.string().email().min(1, {message: 'E-mail obrigatório'}),
    telefone: z.string().trim().min(1, { message: 'Telefone é obrigatório' }),
    perfil: z.string().default('CORRETOR'),
    senha: z.string().min(6, { message: 'Senha é obrigatória' }),
  }).required();

  export const resolver = zodResolver(brokerSchema)

  export type FormData = z.infer<typeof brokerSchema>;

  export const defaultValues: FormData ={
    nome: '',
    email:'',
    telefone: '',
    perfil: '',
    senha:'',
  }