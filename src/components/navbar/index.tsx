import { DropdownMenu } from '@/components/menuDropdown';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center gap-3 p-2">
      <li className="list-none text-white cursor-pointer hover:border-b-2 border-amber-200 iphone_SE:hidden">
        <Link href="/broker/register">Cadastrar corretor</Link>
      </li>
      <li className="list-none text-white cursor-pointer hover:border-b-2 border-amber-200 iphone_SE:hidden">
        <Link href="/immobiles/register">Cadastrar Imóvel</Link>
      </li>
      <li className="list-none text-white cursor-pointer hover:border-b-2 border-amber-200 iphone_SE:hidden">
        <Link href="/contact">Contato</Link>
      </li>
      <li className="list-none text-white cursor-pointer hover:text-amber-200">
        <DropdownMenu />
      </li>
    </nav>
  );
};
