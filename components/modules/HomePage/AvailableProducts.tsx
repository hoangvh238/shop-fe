"use client";
import React from "react";

import { useGetAllProductMutation } from "@/store/queries/productManagement";
import { ProductCustom } from "@/types/item-type";
import ProductListItem from "@/components/core/common/product-list-item";
import { enums } from "@/settings";
import { products as initialProduct } from "@/helpers/data/product";
function AvailableProducts() {
  const [products, setProducts] = React.useState(Array(8).fill(initialProduct));

  const [getAllProducts, { isSuccess }] = useGetAllProductMutation();

  const getNewProduct = async () => {
    const { data } = await getAllProducts({
      filter: "",
      skip: 0,
      pageIndex: 1,
      pageSize: 100,
      sortField: "name",
      asc: true,
    });

    const newData = data?.result?.items?.map((product: any) => {
      const colors = product?.colors?.split(",").map((color: string) => ({
        name: color,
        hex: enums.Color[color.toUpperCase() as keyof typeof enums.Color],
      }));

      return {
        ...product,
        colors,
      };
    });

    setProducts([...newData]);
  };

  React.useEffect(() => {
    getNewProduct();
  }, []);

  // const products = React.useMemo(() => {
  //   const data = getProduct("");
  //   console.log('first', data)
  // }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-center text-3xl font-bold uppercase">
        Sản phẩm hiện có
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Muôn vàn các mẫu mã sản phẩm hiện có
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {products?.map((product: ProductCustom, index: number) => (
          <ProductListItem
            key={isSuccess ? product.id : index}
            isLoading={!isSuccess}
            {...product}
            className="snap-start"
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableProducts;
