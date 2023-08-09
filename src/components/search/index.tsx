import { MagnifyingGlass } from '@phosphor-icons/react';
import { ChangeEvent } from 'react';

interface IProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string;
}

export const Search: React.FC<IProps> = ({ handleChange, onClick, value }) => {
  return (
    <div className="w-2/4 flex justify-between items-center border-b-2 focus:outline-none iphone_XR:w-[90%]">
      <input
        value={value}
        className="w-[90%] h-12 rounded-s-xl border-none border-transparent focus:border-transparent focus:ring-0 px-2 iphone_XR:w-[80%]"
        type="search"
        onChange={handleChange}
        placeholder="Digite um bairro ou cidade"
      />

      <MagnifyingGlass size={30} />
    </div>
  );
};
