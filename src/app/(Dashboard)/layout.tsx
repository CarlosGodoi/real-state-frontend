import { Footer } from '@/components/template/footer';
import { Header } from '@/components/template/header';
import { Roboto } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

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
    <html lang="pt-BR">
      <body className={roboto.className}>
        <div className="w-full flex flex-col items-center">
          <Header />
        </div>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
