'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { apiFront } from '@/services/api';
import { ROLE } from '@/app/enums/perfil';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRequest } from './apiRequestContext';

export type TUser = {
  id: string;
  nome: string;
  email: string;
  perfil: ROLE;
};

export type TCredentials = {
  accessToken: string;
  refreshToken: string;
};

interface IPropsSignin {
  email: string;
  senha: string;
}

interface IAuthContext {
  user: TUser;
  signIn: (data: IPropsSignin) => Promise<{ status: boolean; message: string }>;
  signOut: VoidFunction;

  updateUserContext: ({ nome, email }: { nome: string; email: string }) => void;
}

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const { apiRequest } = useRequest();
  const router = useRouter();
  const [user, setUser] = useState<TUser>({} as TUser);

  async function signIn(
    data: IPropsSignin,
  ): Promise<{ status: boolean; message: string }> {
    const result = await apiRequest('post', '/api/login', { data })
      .then(({ data }) => {
        setUser(data.usuario);
        return { status: true, message: '' };
      })
      .catch((err) => {
        return { status: false, message: err.response?.data.error };
      });

    return result;
  }

  async function signOut() {
    setUser({} as TUser);

    deleteCookie('token');
    deleteCookie('usuario');
    router.push('/');
  }

  const updateUserContext = ({
    nome,
    email,
  }: {
    nome: string;
    email: string;
  }) => {
    setUser({ ...user, email: email, nome: nome });
    setCookie('usuario', { ...user, email: email, nome: nome });
  };

  useEffect(() => {
    if (hasCookie('usuario')) {
      const usuario = getCookie('usuario')?.toString();
      if (usuario) {
        try {
          const parseUser = JSON.parse(usuario) as TUser;
          setUser(parseUser);
        } catch (error) {
          console.error('Erro ao fazer o parse do JSON:', error);
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuthContext };
