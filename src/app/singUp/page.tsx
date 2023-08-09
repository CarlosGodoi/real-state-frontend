import SingUpForm from './component';

export const metadata = {
  title: 'Cadastre-se',
};

export default function SingUp() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-100">
      <SingUpForm />
    </div>
  );
}
