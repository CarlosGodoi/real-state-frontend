import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';

export const PageBack: React.FC = () => {
  return (
    <div className="flex p-2">
      <Link
        href={'/immobiles'}
        className="flex items-center gap-1 border-b-2 border-medium_secondary mt-2"
      >
        <ArrowLeft size={20} className="text-dark_blue" />
        <p className="text-dark_blue">Voltar</p>
      </Link>
    </div>
  );
};
