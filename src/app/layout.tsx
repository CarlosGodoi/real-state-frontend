import { AuthProvider } from '@/context/authContext';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto } from 'next/font/google';
import { ApiRequestProvider } from '@/context/apiRequestContext';
import { ToastContainer } from 'react-toastify';
import Container from '@/components/container';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

export const metadata = {
  title: 'Real State',
  description: 'Application for real estate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApiRequestProvider>
      <AuthProvider>
        <html lang="pt-BR">
          <body className={roboto.className}>{children}</body>
        </html>
      </AuthProvider>
    </ApiRequestProvider>
  );
}
