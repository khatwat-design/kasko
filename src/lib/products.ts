export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  category: string;
  image: string;
  isVisible?: boolean;
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ar-IQ", {
    style: "currency",
    currency: "IQD",
    maximumFractionDigits: 0,
  }).format(amount);
