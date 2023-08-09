import FormLogin from '@/components/loginForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen flex justify-between">
      <div className="w-screen h-screen flex flex-col items-center bg-login_bg bg-no-repeat bg-cover tablet:hidden iphone_SE:hidden iphone_XR:hidden">
        <div className="w-4/5 flex flex-col justify-center items-center gap-3 mt-8">
          <h2 className="font-medium text-primary text-6xl text-center">
            Real State
          </h2>
          <span className="font-medium text-white text-2xl text-center mt-4">
            Já é nosso cliente? Crie sua conta, tenha acesso a todas opções de
            imóveis e suporte de nossos corretores
          </span>
        </div>
      </div>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-100">
        <FormLogin />
        <Link
          className="text-sm font-medium text-dark_blue mt-4 hover:text-blue-400"
          href={'/singUp'}
        >
          Crie sua conta
        </Link>
      </div>
    </div>
  );
}
