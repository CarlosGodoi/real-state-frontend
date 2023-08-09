'use client';
import { useAuthContext } from '@/context/authContext';
import { List, UserCircleGear } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

export const MenuMobo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex justify-center items-center w-full p-4 gap-1 text-sm font-medium text-white bg-transparent border-none focus:outline-none"
          id="menu-button"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <List size={30} />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-zinc-950 opacity-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <div className="flex gap-3 justify-center items-center text-amber-200 p-1 border-b-2 border-zinc-700">
              <UserCircleGear size={30} />
              {user.nome}
            </div>
            <Link
              href={`/usuario/${user.id}`}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-zinc-800 border-b-2 border-zinc-700"
              role="menuitem"
            >
              Perfil
            </Link>
            <Link
              href="/broker/register"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-gray-800 border-b-2 border-zinc-700"
              role="menuitem"
            >
              Cadastrar corretor
            </Link>
            <Link
              href="/immobiles/register"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-gray-800 border-b-2 border-zinc-700"
              role="menuitem"
            >
              Cadastrar Imóvel
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-gray-800 border-b-2 border-zinc-700"
              role="menuitem"
            >
              Contato
            </Link>
            <a
              onClick={signOut}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-gray-800"
              role="menuitem"
            >
              Sair
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
