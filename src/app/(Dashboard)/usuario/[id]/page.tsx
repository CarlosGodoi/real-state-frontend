"use client";

import { TUser, useAuthContext } from "@/context/authContext";
import { useEffect, useState } from "react";
import avatar from "../../../../../public/assets/avatar.jpg";
import Image from "next/image";
import { PageBack } from "@/components/pageBack";

interface IParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: IParams) {
  const { user } = useAuthContext();
  const [userLogged, setUserLogged] = useState<TUser>({} as TUser);
  console.log(params.id);

  useEffect(() => {
    setUserLogged(user);
  }, [params.id, user, user.id]);

  return (
    <div className="w-full flex flex-col items-center bg-zinc-100">
      <div className="w-full mt-3">{/* <PageBack /> */}</div>
      <section className="w-3/4 flex flex-col justify-center items-center gap-3 pt-10 pb-14 mt-8 iphone_SE:w-full iphone_XR:w-full">
        {/* <UserCircle size={100} className="text-blue-900" /> */}
        <Image
          src={avatar}
          alt="Imagem do avatar de usuário"
          width={100}
          height={100}
          className="rounded-full border-2 border-zinc-500"
        />
        <h2 className="font-medium text-2xl text-blue-900">Perfil</h2>
        <div className="w-1/2 h-12 flex items-center border-2 border-zinc-300 rounded-lg gap-2 iphone_XR:w-[90%] laptop:w-[70%]">
          <span className="ml-2">Nome:</span>
          <p className="font-medium text-lg">{userLogged.nome}</p>
        </div>
        <div className="w-1/2 h-12 flex items-center border-2 border-zinc-300 rounded-lg gap-2 iphone_XR:w-[90%] laptop:w-[70%]">
          <span className="ml-2">E-mail:</span>
          <p className="font-medium text-lg">{userLogged.email}</p>
        </div>
        <div className="w-1/2 h-12 flex items-center border-2 border-zinc-300 rounded-lg gap-2 iphone_XR:w-[90%] laptop:w-[70%]">
          <span className="ml-2">Perfil:</span>
          <p className="font-medium text-lg">{userLogged.perfil}</p>
        </div>
      </section>
    </div>
  );
}
