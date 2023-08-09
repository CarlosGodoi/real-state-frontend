import { TypeAnimation } from 'react-type-animation';
export const AnimatedText = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Somos a mepresa com mais de 40 anos de mercado',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'possuimos os mais diversos imóveis',
        2000,
        'de alto padrão ou para empreendimentos',
        2000,
        'nossa missão é proporcionar a realização dos sonhos',
        2000,
        'de nossos clientes',
        2000,
        'nós somos a RealState!',
        2000,
      ]}
      wrapper="span"
      speed={50}
      className="w-4/5 font-body text-3xl text-medium_blue flex justify-center items-center mt-10 iphone_SE:w-[90%] text-center"
      repeat={Infinity}
    />
  );
};
