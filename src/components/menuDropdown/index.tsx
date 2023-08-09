import { useAuthContext } from '@/context/authContext';
import { CaretDown, UserCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

export const DropdownMenu: React.FC = () => {
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
          className="flex justify-center items-center w-full p-2 gap-1 text-sm font-medium text-white bg-transparent border-none focus:outline-none"
          id="menu-button"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <UserCircle size={30} />
          {user.nome}
          <CaretDown />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-4 w-36 rounded-md shadow-lg bg-zinc-950"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <Link
              href={`/usuario/${user.id}`}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-200 hover:text-zinc-800 border-b-2 border-zinc-700"
              role="menuitem"
            >
              Perfil
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
