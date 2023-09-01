"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getAllImmobiles } from "@/services/immobiles/getAll";
import { IImmobiles } from "@/app/interfaces/GetImmobiles";

interface IFilter {
  tipoContrato: string;
  search: string;
}

interface ITab {
  label: string;
  active: boolean;
  value: string;
}

interface IImmobilesContext {
  immobiles: IImmobiles[];
  tab: ITab[];
  filter: IFilter;
  handleTab: (label: string, value?: string) => void;
  handleSearch: (value: string) => void;
  searchImmobiles: () => void;
}

export const ImmobilesContext = createContext<IImmobilesContext>(
  {} as IImmobilesContext
);

interface IProps {
  children: ReactNode;
}

export const ImmobilesProvider: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const [immobiles, setImmobiles] = useState<IImmobiles[]>([]);

  const [tab, setTab] = useState<ITab[]>([
    {
      label: "Aluguel",
      active: true,
      value: "ALUGUEL",
    },
    {
      label: "Venda",
      active: false,
      value: "VENDA",
    },
  ]);

  const [filter, setFilter] = useState<IFilter>({
    tipoContrato: "",
    search: "",
  });

  useEffect(() => {
    getAllImmobiles().then((res) => {
      if (res) {
        setImmobiles(res?.imoveis);
      }
    });
  }, []);

  const handleTab = (label: string, value: string = "VENDA" || "ALUGUEL") => {
    setFilter({ ...filter, tipoContrato: value });
    setTab((prev) => {
      return prev.map((el) => {
        if (el.label === label) el.active = true;
        else el.active = false;
        return el;
      });
    });
  };

  const handleSearch = (value: string) => {
    setFilter({ ...filter, search: value });
  };

  const searchImmobiles = () => {};

  return (
    <ImmobilesContext.Provider
      value={{
        immobiles,
        tab,
        filter,
        handleTab,
        handleSearch,
        searchImmobiles,
      }}>
      {children}
    </ImmobilesContext.Provider>
  );
};

export function useImmobilesContext(): IImmobilesContext {
  const context = useContext(ImmobilesContext);
  return context;
}
