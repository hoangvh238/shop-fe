"use client";
import React from "react";

import { useGetAllProductMutation } from "@/store/queries/productManagement";
import { ProductItem } from "@/types/item-type";
import ProductListItem from "@/components/core/common/product-list-item";
import { enums } from "@/settings";

function getDateLeft(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);

  const timeDifference = now.getTime() - date.getTime();

  // Chuyển đổi sự chênh lệch từ milliseconds sang ngày
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

function AvailableProducts() {
  const [products, setProducts] = React.useState([]);

  const [getAllProducts] = useGetAllProductMutation();

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
        hex: enums.Color[color as keyof typeof enums.Color],
      }));

      return {
        ...product,
        colors,
      };
    });

    setProducts(newData);
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {products?.map((product: ProductItem) => (
          <ProductListItem
            key={product?.id}
            {...product}
            className="snap-start"
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableProducts;
