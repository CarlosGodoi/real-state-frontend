import { ImmobilesProvider } from '@/context/ImmobilesContext';
import { Roboto } from 'next/font/google';

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
    <ImmobilesProvider>
      <main>{children}</main>
    </ImmobilesProvider>
  );
}
