import React from "react";

import products from "@/helpers/data/products";
import ProductListItem from "@/components/core/common/product-list-item";

const productsWithAvailableColors = products.map((product) => ({
  ...product,
  availableColors: [
    {
      name: "Black",
      hex: "#18181b",
    },
    {
      name: "Red",
      hex: "#f871a0",
    },
    {
      name: "Yellow",
      hex: "#f9c97c",
    },
  ],
}));

function Trending() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-center text-3xl font-bold">THỊNH HÀNH</h1>
      <p className="mb-8 text-center text-gray-600">
        Các mẫu được sử dụng nhiều nhất
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* {productsWithAvailableColors.slice(0, 5).map((product) => (
          <ProductListItem
            key={product.id}
            {...product}
            className="snap-start"
          />
        ))} */}
      </div>
    </div>
  );
}

export default Trending;
