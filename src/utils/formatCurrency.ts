export const formatCurrency = (value: number) => {
  const formatterCurrent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatterCurrent.format(value);
};
