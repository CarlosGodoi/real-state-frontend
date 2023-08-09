'use client';
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import Link from 'next/link';

const neighborhoods = [
  { name: 'Menino Deus' },
  { name: 'Rio Branco' },
  { name: 'Carlos Gomes' },
  { name: 'Moinhos de Vento' },
  { name: 'Mont`Serrat' },
];

const andress = [
  { name: 'Av.Carlos Gomes, 9999' },
  { name: 'Porto Alegre /RS' },
  { name: '92929-999' },
  { name: 'CRECI: 99999J' },
  { name: '(51) 3030-9595' },
];

export const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center bg-zinc-800">
      <div className="w-4/5 flex justify-between items-center gap-3 pt-3 ipad:flex-col">
        <h2 className="text-5xl font-serif text-white border-b-2 border-amber-200">
          Real State
        </h2>
        <div className="flex gap-3 pr-3 pl-3 text-white">
          <Link
            href="https://pt-br.facebook.com/"
            target="_blank"
            className="text-zinc-100"
          >
            <FacebookLogo size={35} />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="text-zinc-100"
          >
            <InstagramLogo size={35} />
          </Link>
          <Link
            href="https://www.whatsapp.com/?lang=pt_BR"
            target="_blank"
            className="text-zinc-100"
          >
            <WhatsappLogo size={35} />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            className="text-zinc-100"
          >
            <YoutubeLogo size={35} />
          </Link>
        </div>
      </div>
      <div className="w-4/5 flex justify-between items-center p-2 mt-3 ipad:flex-col gap-4">
        <div className="flex flex-col gap-2 ipad:items-center">
          {neighborhoods.map((item) => (
            <Link
              className="text-amber-100 font-medium hover:text-white"
              key={item.name}
              href="#"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 ipad:items-center">
          {andress.map((item) => (
            <p
              className="text-amber-100 font-medium hover:text-white"
              key={item.name}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center bg-zinc-700 p-3 gap-4 ipad:flex-col mt-4">
        <span className="font-serif text-zinc-400 iphone_SE:text-sm">
          © 2023 - RealState - Todos os direitos Reservados
        </span>
        <span className="font-serif text-zinc-400 ipad:hidden">|</span>
        <p className="font-serif text-zinc-400 iphone_SE:text-sm">
          Criado e desenvolvido por Carlos Eduardo Godoi
        </p>
      </div>
    </div>
  );
};
