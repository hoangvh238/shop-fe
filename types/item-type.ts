export type ProductItem = {
  images: Array<string>;
  minPrice: number;
  colors: Array<{
    name: string;
    hex: string;
  }>;
  providerName: string;
  name: string;
  isNew: string;
  createdBy: string;
  rating: number;
  ratingCount: number;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
};
