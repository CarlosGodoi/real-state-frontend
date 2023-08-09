import { useForm } from 'react-hook-form';
import { FormData, defaultValues, resolver } from '../schema';
import { useState } from 'react';

export const FormEditImmobile: React.FC = () => {
  return (
    <form className="w-full flex flex-col gap-3 iphone_SE:items-center iphone_XR:items-center laptop:w-[90%]">
      <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="area">Área</label>
          <input type="text" />
        </div>
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="numeroQuartos">N.º de quartos</label>
          <input type="number" />
        </div>
      </div>
      <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="preco">Preço</label>
          <input type="number" />
        </div>
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="tipoContrato">Contrato</label>
          <select>
            <option value="tipoContrato" disabled>
              Tipo contrato
            </option>
            <option value="VENDA">VENDA</option>
            <option value="ALUGUEL">ALUGUEL</option>
          </select>
        </div>
      </div>
      <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="STATUS">Status</label>
          <select>
            <option value="STATUS" disabled>
              STATUS
            </option>
            <option value="VENDIDO">VENDIDO</option>
            <option value="ALUGADO">ALUGADO</option>
            <option value="NEGOCIACAO">NEGOCIACAO</option>
            <option value="PENDENTE">PENDENTE</option>
          </select>
        </div>
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" />
        </div>
      </div>
      <div className="w-full flex gap-3 iphone_SE:flex-col items-center iphone_XR:flex-col">
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="numero">Número</label>
          <input type="number" />
        </div>
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="CEP">CEP</label>
          <input type="text" />
        </div>
        <div className="w-full flex flex-col iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <label htmlFor="cidade">Cidade</label>
          <input type="text" />
        </div>
      </div>
      <div className="flex justify-end mt-5 iphone_SE:items-center">
        <button className="w-48 bg-light_blue text-white h-10 rounded-lg laptop:w-[300px]">
          Salvar
        </button>
      </div>
    </form>
  );
};
