'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData, defaultValues, resolver } from '../schema';
import { createAccount } from '@/services/user/createAccount';
import { useRouter } from 'next/navigation';
import Loanding from '@/components/loading';

export default function SingUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver,
    defaultValues,
  });

  const onSubmitCreateAccount = async (data: FormData) => {
    setLoading(true);
    createAccount(data)
      .then((res) => {
        if (res) router.push('/');
      })
      .catch(() => console.error('Ocorreu um erro ao enviar os dados'))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitCreateAccount)}
      className="w-3/5 h-full flex flex-col justify-center items-center gap-4"
    >
      <h2 className="font-semibold text-4xl text-blue-900 mb-6">Cadastre-se</h2>
      <input
        className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
        type="text"
        placeholder="Nome"
        {...register('nome')}
      />
      {errors.nome?.message && (
        <p className="text-xs text-red-500">{errors.nome.message}</p>
      )}
      <input
        className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
        type="email"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email?.message && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}
      <input
        className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
        type="tel"
        placeholder="Telefone"
        {...register('telefone')}
      />
      {errors.telefone?.message && (
        <p className="text-xs text-red-500">{errors.telefone.message}</p>
      )}
      <input
        className="w-4/5 h-12 border-2 border-zinc-200 rounded-lg focus:border-blue-400 focus:outline-none"
        type="password"
        placeholder="Senha"
        {...register('senha')}
      />
      {errors.senha?.message && (
        <p className="text-xs text-red-500">{errors.senha.message}</p>
      )}
      <button
        type="submit"
        className="flex justify-center items-center w-3/5 h-12 border-2 rounded-lg bg-blue-500 text-white mt-5 focus:border-blue-700 focus:outline-none"
        disabled={!isDirty}
      >
        {loading ? <Loanding /> : 'Enviar'}
      </button>
    </form>
  );
}
