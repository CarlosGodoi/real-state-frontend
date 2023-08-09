export const FormContact: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-14 mb-10 iphone_SE:mt-5">
        <h2 className="font-serif text-3xl text-medium_blue iphone_SE:w-full text-center mt-8">
          Como podemos lhe ajudar?
        </h2>
        <div className="w-1/2 flex justify-center items-center iphone_SE:w-[90%] iphone_XR:w-[90%]">
          <select className="w-[60%] h-14 border-dark_secondary rounded-xl mt-9 iphone_SE:mt-6">
            <option disabled value="...">
              ...
            </option>
            <option value="locacao">Locação</option>
            <option value="venda">Venda</option>
            <option value="administrativo">Administrativo</option>
          </select>
        </div>
        <div className="w-full flex flex-col items-center gap-4 mt-20 iphone_SE:mt-8 iphone_XR:mt-8">
          <span className="w-[70%] font-thin border-2 border-b-zinc-100 opacity-50"></span>
          <form className="w-2/4 flex flex-col items-center mt-6 gap-4 laptop:w-[90%] iphone_SE:w-[90%] iphone_XR:w-[90%]">
            <div className="w-full flex gap-3 iphone_SE:w-[90%] iphone_SE:flex-col iphone_XR:flex-col">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="Nome" className="font-thin text-medium_blue">
                  Nome
                </label>
                <input
                  type="text"
                  className="h-14 border-dark_secondary rounded-xl"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="font-thin text-medium_blue">
                  E-mail
                </label>
                <input
                  type="text"
                  className="h-14 border-dark_secondary rounded-xl"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 iphone_SE:w-[90%]">
              <label htmlFor="mensagem" className="font-thin text-medium_blue ">
                Mensagem
              </label>
              <textarea
                className="h-40 border-dark_secondary rounded-xl"
                maxLength={300}
              />
            </div>
            <button className="w-60 h-12 bg-light_blue text-white rounded-lg mt-6 iphone_SE:mt-3">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
