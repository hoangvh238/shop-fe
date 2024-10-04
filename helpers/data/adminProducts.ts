export type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  numberOfSubProducts: number;
};
export type SubProduct = {
  authorId: string;
  color: string;
  createdBy: string;
  createdDate: string;
  id: string;
  images: string[];
  lensVRUrl: string;
  price: number;
  sizes: string;
  updatedBy: string;
  updatedDate: string;
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

export const SUBPRODUCTS = [
  {
    id: 1,
    price: "100.000",
    imageUrl: "/images/trending/shirt.png",
    color: "#000",
    size: "s",
    isAvailable: false,
  },
  {
    id: 2,
    price: "100.000",
    imageUrl: "/images/trending/shirt.png",
    color: "#fff",
    size: "l",
    isAvailable: false,
  },
  {
    id: 3,
    price: "120.000",
    imageUrl: "/images/trending/shirt.png",
    color: "#202020",
    size: "xl",
    isAvailable: false,
  },
  {
    id: 4,
    price: "140.000",
    imageUrl: "/images/trending/shirt.png",
    color: "#000",
    size: "xxl",
    isAvailable: true,
  },
  {
    id: 1,
    price: "100.000",
    imageUrl: "/images/trending/shirt.png",
    color: "#f0f0f0",
    size: "xxxl",
    isAvailable: true,
  },
];
