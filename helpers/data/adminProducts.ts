export type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  numberOfSubProducts: number;
};

export const PRODUCTS = [
  {
    id: 1,
    name: "Product A",
    price: "100.000",
    imageUrl: "/images/trending/shirt.png",
    numberOfSubProducts: 4,
    isAvailable: false,
  },
  {
    id: 2,
    name: "Product B",
    price: "200.000",
    imageUrl: "/images/trending/shirt.png",
    numberOfSubProducts: 4,
    isAvailable: false,
  },
  {
    id: 3,
    name: "Product C",
    price: "300.000",
    imageUrl: "/images/trending/shirt.png",
    numberOfSubProducts: 4,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Product D",
    price: "400.000",
    imageUrl: "/images/trending/shirt.png",
    numberOfSubProducts: 4,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Product E",
    price: "500.000",
    imageUrl: "/images/trending/shirt.png",
    numberOfSubProducts: 4,
    isAvailable: true,
  },
];
