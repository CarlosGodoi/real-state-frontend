import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
  
  const loginSchema = z.object({
    nome: z.string().trim().min(1, { message: 'E-mail é obrigatório' }),
    email: z.string().email().min(1, {message: 'E-mail obrigatório'}),
    telefone: z.string().trim().min(1, { message: 'Telefone é obrigatório' }),
    senha: z.string().min(6, { message: 'Senha é obrigatória' }),
  }).required();

  export const resolver = zodResolver(loginSchema)

  export type FormData = z.infer<typeof loginSchema>;

  export const defaultValues: FormData ={
    nome: '',
    email:'',
    telefone: '',
    senha:'',
  }